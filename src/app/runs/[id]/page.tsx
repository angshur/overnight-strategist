// src/app/runs/[id]/page.tsx
import Link from "next/link";

type RunMock = {
  client: { name: string; industry: string; location: string };
  runId: string;
  status: "draft" | "scheduled" | "running" | "complete";
  goal: string;
  constraints: {
    kpi: string;
    timeframe: string;
    budget: string;
    channels: string;
  };
  expertProfile: {
    voice: string;
    stance: string;
    depth: string;
  };
  tonightPlan: { step: string; detail: string }[];
  previewOutputs: { title: string; type: string; note: string; state: "ready" | "planned" | "blocked" }[];
};

const MOCK: RunMock = {
  client: { name: "Acme Dental", industry: "Dental Practice", location: "Suburban • 8-mile radius" },
  runId: "run_123",
  status: "scheduled",
  goal:
    "Increase booked high-value consultations (implants + Invisalign + emergency) by 30% in 90 days for Acme Dental, without increasing total ad spend. Bias toward quality (LTV), not volume.",
  constraints: {
    kpi: "Booked consults (high-LTV)",
    timeframe: "90 days",
    budget: "Flat spend (re-allocate only)",
    channels: "Google Search, Google Maps/GBP, Meta (retargeting), Email/SMS follow-up",
  },
  expertProfile: {
    voice: "Neutral, executive-ready",
    stance: "Pragmatic: outcomes > activity",
    depth: "High: include assumptions + guardrails",
  },
  tonightPlan: [
    { step: "Normalize intake", detail: "Extract goal, constraints, missing info. Remove noise to avoid context pollution." },
    { step: "Parallel agents", detail: "Run 15 specialist agents across growth, measurement, ops, finance, retention." },
    { step: "Synthesize", detail: "Resolve conflicts, rank actions by impact/effort, set confidence + assumptions." },
    { step: "Package deliverables", detail: "Generate a morning bundle: brief, strategy, experiments, SOPs, tracking plan." },
  ],
  previewOutputs: [
    { title: "Executive Brief", type: "1-pager", note: "≤150 words + drivers + risks + next actions", state: "planned" },
    { title: "90-Day Growth Strategy", type: "Strategy doc", note: "Positioning + channel plan + budget posture", state: "planned" },
    { title: "2-Week Experiment Plan", type: "Test plan", note: "3 tests with hypotheses + success metrics", state: "planned" },
    { title: "Measurement & Lead Quality Rubric", type: "Ops plan", note: "Tracking fixes + scoring + confidence", state: "planned" },
    { title: "Front Desk + After-hours SOP", type: "Operating SOP", note: "Missed call recovery loop + scripts + SLAs", state: "planned" },
    { title: "Incrementality Test Options", type: "Playbook", note: "Feasible holdout/geo split suggestions", state: "blocked" },
  ],
};

function Pill({ label }: { label: string }) {
  return <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{label}</span>;
}

function StatusBadge({ status }: { status: RunMock["status"] }) {
  const map: Record<RunMock["status"], string> = {
    draft: "bg-gray-50 text-gray-700 border-gray-200",
    scheduled: "bg-blue-50 text-blue-700 border-blue-200",
    running: "bg-yellow-50 text-yellow-700 border-yellow-200",
    complete: "bg-green-50 text-green-700 border-green-200",
  };
  const label: Record<RunMock["status"], string> = {
    draft: "Draft",
    scheduled: "Scheduled overnight",
    running: "Running",
    complete: "Complete",
  };
  return <span className={`text-xs px-2 py-1 rounded-full border ${map[status]}`}>{label[status]}</span>;
}

function OutputState({ state }: { state: "ready" | "planned" | "blocked" }) {
  const map: Record<string, string> = {
    ready: "bg-green-50 text-green-700 border-green-200",
    planned: "bg-gray-50 text-gray-700 border-gray-200",
    blocked: "bg-red-50 text-red-700 border-red-200",
  };
  const label: Record<string, string> = {
    ready: "Ready",
    planned: "Planned",
    blocked: "Needs more info",
  };
  return <span className={`text-xs px-2 py-1 rounded-full border ${map[state]}`}>{label[state]}</span>;
}

