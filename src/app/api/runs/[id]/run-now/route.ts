import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

function mockMorningBrief(run: any) {
  const clientName = run?.clients?.name ?? "Client";
  const c = run?.constraints ?? {};
  const channels = c.channels ? String(c.channels) : "existing channels";

  const md = `# Morning Brief — ${clientName}

## Executive summary (≤150 words)
Your goal is: **${run.goal}**.  
Today’s plan focuses on fast wins + a 2-week diagnostic loop to reduce uncertainty before scaling.

## What we’ll do next (7–10 days)
1) Tighten the primary KPI definition (**${c.kpi || "KPI"}**) and align reporting.
2) Identify the top 3 likely performance drivers across ${channels}.
3) Flag anomalies vs baseline and isolate “what changed”.
4) Draft 3 testable hypotheses and pick 1–2 experiments to run first.

## Suggested experiments
- Landing page + offer alignment test (message → intent)
- Budget reallocation test (shift 10–20% toward best marginal returns)
- Incrementality check (holdout or geo split where feasible)

## Assumptions + confidence
- Assumptions: tracking is reliable; conversion events are consistent; budgets are controllable.
- Confidence: **Medium** (needs baseline + data validation).
`;

  const json = {
    client: clientName,
    goal: run.goal,
    constraints: run.constraints,
    sections: {
      summary: "150-word executive summary",
      plan: ["Tighten KPI definition", "Identify top drivers", "Flag anomalies", "Pick experiments"],
      experiments: ["Offer/landing alignment", "Budget reallocation", "Incrementality check"],
    },
    confidence: "medium",
  };

  return { md, json };
}

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const runId = ctx.params.id;
  const supabase = supabaseAdmin();

  const { data: run, error } = await supabase
    .from("runs")
    .select("id, goal, constraints, clients(name,industry)")
    .eq("id", runId)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { md, json } = mockMorningBrief(run);

  await supabase.from("artifacts").insert([
    {
      run_id: runId,
      type: "morning_brief",
      content: json,
      content_md: md,
    },
  ]);

  await supabase.from("runs").update({ status: "complete" }).eq("id", runId);

  return NextResponse.redirect(new URL(`/runs/${runId}`, req.url));
}

