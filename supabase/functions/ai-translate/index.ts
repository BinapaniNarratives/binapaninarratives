const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => null);
    const language: string =
      typeof body?.language === "string" && body.language.trim() ? body.language.trim().slice(0, 80) : "English";
    const strings = body?.strings as Record<string, string> | undefined;
    const name: string | undefined = typeof body?.name === "string" ? body.name.trim().slice(0, 80) : undefined;

    if (!strings || typeof strings !== "object") {
      return new Response(JSON.stringify({ error: "strings object required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("Lovable AI not configured");

    // Short-circuit for English
    if (/^english/i.test(language)) {
      const out: Record<string, string> = { ...strings };
      if (name) out.__name = name;
      return new Response(JSON.stringify({ translations: out }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const keys = Object.keys(strings);
    const payloadObj: Record<string, string> = { ...strings };
    if (name) payloadObj.__name = name;

    const systemPrompt = `You are a professional translator. Translate every value in the given JSON object into "${language}" using its native script.
Rules:
- Preserve placeholders like {name} EXACTLY.
- For the special key "__name", TRANSLITERATE the person's name into the native script of "${language}" (phonetic spelling). Do not translate it as a word.
- Keep markdown links [text](url): translate only the visible text, never the URL.
- Return ONLY valid JSON with the SAME keys, no commentary.`;

    const userPrompt = `Translate the values of this JSON into ${language}. Return JSON with same keys.\n\n${JSON.stringify(payloadObj)}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429)
        return new Response(JSON.stringify({ error: "Rate limit. Try again." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      if (response.status === 402)
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      const t = await response.text();
      console.error("translate error", response.status, t);
      return new Response(JSON.stringify({ error: "Translation failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    let parsed: Record<string, string> = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      const m = raw.match(/\{[\s\S]*\}/);
      if (m) try { parsed = JSON.parse(m[0]); } catch {}
    }
    // Fill missing keys with originals
    const out: Record<string, string> = {};
    for (const k of keys) out[k] = typeof parsed[k] === "string" ? parsed[k] : strings[k];
    if (name) out.__name = typeof parsed.__name === "string" ? parsed.__name : name;

    return new Response(JSON.stringify({ translations: out }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-translate error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
