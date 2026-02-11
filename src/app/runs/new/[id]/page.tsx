import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

export default async function RunPage({ params }: { params: { id: string } }) {
  const supabase = supabaseAdmin();

  const runId = params.id;

  const { data: run, error: runErr } = await supabase
    .from("runs")
    .select("id, goal, status, constraints, expert_profile, created_at, clients(name,industry)")
    .eq("id", runId)
    .single();

  if (runErr) throw new Error(runErr.message);

  const { data: brief } = await supabase
    .from("artifacts")
    .select("id, type, content_md, created_at")
    .eq("run_id", runId)
    .eq("type", "morning_brief")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Run</h1>
          <p className="text-sm text-gray-600">
            {(run as any)?.clients?.name} {(run as any)?.clients?.industry ? `— ${(run as any)?.clients?.industry}` : ""}
          </p>
        </div>
        <Link className="text-sm underline" href="/runs/new">New run</Link>
      </div>

      <section className="border rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Goal</h2>
          <span className="text-xs px-2 py-1 rounded bg-gray-100">{run.status}</span>
        </div>
        <p className="text-gray-800 whitespace-pre-wrap">{run.goal}</p>

        <details className="mt-3">
          <summary className="cursor-pointer text-sm text-gray-600">Constraints</summary>
          <pre className="text-xs bg-gray-50 p-3 rounded mt-2 overflow-auto">
            {JSON.stringify(run.constraints, null, 2)}
          </pre>
        </details>
      </section>

      <section className="border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Morning Brief</h2>

          <form action={`/api/runs/${runId}/run-now`} method="post">
            <button className="bg-black text-white rounded-md px-3 py-2 text-sm" type="submit">
              Run now (mock)
            </button>
          </form>
        </div>

        {!brief ? (
          <p className="text-sm text-gray-600">
            No brief yet. Click <b>Run now</b> to generate a mock Morning Brief.
          </p>
        ) : (
          <div className="space-y-3">
            <textarea
              readOnly
              className="w-full border rounded-md p-3 min-h-[260px] font-mono text-sm"
              value={brief.content_md || ""}
            />
            <div className="flex gap-2">
              <button
                className="border rounded-md px-3 py-2 text-sm"
                onClick={async () => {
                  await navigator.clipboard.writeText(brief.content_md || "");
                  alert("Copied!");
                }}
                type="button"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

