const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_MESSAGES = 24;
const MAX_CONTENT_LENGTH = 4000;
const FIRECRAWL_V2 = "https://api.firecrawl.dev/v2/search";

const isChatMessage = (value: unknown): value is ChatMessage => {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    (record.role === "user" || record.role === "assistant") &&
    typeof record.content === "string" &&
    record.content.trim().length > 0 &&
    record.content.length <= MAX_CONTENT_LENGTH
  );
};

// Heuristics: avoid burning a search call on pure chit-chat / identity questions.
const SKIP_SEARCH = /^(hi|hello|hey|salam|assalam|নমস্কার|হ্যালো|হাই|thanks|thank you|ধন্যবাদ|who are you|what can you do|তুমি কে|আপনি কে)\b/i;

const shouldSearch = (message: string) => {
  const trimmed = message.trim();
  if (trimmed.length < 3) return false;
  if (SKIP_SEARCH.test(trimmed)) return false;
  return true;
};

const getSearchContext = async (query: string) => {
  const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
  if (!FIRECRAWL_API_KEY) {
    console.warn("FIRECRAWL_API_KEY not set – skipping live search");
    return "";
  }
  if (!shouldSearch(query)) return "";

  try {
    const response = await fetch(FIRECRAWL_V2, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        limit: 5,
        scrapeOptions: { formats: ["markdown"], onlyMainContent: true },
      }),
    });

    if (!response.ok) {
      console.error("Search context failed", response.status, await response.text());
      return "";
    }

    const data = await response.json();
    const results = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.web)
        ? data.web
        : [];
    return results
      .slice(0, 5)
      .map((item: Record<string, unknown>, index: number) => {
        const title = typeof item.title === "string" ? item.title : "Source";
        const url =
          typeof item.url === "string"
            ? item.url
            : typeof item.sourceURL === "string"
              ? item.sourceURL
              : "";
        const text =
          typeof item.markdown === "string"
            ? item.markdown
            : typeof item.description === "string"
              ? item.description
              : "";
        return `[${index + 1}] ${title}\nURL: ${url}\n${text.slice(0, 1500)}`;
      })
      .join("\n\n---\n\n");
  } catch (err) {
    console.error("Search context error", err);
    return "";
  }
};

const formatToday = () => {
  const now = new Date();
  const en = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Dhaka",
  });
  const bn = now.toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Dhaka",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
    hour12: true,
  });
  const iso = now.toISOString();
  return { en, bn, time, iso };
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => null);
    const messages = Array.isArray(body?.messages)
      ? body.messages.filter(isChatMessage).slice(-MAX_MESSAGES)
      : [];

    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "Please enter a message." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("Lovable AI is not configured.");

    const lastUserMessage =
      [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
    const searchContext = await getSearchContext(lastUserMessage);
    const today = formatToday();

    const systemPrompt = `You are Binapani AI, an advanced live assistant (similar to ChatGPT and Gemini) for website visitors. You answer ANY question clearly, truthfully, and in the user's language (English or Bangla as appropriate). Use concise markdown.

REAL-TIME CONTEXT (server time, Asia/Dhaka):
- Today's date (English): ${today.en}
- Today's date (বাংলা): ${today.bn}
- Current time: ${today.time} (Asia/Dhaka)
- ISO timestamp: ${today.iso}

If the visitor asks for today's date, current time, day of week, or "what day is it" — answer directly using the values above. Never say you don't know the date.

LIVE WEB SEARCH:
You are given fresh web search results below for the user's latest question. Use them to answer questions about news, current events, sports, weather, prices, people, places, definitions, Wikipedia-style facts, recent updates, or anything time-sensitive.
- Synthesize a clear, helpful answer in the user's language.
- ALWAYS include inline source links as clickable markdown like [source](https://...) right after the relevant fact.
- At the end, add a short "Sources" list of the URLs you used.
- If the search results don't cover the question, answer from your own knowledge but say so honestly.

FIXED BINAPANI NARRATIVES INFO (always answer consistently, regardless of how the visitor phrases it):
- CEO / Founder / Owner: Pritom Modak.
- Pritom Modak location: Araihazar, Narayanganj, Dhaka, Bangladesh.
- WhatsApp Business: 01400527872 → https://wa.me/8801400527872
- WhatsApp: 01844736610 → https://wa.me/8801844736610
- If asked for contact / phone / WhatsApp, give both numbers with their links.

LIVE SEARCH RESULTS for the user's last question:
${searchContext || "(No live search results were returned for this question. Answer from general knowledge and clearly say if information may be outdated.)"}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many AI requests right now. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits are exhausted. Please add credits in Workspace Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const errorText = await response.text();
      console.error("Lovable AI error", response.status, errorText);
      return new Response(JSON.stringify({ error: "The AI could not answer right now." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content;

    return new Response(
      JSON.stringify({ answer: typeof answer === "string" ? answer : "I could not generate an answer." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("AI chat error", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
