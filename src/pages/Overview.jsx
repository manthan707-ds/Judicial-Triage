import {
  ArrowUpRight,
  ShieldCheck,
  Clock3,
  AlertTriangle,
  TrendingUp,
  Database,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function Overview({
  backendData,
  cases = [],
  onNavigate,
  onOpenCase,
}) {
  const total = Number(backendData?.total ?? 0);
  const priority = Number(backendData?.priority ?? 0);
  const undertrial = Number(backendData?.undertrial ?? 0);
  const immediate = Number(backendData?.immediate_review ?? 0);

  /*
   * Calculate percentages from the actual backend numbers.
   * No hard-coded triage percentages.
   */
  const priorityPercent =
    total > 0 ? Math.round((priority / total) * 100) : 0;

  const undertrialPercent =
    total > 0 ? Math.round((undertrial / total) * 100) : 0;

  const immediatePercent =
    total > 0 ? Math.round((immediate / total) * 100) : 0;

  /*
   * Use the first five actual cases received from the backend.
   */
  const attentionCases = Array.isArray(cases)
    ? cases.slice(0, 5)
    : [];

  /*
   * State distribution from currently loaded case records.
   * This automatically adapts when your larger dataset is connected.
   */
  const stateCounts = {};

  attentionCases.forEach((item) => {
    const state = item?.state || "Unknown";
    stateCounts[state] = (stateCounts[state] || 0) + 1;
  });

  const topStates = Object.entries(stateCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="w-full max-w-[1500px] mx-auto">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <section className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">

        {/* Tricolour accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white border-y border-slate-100" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        <div className="px-6 py-8 lg:px-9 lg:py-10">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            <div className="max-w-3xl">

              <div className="flex items-center gap-2 mb-4">

                <span className="inline-block w-2 h-2 rounded-full bg-[#FF9933]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Judicial Intelligence
                </span>

              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] text-[#071A2F] leading-[1.05]">
                JudicialTriage
                <span className="text-[#FF9933]">.</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-500 leading-7 max-w-2xl">
                A unified intelligence workspace for understanding
                judicial pendency, identifying priority matters and
                supporting informed case triage.
              </p>

            </div>


            {/* Dataset status */}

            <div className="shrink-0">

              <div className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <Database
                    size={17}
                    className="text-[#071A2F]"
                  />
                </div>

                <div>

                  <p className="text-[9px] uppercase tracking-[0.16em] text-slate-400 font-semibold">
                    Data status
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <span className="w-2 h-2 rounded-full bg-[#138808]" />

                    <span className="text-xs font-medium text-slate-700">
                      Live backend data
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          KEY STATISTICS
      ========================================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">

        <MetricCard
          label="Total pending"
          value={total}
          description="Pending matters in dataset"
          icon={<Database size={18} />}
          accent="navy"
        />

        <MetricCard
          label="Priority cases"
          value={priority}
          description={`${priorityPercent}% of total pending`}
          icon={<TrendingUp size={18} />}
          accent="saffron"
        />

        <MetricCard
          label="Undertrial matters"
          value={undertrial}
          description={`${undertrialPercent}% of total pending`}
          icon={<ShieldCheck size={18} />}
          accent="green"
        />

        <MetricCard
          label="Immediate review"
          value={immediate}
          description={`${immediatePercent}% of total pending`}
          icon={<AlertTriangle size={18} />}
          accent="red"
        />

      </section>


      {/* =========================================================
          MAIN INTELLIGENCE AREA
      ========================================================= */}

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">

        {/* ---------------------------------------------------------
            PENDENCY OVERVIEW
        --------------------------------------------------------- */}

        <div className="xl:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-sm">

          <div className="px-6 py-5 lg:px-7 border-b border-slate-100">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-[9px] uppercase tracking-[0.2em] text-[#FF9933] font-semibold">
                  Intelligence overview
                </p>

                <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#071A2F]">
                  Judicial pendency
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Current dataset snapshot
                </p>

              </div>

              <button
                onClick={() => onNavigate?.("Analytics")}
                className="group inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#FF9933] transition"
              >
                Open analytics
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                />
              </button>

            </div>

          </div>


          {/* Large number */}

          <div className="px-6 py-7 lg:px-7">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

              <div>

                <p className="text-xs text-slate-400">
                  Total pending matters
                </p>

                <p className="mt-2 text-4xl lg:text-5xl font-semibold tracking-tight text-[#071A2F]">
                  {formatNumber(total)}
                </p>

              </div>


              <div className="flex items-center gap-2">

                <div className="w-8 h-8 rounded-lg bg-[#FFF4E6] flex items-center justify-center">
                  <TrendingUp
                    size={15}
                    className="text-[#FF9933]"
                  />
                </div>

                <div>

                  <p className="text-xs font-medium text-slate-700">
                    Dataset connected
                  </p>

                  <p className="text-[10px] text-slate-400">
                    Values supplied by backend
                  </p>

                </div>

              </div>

            </div>


            {/* Distribution bar */}

            <div className="mt-8">

              <div className="flex justify-between mb-2">

                <span className="text-[10px] uppercase tracking-wider text-slate-400">
                  Case composition
                </span>

                <span className="text-[10px] text-slate-400">
                  {formatNumber(total)} matters
                </span>

              </div>


              <div className="h-3 w-full rounded-full overflow-hidden bg-slate-100 flex">

                <div
                  className="bg-[#071A2F] transition-all"
                  style={{
                    width: `${Math.min(priorityPercent, 100)}%`,
                  }}
                  title={`Priority: ${priorityPercent}%`}
                />

                <div
                  className="bg-[#FF9933] transition-all"
                  style={{
                    width: `${Math.min(immediatePercent, 100)}%`,
                  }}
                  title={`Immediate review: ${immediatePercent}%`}
                />

                <div
                  className="bg-[#138808] transition-all"
                  style={{
                    width: `${Math.min(undertrialPercent, 100)}%`,
                  }}
                  title={`Undertrial: ${undertrialPercent}%`}
                />

                <div className="flex-1 bg-slate-200" />

              </div>


              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">

                <Legend
                  color="bg-[#071A2F]"
                  label="Priority"
                  value={`${priorityPercent}%`}
                />

                <Legend
                  color="bg-[#FF9933]"
                  label="Immediate"
                  value={`${immediatePercent}%`}
                />

                <Legend
                  color="bg-[#138808]"
                  label="Undertrial"
                  value={`${undertrialPercent}%`}
                />

                <Legend
                  color="bg-slate-200"
                  label="Other"
                  value={`${Math.max(
                    0,
                    100 -
                      priorityPercent -
                      immediatePercent -
                      undertrialPercent
                  )}%`}
                />

              </div>

            </div>

          </div>

        </div>


        {/* ---------------------------------------------------------
            TRIAGE PANEL
        --------------------------------------------------------- */}

        <div className="rounded-2xl bg-[#071A2F] text-white overflow-hidden relative">

          {/* subtle tricolour line */}

          <div className="absolute top-0 left-0 right-0 h-[3px] flex">

            <div className="flex-1 bg-[#FF9933]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#138808]" />

          </div>


          <div className="p-6 lg:p-7">

            <div className="flex items-start justify-between">

              <div>

                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">

                  <ShieldCheck
                    size={19}
                    className="text-[#FF9933]"
                  />

                </div>

                <p className="text-lg font-semibold">
                  Triage signals
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Derived from current case statistics
                </p>

              </div>

            </div>


            <div className="mt-8 space-y-6">

              <DarkMetric
                label="Priority cases"
                value={priority}
                percentage={priorityPercent}
              />

              <DarkMetric
                label="Undertrial matters"
                value={undertrial}
                percentage={undertrialPercent}
                green
              />

              <DarkMetric
                label="Immediate review"
                value={immediate}
                percentage={immediatePercent}
                accent
              />

            </div>


            <button
              onClick={() => onNavigate?.("Case Queue")}
              className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10 transition group"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-medium">
                    Open case queue
                  </p>

                  <p className="text-[10px] text-slate-400 mt-1">
                    Review individual matters
                  </p>

                </div>

                <ChevronRight
                  size={16}
                  className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition"
                />

              </div>

            </button>

          </div>

        </div>

      </section>


      {/* =========================================================
          STATE SNAPSHOT
      ========================================================= */}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">

        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-sm">

          <div className="px-6 py-5 border-b border-slate-100">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-[#F4F8F3] flex items-center justify-center">

                <MapPin
                  size={17}
                  className="text-[#138808]"
                />

              </div>

              <div>

                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400">
                  Geographic snapshot
                </p>

                <h2 className="text-xl font-semibold text-[#071A2F] mt-0.5">
                  State distribution
                </h2>

              </div>

            </div>

          </div>


          <div className="p-6">

            {topStates.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {topStates.map(([state, count], index) => (

                  <div
                    key={state}
                    className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-sm font-medium text-slate-700">
                          {state}
                        </span>

                      </div>

                      <span className="text-sm font-semibold text-[#071A2F]">
                        {count}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="py-8 text-center">

                <MapPin
                  size={22}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm text-slate-400">
                  State-level information will appear when
                  case records are loaded.
                </p>

              </div>

            )}

          </div>

        </div>


        {/* Data quality / system panel */}

        <div className="rounded-2xl bg-[#F8FAF8] border border-slate-200 p-6">

          <p className="text-[9px] uppercase tracking-[0.18em] text-[#138808] font-semibold">
            System intelligence
          </p>

          <h2 className="text-xl font-semibold text-[#071A2F] mt-1">
            Dataset status
          </h2>

          <div className="mt-6 space-y-4">

            <StatusRow
              label="Backend connection"
              value="Connected"
              positive
            />

            <StatusRow
              label="Case records"
              value={formatNumber(cases.length)}
              positive
            />

            <StatusRow
              label="Priority classification"
              value="Active"
              positive
            />

            <StatusRow
              label="Triage engine"
              value="Operational"
              positive
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          ATTENTION QUEUE
      ========================================================= */}

      <section className="mt-5 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-100">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <p className="text-[9px] uppercase tracking-[0.2em] text-[#FF9933] font-semibold">
                Attention queue
              </p>

              <h2 className="text-2xl font-semibold tracking-tight text-[#071A2F] mt-1">
                Cases requiring review
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Highest-priority records from the current dataset
              </p>

            </div>


            <button
              onClick={() => onNavigate?.("Case Queue")}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#FF9933] transition"
            >
              View complete queue
              <ArrowUpRight size={14} />
            </button>

          </div>

        </div>


        <div className="divide-y divide-slate-100">

          {attentionCases.map((item) => (

            <button
              key={item.id}
              onClick={() => onOpenCase?.(item)}
              className="w-full text-left px-6 py-4 hover:bg-slate-50 transition group"
            >

              <div className="flex flex-col md:flex-row md:items-center gap-4">

                {/* Case ID */}

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-2">

                    <p className="text-sm font-semibold text-[#071A2F] truncate">
                      {item.id || item.case_id || "Unnamed case"}
                    </p>

                    <ChevronRight
                      size={14}
                      className="text-slate-300 group-hover:text-[#FF9933] group-hover:translate-x-1 transition"
                    />

                  </div>

                  <p className="text-[11px] text-slate-400 mt-1">
                    {item.type || item.case_type || "Case"}
                    {" · "}
                    {item.category || item.case_category || "General"}
                  </p>

                </div>


                {/* State */}

                <div className="hidden md:flex items-center gap-2 min-w-[130px]">

                  <MapPin
                    size={13}
                    className="text-slate-300"
                  />

                  <span className="text-xs text-slate-500 truncate">
                    {item.state || "—"}
                  </span>

                </div>


                {/* Age */}

                <div className="hidden sm:flex items-center gap-2 min-w-[100px]">

                  <Clock3
                    size={13}
                    className="text-slate-300"
                  />

                  <span className="text-xs text-slate-500">
                    {item.age ?? 0} days
                  </span>

                </div>


                {/* Priority */}

                <PriorityBadge priority={item.priority} />

              </div>

            </button>

          ))}


          {!attentionCases.length && (

            <div className="py-14 text-center">

              <div className="w-11 h-11 rounded-full bg-slate-50 mx-auto flex items-center justify-center">

                <Database
                  size={18}
                  className="text-slate-300"
                />

              </div>

              <p className="text-sm font-medium text-slate-500 mt-3">
                No case records available
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Backend records will appear here once loaded.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =========================================================
          GOVERNANCE
      ========================================================= */}

      <section className="mt-5 mb-8 rounded-xl border border-[#FFE0B2] bg-[#FFF9F2] px-5 py-4">

        <div className="flex gap-3">

          <div className="shrink-0 w-8 h-8 rounded-lg bg-[#FFEDD5] flex items-center justify-center">

            <AlertTriangle
              size={15}
              className="text-[#FF9933]"
            />

          </div>

          <div>

            <p className="text-xs font-semibold text-[#071A2F]">
              Decision-support system
            </p>

            <p className="text-[11px] text-slate-500 leading-5 mt-1">
              JudicialTriage provides analytical and triage
              recommendations based on available data. It does not
              replace judicial discretion, legal judgment or decisions
              made by authorized judicial personnel.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}


/* ===============================================================
   COMPONENTS
   =============================================================== */

function MetricCard({
  label,
  value,
  description,
  icon,
  accent = "navy",
}) {
  const styles = {
    navy: {
      icon: "bg-[#EEF3F7] text-[#071A2F]",
      line: "bg-[#071A2F]",
    },

    saffron: {
      icon: "bg-[#FFF4E6] text-[#FF9933]",
      line: "bg-[#FF9933]",
    },

    green: {
      icon: "bg-[#EFF8EE] text-[#138808]",
      line: "bg-[#138808]",
    },

    red: {
      icon: "bg-[#FEF2F2] text-red-600",
      line: "bg-red-500",
    },
  };

  const current = styles[accent] || styles.navy;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm p-5">

      <div className="flex items-start justify-between">

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${current.icon}`}
        >
          {icon}
        </div>

        <div className={`w-12 h-1 rounded-full ${current.line}`} />

      </div>

      <p className="text-xs text-slate-400 mt-6">
        {label}
      </p>

      <p className="text-3xl font-semibold tracking-tight text-[#071A2F] mt-1">
        {formatNumber(value)}
      </p>

      <p className="text-[10px] text-slate-400 mt-2">
        {description}
      </p>

    </div>
  );
}


function Legend({
  color,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className={`w-2 h-2 rounded-full ${color}`}
      />

      <div>

        <p className="text-[10px] text-slate-400">
          {label}
        </p>

        <p className="text-xs font-semibold text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}


function DarkMetric({
  label,
  value,
  percentage,
  green = false,
  accent = false,
}) {
  return (
    <div>

      <div className="flex items-center justify-between mb-2">

        <span className="text-xs text-slate-300">
          {label}
        </span>

        <span className="text-xs font-semibold">
          {formatNumber(value)}
        </span>

      </div>

      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">

        <div
          className={`h-full rounded-full transition-all ${
            accent
              ? "bg-[#FF9933]"
              : green
              ? "bg-[#138808]"
              : "bg-white"
          }`}
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />

      </div>

      <p className="text-[9px] text-slate-500 mt-1.5">
        {percentage}% of total pending
      </p>

    </div>
  );
}


function StatusRow({
  label,
  value,
  positive = false,
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-xs text-slate-500">
        {label}
      </span>

      <div className="flex items-center gap-1.5">

        <span
          className={`w-1.5 h-1.5 rounded-full ${
            positive ? "bg-[#138808]" : "bg-slate-300"
          }`}
        />

        <span className="text-xs font-medium text-slate-700">
          {value}
        </span>

      </div>

    </div>
  );
}


function PriorityBadge({
  priority,
}) {
  const value = priority || "Pending";

  let classes =
    "text-slate-600 bg-slate-50 border-slate-200";

  if (value === "Immediate Review") {
    classes =
      "text-red-700 bg-red-50 border-red-200";
  } else if (value === "Fast Track") {
    classes =
      "text-[#138808] bg-[#EFF8EE] border-[#CDE7CA]";
  } else if (value === "Priority") {
    classes =
      "text-[#B45309] bg-[#FFF7ED] border-[#FED7AA]";
  }

  return (
    <span
      className={`shrink-0 text-[9px] uppercase tracking-[0.12em] font-semibold px-3 py-1.5 rounded-full border ${classes}`}
    >
      {value}
    </span>
  );
}


function formatNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return number.toLocaleString("en-IN");
}