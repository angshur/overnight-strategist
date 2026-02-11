import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

export async function POST(req: Request) {
  const form = await req.formData();

  const client_id = String(form.get("client_id") || "");
  const goal = String(form.get("goal") || "").trim();

  const constraints = {
    kpi: String(form.get("kpi") || ""),
    timeframe: String(form.get("timeframe") || ""),
    budget: String(form.get("budget") || ""),
    channels: String(form.get("channels") || ""),
  };

  const expert_profile = {
    voice: "neutral",
    stance: "pragmatic",
    depth: "high",
  };

  if (!client_id || !goal) {
    return NextResponse.json({ error: "client_id and goal are required" }, { status: 400 });
  }

  const supabase = supabaseAdmin();

  const { data, error } = await supabase
    .from("runs")
    .insert([{ client_id, goal, constraints, expert_profile, status: "draft" }])
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.redirect(new URL(`/runs/${data.id}`, req.url));
}

