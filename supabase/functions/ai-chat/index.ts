// AI Chat edge function - returns { answer } JSON with fixed Binapani info
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FIXED_INFO = `Fixed Binapani Narratives information you must always answer consistently, even if the visitor asks in different ways:
- Binapani Narratives CEO: Pritom Modak.
- Binapani Narratives Founder: Pritom Modak.
- Binapani Narratives Owner: Pritom Modak.
- Pritom Modak location: Araihazar, Narayanganj, Dhaka, Bangladesh.
- If asked "who is CEO/founder/owner", "who made Binapani Narratives", "where is Pritom/Binapani from", or similar wording, answer using these fixed facts.
- Binapani Narratives WhatsApp Business: 01400527872. Link: https://wa.me/8801400527872
- Binapani Narratives WhatsApp: 01844736610. Link: https://wa.me/8801844736610
- If asked for contact, phone, WhatsApp, business WhatsApp, or similar wording, give the correct fixed WhatsApp number with its link. Mention Business WhatsApp for 01400527872 and WhatsApp for 01844736610.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages)) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messages = body.messages
      .filter((m: any) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant"))
      .slice(-20)
      .map((m: any) => ({ role: m.role, content: String(m.content).slice(0, 4000) }));

    const systemMsg = {
      role: "system",
      content: `You are Binapani AI — a friendly, knowledgeable assistant for the Binapani Narratives website. Answer ANY question accurately and clearly. Format answers in clean, simple text.\n\n${FIXED_INFO}`,
    };

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [systemMsg, ...messages],
      }),
    });

    if (!upstream.ok) {
      const txt = await upstream.text();
      if (upstream.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (upstream.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Lovable Cloud." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI gateway error", details: txt.slice(0, 500) }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await upstream.json();
    const answer = data?.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