export default function RunPage({ params }: { params: { id: string } }) {
  const runId = params.id;

  // For demo purposes we show the same mock regardless of id.
  // This is intentional: you can visit /runs/anything and it looks real.
  const run = { ...MOCK, runId };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link href="/runs/new" className="text-sm text-gray-600 underline">
            ← Create another run
          </Link>

          <div className="flex gap-2">
            <Link href={`/runs/${runId}/agents`} className="text-sm border bg-white rounded-xl px-3 py-2">
              Agent map (15)
            </Link>
            <Link href={`/runs/${runId}/morning`} className="text-sm bg-black text-white rounded-xl px-3 py-2">
              Morning deliverables
            </Link>
          </div>
        </div>

        {/* Header */}
        <header className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Run</h1>
              <p className="text-gray-600">
                Client: <b>{run.client.name}</b> • {run.client.industry} • {run.client.location}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <StatusBadge status={run.status} />
              <div className="text-xs text-gray-500">Run ID: {run.runId}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Pill label="Clean context per task" />
            <Pill label="Parallel agents" />
            <Pill label="Synthesis + packaging" />
            <Pill label="System owns structure + tools" />
            <Pill label="LLM executes tasks inside it" />
          </div>
        </header>

        {/* Goal card */}
        <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-semibold">Goal</h2>
            <span className="text-xs text-gray-500">What success looks like</span>
          </div>
          <p className="text-gray-800 whitespace-pre-wrap">{run.goal}</p>

          <details className="border rounded-xl p-4 bg-gray-50">
            <summary className="cursor-pointer text-sm font-medium">View constraints + expert profile</summary>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white border rounded-xl p-4">
                <div className="text-xs font-semibold text-gray-500">Constraints</div>
                <div className="mt-2 space-y-2 text-gray-700">
                  <div>
                    <span className="font-medium">Primary KPI:</span> {run.constraints.kpi}
                  </div>
                  <div>
                    <span className="font-medium">Timeframe:</span> {run.constraints.timeframe}
                  </div>
                  <div>
                    <span className="font-medium">Budget:</span> {run.constraints.budget}
                  </div>
                  <div>
                    <span className="font-medium">Channels:</span> {run.constraints.channels}
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-xl p-4">
                <div className="text-xs font-semibold text-gray-500">Expert profile</div>
                <div className="mt-2 space-y-2 text-gray-700">
                  <div>
                    <span className="font-medium">Voice:</span> {run.expertProfile.voice}
                  </div>
                  <div>
                    <span className="font-medium">Stance:</span> {run.expertProfile.stance}
                  </div>
                  <div>
                    <span className="font-medium">Depth:</span> {run.expertProfile.depth}
                  </div>
                </div>
              </div>
            </div>
          </details>
        </section>

        {/* Orchestration plan (progressive disclosure) */}
        <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Overnight orchestration</h2>
              <p className="text-sm text-gray-600">
                This is not a conversation loop. It’s a task graph: each sub-agent gets a tight context window and a clear objective.
              </p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">Vision UI</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {run.tonightPlan.map((s) => (
              <div key={s.step} className="border rounded-xl p-3 bg-gray-50">
                <div className="text-sm font-medium">{s.step}</div>
                <div className="text-xs text-gray-600 mt-1">{s.detail}</div>
              </div>
            ))}
          </div>

          <details className="border rounded-xl p-4 bg-gray-50">
            <summary className="cursor-pointer text-sm font-medium">
              Why “clean context” matters (and what we avoid)
            </summary>
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              <p>
                In long chats, unrelated history contaminates decisions. We instead define structure outside the model:
                objectives, inputs, dependencies, and outputs live in the system.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Each agent gets only the inputs it needs — nothing more.</li>
                <li>Agents run in parallel when tasks are independent.</li>
                <li>Outputs are reviewed and synthesized with explicit confidence + assumptions.</li>
              </ul>
              <p className="text-gray-600">
                Principle: <b>the system owns structure + tools; the LLM is an executor inside it.</b>
              </p>
            </div>
          </details>
        </section>

        {/* Deliverables preview */}
        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold">Deliverables (preview)</h2>
            <p className="text-sm text-gray-600">What you’ll see in the morning bundle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {run.previewOutputs.map((o) => (
              <div key={o.title} className="bg-white border rounded-2xl shadow-sm p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-gray-500">{o.type}</div>
                    <div className="text-lg font-semibold">{o.title}</div>
                  </div>
                  <OutputState state={o.state} />
                </div>
                <p className="text-sm text-gray-700">{o.note}</p>

                <div className="flex gap-2">
                  <Link
                    href={`/runs/${runId}/morning`}
                    className="text-sm bg-black text-white rounded-xl px-3 py-2"
                  >
                    View morning bundle
                  </Link>
                  <Link
                    href={`/runs/${runId}/agents`}
                    className="text-sm border bg-white rounded-xl px-3 py-2"
                  >
                    See which agents produce this
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-white border rounded-2xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Next action</h2>
              <p className="text-sm text-gray-600">
                In demo mode, jump straight to deliverables or agent map.
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/runs/${runId}/morning`} className="text-sm bg-black text-white rounded-xl px-4 py-2">
                Open deliverables
              </Link>
              <Link href={`/runs/${runId}/agents`} className="text-sm border bg-white rounded-xl px-4 py-2">
                Open agent map
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

