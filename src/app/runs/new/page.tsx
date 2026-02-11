"use client";

import Link from "next/link";

const ACME_PRESET = `Goal: Increase qualified new-patient leads for Acme Dental without lowering lead quality.

Context:
- Location: suburban, 8-mile radius
- Services: implants, Invisalign, emergency dentistry, family dentistry
- Current mix: Google Search + Maps + some Meta
- Lead sources: calls + forms, but call tracking is inconsistent

Constraints / complications:
- New competitors bidding aggressively on “emergency dentist near me”
- Hygiene schedule is near capacity (we need high-LTV cases, not low-value cleanings)
- Many calls are missed after-hours; staff is limited
- Reviews are good overall, but a few recent 1-star reviews mention wait times
- Insurance mix is complex; some plans are out-of-network
- Seasonal dip expected in March/April

Deliverables for tomorrow morning:
1) 1-page strategy (positioning + channel plan + targeting)
2) 2-week experiment plan (3 tests, expected impact, effort)
3) Messaging angles (3 variants) and landing page outline
4) Measurement plan (tracking fixes, lead quality rubric)
5) Risks, assumptions, and confidence level`;

const PRESETS = [
  {
    id: "acme-dental",
    name: "Acme Dental",
    industry: "Dental Practice",
    note: "High-LTV consult growth (implants/Invisalign)",
    presetText: ACME_PRESET,
  },
  {
    id: "peak-pt",
    name: "Peak Physical Therapy",
    industry: "Healthcare",
    note: "Increase booked evals, reduce no-shows",
    presetText: `Goal: Increase booked PT evaluations by 25% in 60 days while reducing no-shows.

Context:
- Location: 3 clinics across one metro area
- Services: sports rehab, post-op, chronic pain
- Current mix: Google Ads + GBP + referrals
- Biggest leak: scheduling friction and inconsistent follow-up

Constraints / complications:
- Front desk overloaded at peak hours
- Doctors want fewer low-intent calls
- Competitor offering “same-day eval” aggressively
- Reviews are strong but inconsistent across locations

Deliverables for tomorrow morning:
1) Channel + local SEO strategy
2) 2-week experiment plan (3 tests)
3) Follow-up workflow (SMS/email scripts)
4) Measurement plan (call + form attribution)
5) Risks/assumptions/confidence`,
  },
  {
    id: "skyline-roofing",
    name: "Skyline Roofing",
    industry: "Home Services",
    note: "More estimates, higher close rate",
    presetText: `Goal: Increase booked roofing estimates by 20% and improve close rate in 90 days.

Context:
- Location: storm-prone region, high seasonality
- Services: repairs, replacements, insurance claims
- Current mix: Google Search + LSAs + reviews
- Biggest issue: slow quote turnaround and lead leakage after-hours

Constraints / complications:
- Spiky demand after storms
- Many leads are price shoppers
- Call answering after-hours is inconsistent
- Sales follow-up varies by rep

Deliverables for tomorrow morning:
1) Strategy doc (demand capture + reputation)
2) 2-week experiment plan (3 tests)
3) Estimate follow-up playbook
4) Measurement plan (lead quality + speed-to-lead)
5) Risks/assumptions/confidence`,
  },
];

export default function NewRunPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <Link href="/" className="text-sm text-gray-600 underline">
            ← Home
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">New Overnight Run</h1>
          <p className="text-gray-600">
            Demo mode: no database. This page creates a run and routes to a polished “overnight orchestration” experience.
          </p>
        </header>

        {/* Form */}
        <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Client</label>
              <select
                className="mt-2 w-full border rounded-xl px-3 py-2 bg-white"
                defaultValue={PRESETS[0].id}
                onChange={(e) => {
                  const preset = PRESETS.find((p) => p.id === e.target.value);
                  if (!preset) return;
                  const ta = document.getElementById("goal") as HTMLTextAreaElement | null;
                  if (ta) ta.value = preset.presetText;
                }}
              >
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.industry}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Tip: switch clients to auto-fill a strong “expert intake” prompt.
              </p>
            </div>

            <div className="md:col-span-1">
              <label className="text-sm font-medium">Run mode</label>
              <div className="mt-2 border rounded-xl p-3 bg-gray-50 text-sm text-gray-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Overnight</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Recommended
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  You define the goal + constraints. The system runs multiple agents in parallel and packages a morning bundle.
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between">
              <label className="text-sm font-medium">Goal + constraints + deliverables</label>
              <span className="text-xs text-gray-500">This becomes the “clean context” for the task graph.</span>
            </div>
            <textarea
              id="goal"
              className="mt-2 w-full min-h-[280px] border rounded-2xl p-4 font-mono text-xs bg-gray-50"
              defaultValue={PRESETS[0].presetText}
            />
          </div>

          {/* Progressive disclosure */}
          <details className="border rounded-2xl p-4 bg-white">
            <summary className="cursor-pointer text-sm font-medium">
              What happens overnight (progressive disclosure)
            </summary>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                ["Normalize intake", "Extract objective + constraints, remove noise to avoid context pollution."],
                ["Run 15 agents", "Parallel specialists: acquisition, retention, ops, measurement, finance, risk."],
                ["Synthesize", "Resolve conflicts, rank actions, add confidence + assumptions."],
                ["Package bundle", "Morning brief + strategy + experiments + scripts + tracking plan."],
              ].map(([title, desc]) => (
                <div key={title} className="border rounded-xl p-3 bg-gray-50">
                  <div className="text-sm font-medium">{title}</div>
                  <div className="text-xs text-gray-600 mt-1">{desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-xs text-gray-600">
              Principle: <b>the system owns structure + tools; the LLM is an executor inside it.</b>
            </div>
          </details>

          {/* CTA */}
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between pt-2">
            <div className="text-sm text-gray-600">
              Demo navigation:
              <span className="ml-2">
                <Link className="underline" href="/runs/demo-123">
                  Run detail
                </Link>
              </span>
              <span className="ml-2">
                <Link className="underline" href="/runs/demo-123/agents">
                  Agent map
                </Link>
              </span>
              <span className="ml-2">
                <Link className="underline" href="/runs/demo-123/morning">
                  Morning deliverables
                </Link>
              </span>
            </div>

            <Link
              href="/runs/demo-123"
              className="inline-flex justify-center bg-black text-white rounded-2xl px-5 py-3 text-sm font-medium"
            >
              Schedule Overnight →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

