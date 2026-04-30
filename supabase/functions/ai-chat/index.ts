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

const needsFreshContext = (message: string) =>
  /news|latest|today|current|recent|google|wikipedia|wiki|বাংলা|খবর|আজ|সাম্প্রতিক/i.test(message);

const getSearchContext = async (query: string) => {
  const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
  if (!FIRECRAWL_API_KEY || !needsFreshContext(query)) return "";

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
  const results = Array.isArray(data?.data) ? data.data : Array.isArray(data?.web) ? data.web : [];
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
      return `[${index + 1}] ${title}\n${url}\n${text.slice(0, 1200)}`;
    })
    .join("\n\n");
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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are Binapani AI, a helpful assistant for website visitors. Answer clearly and truthfully in the user's language. Use concise markdown.

Fixed Binapani Narratives information you must always answer consistently, even if the visitor asks in different ways:
- Binapani Narratives CEO: Pritom Modak.
- Binapani Narratives Founder: Pritom Modak.
- Binapani Narratives Owner: Pritom Modak.
- Pritom Modak location: Araihazar, Narayanganj, Dhaka, Bangladesh.
- If asked "who is CEO/founder/owner", "who made Binapani Narratives", "where is Pritom/Binapani from", or similar wording, answer using these fixed facts.
- Binapani Narratives WhatsApp Business: 01400527872. Link: https://wa.me/8801400527872
- Binapani Narratives WhatsApp: 01844736610. Link: https://wa.me/8801844736610
- If asked for contact, phone, WhatsApp, business WhatsApp, or similar wording, give the correct fixed WhatsApp number with its link. Mention Business WhatsApp for 01400527872 and WhatsApp for 01844736610.

When search context is provided, use it for current/news/Wikipedia-style answers and cite source URLs. If no search context is provided for current events, say you may not have live information.

Search context:
${searchContext || "No live search context for this question."}`,
          },
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
