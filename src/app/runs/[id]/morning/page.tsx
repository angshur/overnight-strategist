import Link from "next/link";

const MOCK = {
  client: "Acme Dental",
  runId: "run_123",
  generatedAt: "Tomorrow, 7:12 AM",
  confidence: "Medium",
  highlights: [
    "Demand capture is strong, but after-hours call leakage is likely suppressing bookings.",
    "Competitors are bidding aggressively on emergency intent—need tighter geo + service-line segmentation.",
    "Capacity is near full for hygiene; bias spend toward high-LTV consults (implants/Invisalign).",
  ],
  deliverables: [
    {
      title: "Executive Brief",
      type: "1-pager",
      status: "Ready",
      description: "≤150-word summary + top drivers + risks + next actions.",
      tags: ["CEO-ready", "Client-facing"],
    },
    {
      title: "90-Day Growth Strategy",
      type: "Strategy doc",
      status: "Ready",
      description: "Positioning, channel plan, budget posture, and service-line focus.",
      tags: ["Strategy", "Demand gen"],
    },
    {
      title: "2-Week Experiment Plan",
      type: "Test plan",
      status: "Ready",
      description: "3 experiments with hypotheses, success metrics, and effort/impact.",
      tags: ["Experimentation", "Execution"],
    },
    {
      title: "Messaging Angles (x3)",
      type: "Creative brief",
      status: "Ready",
      description: "3 angles + objections handled + suggested proof points.",
      tags: ["Creative", "Conversion"],
    },
    {
      title: "Landing Page Outline",
      type: "Wire outline",
      status: "Ready",
      description: "Section-by-section structure optimized for consult bookings.",
      tags: ["CRO", "UX"],
    },
    {
      title: "Measurement & Attribution Fixes",
      type: "Ops plan",
      status: "Ready",
      description: "Tracking, call routing, lead-quality rubric, guardrails.",
      tags: ["Measurement", "Ops"],
    },
    {
      title: "Incrementality Test Options",
      type: "Playbook",
      status: "Draft",
      description: "Feasible holdout/geo split options for local healthcare.",
      tags: ["Incrementality", "Causality"],
    },
    {
      title: "Front Desk + After-Hours Workflow",
      type: "Operating SOP",
      status: "Ready",
      description: "Missed-call recovery loop + scheduling scripts + SLA.",
      tags: ["Operations", "Service"],
    },
    {
      title: "Reputation & Reviews Plan",
      type: "Operating SOP",
      status: "Ready",
      description: "Review capture, response templates, and service recovery loop.",
      tags: ["Reputation", "Retention"],
    },
  ],
  missingInfo: [
    "Which procedures are highest margin and currently underutilized?",
    "Average lead → consult → treatment conversion rates (approx is fine).",
    "Call handling: hours, staffing, voicemail, response time, booking scripts.",
    "Insurance posture: in-network vs out-of-network split and messaging constraints.",
    "Top 3 zip codes that matter most (and any you want to avoid).",
  ],
};

function Pill({ label }: { label: string }) {
  return <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{label}</span>;
}

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, string> = {
    Ready: "bg-green-50 text-green-700 border-green-200",
    Draft: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Blocked: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${map[s] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
      {s}
    </span>
  );
}

export default function MorningPage({ params }: { params: { id: string } }) {
  const runId = params.id;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <header className="space-y-3">
          <div className="flex items-center justify-between">
            <Link href={`/runs/${runId}`} className="text-sm text-gray-600 underline">
              ← Back to run
            </Link>
            <div className="flex gap-2">
              <Link href={`/runs/${runId}/agents`} className="text-sm border bg-white rounded-xl px-3 py-2">
                View agent map
              </Link>
              <button className="text-sm bg-black text-white rounded-xl px-3 py-2" type="button">
                Export package (mock)
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">Morning Deliverables</h1>
          <p className="text-gray-600">
            Client: <b>{MOCK.client}</b> • Run: <b>{runId}</b> • Generated: <b>{MOCK.generatedAt}</b>
          </p>

          <div className="flex flex-wrap gap-2">
            <Pill label={`Confidence: ${MOCK.confidence}`} />
            <Pill label="System owns structure + tools" />
            <Pill label="LLM executes tasks inside it" />
            <Pill label="Parallel agents → synthesis" />
          </div>
        </header>

        {/* Highlights */}
        <section className="bg-white border rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold mb-3">Top highlights</h2>
          <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
            {MOCK.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>

        {/* Deliverables grid */}
        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold">Deliverables</h2>
            <p className="text-sm text-gray-600">9 outputs packaged for an agency owner in the morning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK.deliverables.map((d) => (
              <div key={d.title} className="bg-white border rounded-2xl shadow-sm p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">{d.type}</div>
                    <div className="text-lg font-semibold">{d.title}</div>
                  </div>
                  <StatusBadge s={d.status} />
                </div>

                <p className="text-sm text-gray-700">{d.description}</p>

                <div className="flex flex-wrap gap-2">
                  {d.tags.map((t) => (
                    <Pill key={t} label={t} />
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <button className="text-sm border rounded-xl px-3 py-2 bg-white" type="button">
                    Open (mock)
                  </button>
                  <button className="text-sm border rounded-xl px-3 py-2 bg-white" type="button">
                    Copy summary (mock)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Progressive disclosure: missing info */}
        <section className="bg-white border rounded-2xl shadow-sm p-6">
          <details>
            <summary className="cursor-pointer font-semibold">Missing info that would improve quality</summary>
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              <p className="text-gray-600">
                The system can ask for missing inputs and re-run overnight. (Vision UI only.)
              </p>
              <ul className="list-disc pl-5 space-y-2">
                {MOCK.missingInfo.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
              <button className="mt-3 text-sm bg-black text-white rounded-xl px-3 py-2" type="button">
                Request inputs + schedule rerun (mock)
              </button>
            </div>
          </details>
        </section>
      </div>
    </main>
  );
}

