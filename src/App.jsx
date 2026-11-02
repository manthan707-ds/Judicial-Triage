import { useEffect, useMemo, useState } from "react";
import Overview from "./pages/Overview";
import Login from "./pages/Login";
import { DEMO_DATA } from "./demoData";
import {
  LayoutDashboard,
  Scale,
  BriefcaseBusiness,
  BarChart3,
  Bell,
  Settings,
  Search,
  ChevronDown,
  Clock3,
  AlertTriangle,
  Users,
  FileText,
  ArrowUpRight,
  ArrowLeft,
  CheckCircle2,
  X,
  ShieldCheck,
  BrainCircuit,
  CalendarDays,
  Gavel,
  MapPinned,
  TrendingUp,
  Activity,
  Menu,
  LogOut,
} from "lucide-react";


const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const DEMO_FALLBACK = import.meta.env.VITE_DEMO_FALLBACK !== "false";

/* =========================================================
   JUDICIALTRIAGE SYSTEM
   Frontend prototype connected to FastAPI
========================================================= */


const demoCases = [
  {
    id: "CASE-001",
    type: "Criminal",
    category: "Undertrial",
    state: "Maharashtra",
    district: "Nagpur",
    age: 895,
    hearings: 17,
    parties: 4,
    predicted: 156,
    score: 91,
    priority: "Immediate Review",
    undertrial: true,
    stage: "Evidence",
    filed: "14 March 2024",
    adjournments: 8,
  },
  {
    id: "CASE-002",
    type: "Civil",
    category: "Property",
    state: "Maharashtra",
    district: "Nagpur",
    age: 742,
    hearings: 11,
    parties: 6,
    predicted: 180,
    score: 82,
    priority: "Complex",
    undertrial: false,
    stage: "Arguments",
    filed: "13 August 2024",
    adjournments: 6,
  },
  {
    id: "CASE-003",
    type: "Civil",
    category: "Contract",
    state: "Gujarat",
    district: "Ahmedabad",
    age: 320,
    hearings: 5,
    parties: 2,
    predicted: 75,
    score: 43,
    priority: "Fast Track",
    undertrial: false,
    stage: "Evidence",
    filed: "08 October 2025",
    adjournments: 2,
  },
];


const priorityStyles = {
  "Immediate Review":
    "bg-red-50 text-red-700 border-red-200",

  Complex:
    "bg-orange-50 text-orange-700 border-orange-200",

  Standard:
    "bg-blue-50 text-blue-700 border-blue-200",

  "Fast Track":
    "bg-green-50 text-green-700 border-green-200",
};


function AppShell({ user, onLogout }) {

  const [activePage, setActivePage] =
    useState("Overview");

  const [cases, setCases] =
    useState(demoCases);

  const [backendData, setBackendData] =
    useState(null);

  const [backendError, setBackendError] =
    useState(null);

  const [selectedCase, setSelectedCase] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [notifications, setNotifications] =
    useState(false);


  /* =========================================================
     BACKEND CONNECTION
  ========================================================= */

  useEffect(() => {

    fetch(`${API_URL}/api/cases`)

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Backend request failed"
          );
        }

        return response.json();

      })

      .then((data) => {

        console.log(
          "JudicialTriage backend:",
          data
        );

        setBackendData(data);

        if (data.cases) {
          setCases(data.cases);
        }

      })

      .catch((error) => {

        console.error(error);

        /* Backend unavailable: use sample data unless VITE_DEMO_FALLBACK=false */
        if (DEMO_FALLBACK) {
          setBackendData(DEMO_DATA);
          setCases(DEMO_DATA.cases);
        }

        setBackendError(
          error.message
        );

      });

  }, []);


  /* =========================================================
     FILTERED CASES
  ========================================================= */

  const filteredCases = useMemo(() => {

    return cases.filter((item) => {

      const matchesSearch =
        item.id
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        item.type
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        item.category
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        item.state
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesPriority =
        priorityFilter === "All" ||
        item.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesPriority
      );

    });

  }, [
    cases,
    searchTerm,
    priorityFilter,
  ]);


  const openCase = (item) => {
    setSelectedCase(item);
  };


  const navigate = (page) => {

    setSelectedCase(null);

    setActivePage(page);

    setMobileMenu(false);

  };


  return (

    <div className="min-h-screen bg-[#F6F7F5] text-[#0B1F33]">

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[265px] bg-[#071A2F] text-white flex-col z-40">

        {/* Brand */}

        <div className="px-7 pt-7 pb-6">

          <div className="flex items-center gap-3">

            <div className="relative">

              <div className="w-12 h-12 rounded-full border border-white/20 bg-white flex items-center justify-center">

                <Scale
                  size={25}
                  className="text-[#071A2F]"
                />

              </div>

              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FF9933] rounded-full flex items-center justify-center">

                <div className="w-2 h-2 rounded-full bg-white" />

              </div>

            </div>

            <div>

              <h1 className="font-semibold text-lg tracking-tight">
                JudicialTriage
              </h1>

              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">
                Case Prioritisation Platform
              </p>

            </div>

          </div>

        </div>


        {/* Tricolor */}

        <div className="flex h-[3px]">

          <div className="flex-1 bg-[#FF9933]" />

          <div className="flex-1 bg-white" />

          <div className="flex-1 bg-[#138808]" />

        </div>


        {/* Navigation */}

        <div className="px-4 py-7">

          <p className="px-3 text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-3">
            Workspace
          </p>


          <NavItem
            icon={LayoutDashboard}
            label="Overview"
            active={
              activePage === "Overview"
            }
            onClick={() =>
              navigate("Overview")
            }
          />

          <NavItem
            icon={BriefcaseBusiness}
            label="Case Queue"
            active={
              activePage === "Case Queue"
            }
            onClick={() =>
              navigate("Case Queue")
            }
          />

          <NavItem
            icon={BarChart3}
            label="Analytics"
            active={
              activePage === "Analytics"
            }
            onClick={() =>
              navigate("Analytics")
            }
          />

          <NavItem
            icon={Bell}
            label="Alerts"
            active={
              activePage === "Alerts"
            }
            badge="12"
            onClick={() =>
              navigate("Alerts")
            }
          />

        </div>


        {/* System */}

        <div className="mt-auto px-5 pb-6">

          <div className="border-t border-white/10 pt-5">

            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-3">
              System
            </p>

            <NavItem
              icon={Settings}
              label="Settings"
              active={
                activePage === "Settings"
              }
              onClick={() =>
                navigate("Settings")
              }
            />

            <NavItem
              icon={LogOut}
              label="Sign out"
              active={false}
              onClick={onLogout}
            />

          </div>


          <div className="mt-5 p-4 bg-white/[0.04] border border-white/10">

            <div className="flex items-center gap-2">

              <span className="w-2 h-2 rounded-full bg-[#138808]" />

              <span className="text-xs text-slate-300">
                Data services operational
              </span>

            </div>

            <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
              Human oversight remains required for all triage recommendations.
            </p>

          </div>

        </div>

      </aside>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileMenu && (

        <div className="lg:hidden fixed inset-0 z-50">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileMenu(false)
            }
          />

          <div className="relative w-[280px] h-full bg-[#071A2F] text-white p-5">

            <div className="flex justify-between items-center mb-8">

              <span className="font-semibold">
                JudicialTriage
              </span>

              <button
                onClick={() =>
                  setMobileMenu(false)
                }
              >
                <X size={20} />
              </button>

            </div>

            <NavItem
              icon={LayoutDashboard}
              label="Overview"
              active={
                activePage === "Overview"
              }
              onClick={() =>
                navigate("Overview")
              }
            />

            <NavItem
              icon={BriefcaseBusiness}
              label="Case Queue"
              active={
                activePage === "Case Queue"
              }
              onClick={() =>
                navigate("Case Queue")
              }
            />

            <NavItem
              icon={BarChart3}
              label="Analytics"
              active={
                activePage === "Analytics"
              }
              onClick={() =>
                navigate("Analytics")
              }
            />

            <NavItem
              icon={Bell}
              label="Alerts"
              active={
                activePage === "Alerts"
              }
              onClick={() =>
                navigate("Alerts")
              }
            />

          </div>

        </div>

      )}


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="lg:ml-[265px] min-h-screen">

        {/* Header */}

        <header className="h-[76px] bg-white border-b border-[#E5E7E5] flex items-center justify-between px-5 sm:px-8 sticky top-0 z-30">

          <div className="flex items-center gap-4">

            <button
              className="lg:hidden"
              onClick={() =>
                setMobileMenu(true)
              }
            >
              <Menu size={22} />
            </button>

            <div>

              <p className="hidden sm:block text-[10px] uppercase tracking-[0.16em] text-slate-400">
                Judicial Intelligence Platform
              </p>

              <h2 className="font-serif text-xl sm:text-2xl text-[#071A2F]">
                {selectedCase
                  ? "Case Intelligence"
                  : activePage}
              </h2>

            </div>

          </div>


          <div className="flex items-center gap-4">

            {/* Date */}

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">

              <CalendarDays size={15} />

              25 August 2026

            </div>


            {/* Notifications */}

            <button
              onClick={() =>
                setNotifications(
                  !notifications
                )
              }
              className="relative w-9 h-9 border border-slate-200 flex items-center justify-center hover:border-[#FF9933]"
            >

              <Bell size={17} />

              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FF9933] rounded-full" />

            </button>


            {/* Profile */}

            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200">

              <div className="w-9 h-9 bg-[#071A2F] text-white flex items-center justify-center text-xs font-semibold border-b-2 border-[#FF9933]">
                AD
              </div>

              <div className="hidden xl:block">

                <p className="text-xs font-semibold">
                  Administrator
                </p>

                <p className="text-[10px] text-slate-400">
                  Court Administration
                </p>

              </div>

            </div>

          </div>

        </header>


        {/* Notifications */}

        {notifications && (

          <div className="fixed right-5 top-[88px] w-[330px] bg-white border border-slate-200 shadow-xl z-40 p-5">

            <div className="flex justify-between mb-5">

              <h3 className="font-semibold">
                Notifications
              </h3>

              <button
                onClick={() =>
                  setNotifications(false)
                }
              >
                <X size={16} />
              </button>

            </div>

            <Notification
              title="Undertrial review"
              text="Cases requiring immediate human review."
            />

            <Notification
              title="Pendency alert"
              text="High-age cases detected in the priority queue."
            />

          </div>

        )}


        <div className="p-5 sm:p-8 max-w-[1600px]">

          {selectedCase ? (

            <CaseDetails
              item={selectedCase}
              onBack={() =>
                setSelectedCase(null)
              }
            />

          ) : activePage === "Overview" ? (

            <Overview
              backendData={backendData}
              cases={cases}
              onNavigate={navigate}
              onOpenCase={openCase}
            />

          ) : activePage === "Case Queue" ? (

            <CaseQueue
              cases={filteredCases}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              priorityFilter={
                priorityFilter
              }
              setPriorityFilter={
                setPriorityFilter
              }
              onOpenCase={openCase}
            />

          ) : activePage === "Analytics" ? (

            <Analytics
              cases={cases}
            />

          ) : activePage === "Alerts" ? (

            <Alerts
              cases={cases}
              onOpenCase={openCase}
            />

          ) : (

            <SettingsPage />

          )}

        </div>

      </main>

    </div>

  );

}


/* =========================================================
   OVERVIEW
========================================================= */

function LegacyOverview({
  backendData,
  cases,
  onNavigate,
  onOpenCase,
}) {

  const total =
    backendData?.total ??
    42581;

  const priority =
    backendData?.priority ??
    8294;

  const undertrial =
    backendData?.undertrial ??
    3721;

  const immediate =
    backendData?.immediate_review ??
    1248;


  return (

    <>

      <div className="mb-9">

        <div className=" lex items-start justify-between gap-6">

          <div>

            <p className="text-[#FF9933] text-xs uppercase tracking-[0.18em] font-semibold">
              Judicial Intelligence
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl text-[#071A2F] mt-2 tracking-tight">
              A clearer view of justice.
            </h1>

            <p className="text-slate-500 max-w-2xl mt-3 leading-relaxed">
              Data-driven case triage designed to help court
              administrators identify prolonged, complex and
              time-sensitive matters.
            </p>

          </div>


          <div className="hidden xl:flex items-center gap-3 border border-slate-200 bg-white px-4 py-3">

            <div className="w-2 h-2 rounded-full bg-[#138808]" />

            <div>

              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Data connection
              </p>

              <p className="text-xs font-medium">
                Live backend
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* KPI SECTION */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border-t border-l border-slate-200">

        <KPI
          label="Total pending"
          value={total}
          note="Cases currently pending"
          accent="navy"
        />

        <KPI
          label="Priority cases"
          value={priority}
          note="Requiring closer review"
          accent="saffron"
        />

        <KPI
          label="Undertrial matters"
          value={undertrial}
          note="Prolonged detention risk"
          accent="green"
        />

        <KPI
          label="Immediate review"
          value={immediate}
          note="Highest triage category"
          accent="red"
        />

      </div>


      {/* MAIN ANALYTICS */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">

        <div className="xl:col-span-2 bg-white border border-slate-200 p-6">

          <div className="flex items-start justify-between mb-7">

            <div>

              <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9933] font-semibold">
                Pendency
              </p>

              <h2 className="font-serif text-2xl mt-1">
                Backlog trajectory
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Historical movement of pending matters.
              </p>

            </div>

            <button
              onClick={() =>
                onNavigate("Analytics")
              }
              className="text-xs font-semibold flex items-center gap-1 hover:text-[#FF9933]"
            >
              Detailed analytics
              <ArrowUpRight size={14} />
            </button>

          </div>


          <div className="h-[260px] flex items-end gap-3 border-b border-slate-100">

            {[42, 48, 46, 56, 61, 58, 67, 72, 78, 74, 82, 88].map(
              (height, index) => (

                <div
                  key={index}
                  className="flex-1 h-full flex items-end group"
                >

                  <div
                    className={`w-full transition-all ${
                      index === 11
                        ? "bg-[#FF9933]"
                        : "bg-[#0B3152]"
                    } group-hover:opacity-70`}
                    style={{
                      height: `${height}%`,
                    }}
                  />

                </div>

              )
            )}

          </div>


          <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-400 mt-3">

            <span>2015</span>
            <span>2016</span>
            <span>2017</span>
            <span>2018</span>
            <span>2019</span>
            <span>2020</span>
            <span>2021</span>
            <span>2022</span>

          </div>

        </div>


        {/* TRIAGE */}

        <div className="bg-[#071A2F] text-white p-6 relative overflow-hidden">

          <div className="absolute right-0 top-0 w-28 h-28 border-l border-b border-white/10" />

          <p className="text-[#FF9933] text-[10px] uppercase tracking-[0.16em] font-semibold">
            Triage intelligence
          </p>

          <h2 className="font-serif text-2xl mt-2">
            Priority distribution
          </h2>

          <p className="text-xs text-slate-400 mt-2">
            Current classification across the active case queue.
          </p>


          <div className="mt-8 space-y-5">

            <Progress
              label="Standard"
              value={51}
            />

            <Progress
              label="Complex"
              value={21}
            />

            <Progress
              label="Fast Track"
              value={18}
            />

            <Progress
              label="Immediate Review"
              value={10}
              danger
            />

          </div>


          <div className="mt-8 pt-5 border-t border-white/10">

            <div className="flex items-center gap-2 text-xs text-slate-400">

              <ShieldCheck
                size={15}
                className="text-[#138808]"
              />

              Human-in-the-loop recommendation

            </div>

          </div>

        </div>

      </div>


      {/* PRIORITY TABLE */}

      <div className="bg-white border border-slate-200 mt-6">

        <div className="p-6 border-b border-slate-200 flex items-center justify-between">

          <div>

            <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9933] font-semibold">
              Attention queue
            </p>

            <h2 className="font-serif text-2xl mt-1">
              Cases requiring review
            </h2>

          </div>

          <button
            onClick={() =>
              onNavigate("Case Queue")
            }
            className="text-xs font-semibold hover:text-[#FF9933]"
          >
            View complete queue →
          </button>

        </div>


        <CaseTable
          cases={cases.slice(0, 5)}
          onOpenCase={onOpenCase}
        />

      </div>


      <Disclaimer />

    </>

  );

}


/* =========================================================
   CASE QUEUE
========================================================= */

function CaseQueue({
  cases,
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
  onOpenCase,
}) {

  return (

    <>

      <PageHeader
        eyebrow="Case Management"
        title="Case Queue"
        description="Review cases ranked by age, complexity and triage priority."
      />


      <div className="bg-white border border-slate-200">

        <div className="p-5 border-b border-slate-200 flex flex-col lg:flex-row gap-3 justify-between">

          <div className="relative max-w-lg w-full">

            <Search
              size={16}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search case, category, state..."
              className="w-full pl-9 pr-4 py-3 bg-[#F7F8F6] border border-slate-200 text-sm outline-none focus:border-[#FF9933]"
            />

          </div>


          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="px-4 py-3 bg-white border border-slate-200 text-sm outline-none"
          >

            <option value="All">
              All priorities
            </option>

            <option value="Immediate Review">
              Immediate Review
            </option>

            <option value="Complex">
              Complex
            </option>

            <option value="Standard">
              Standard
            </option>

            <option value="Fast Track">
              Fast Track
            </option>

          </select>

        </div>


        {cases.length ? (

          <CaseTable
            cases={cases}
            onOpenCase={onOpenCase}
          />

        ) : (

          <div className="p-16 text-center">

            <Search
              size={28}
              className="mx-auto text-slate-300"
            />

            <h3 className="font-semibold mt-4">
              No matching cases
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Try another search or priority.
            </p>

          </div>

        )}

      </div>

    </>

  );

}


/* =========================================================
   CASE DETAILS
========================================================= */

function CaseDetails({
  item,
  onBack,
}) {

  return (

    <>

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 hover:text-[#071A2F] mb-7"
      >
        <ArrowLeft size={15} />
        Return to queue
      </button>


      <div className="flex flex-col lg:flex-row justify-between gap-5 mb-7">

        <div>

          <p className="text-[#FF9933] text-xs uppercase tracking-[0.16em] font-semibold">
            Case intelligence
          </p>

          <h1 className="font-serif text-4xl mt-2">
            {item.id}
          </h1>

          <p className="text-slate-500 mt-2">
            {item.type} · {item.category}
            {item.state
              ? ` · ${item.state}`
              : ""}
          </p>

        </div>


        <span
          className={`self-start px-4 py-2 border text-xs font-semibold ${
            priorityStyles[item.priority] ||
            "bg-slate-100 text-slate-600"
          }`}
        >
          {item.priority}
        </span>

      </div>


      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white border border-slate-200 p-6">

          <div className="flex items-center gap-3 mb-7">

            <div className="w-10 h-10 bg-[#F4F5F3] flex items-center justify-center">
              <Gavel size={19} />
            </div>

            <div>

              <h2 className="font-semibold">
                Case record
              </h2>

              <p className="text-xs text-slate-400">
                Registered case information
              </p>

            </div>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-7 gap-y-7">

            <Info
              label="Case type"
              value={item.type}
            />

            <Info
              label="Category"
              value={item.category}
            />

            <Info
              label="State"
              value={item.state || "—"}
            />

            <Info
              label="District"
              value={item.district || "—"}
            />

            <Info
              label="Filed"
              value={item.filed || "—"}
            />

            <Info
              label="Current stage"
              value={item.stage || "—"}
            />

            <Info
              label="Case age"
              value={`${item.age || 0} days`}
            />

            <Info
              label="Hearings"
              value={item.hearings || 0}
            />

            <Info
              label="Adjournments"
              value={item.adjournments || 0}
            />

          </div>

        </div>


        <div className="bg-[#071A2F] text-white p-6">

          <div className="flex items-center gap-3">

            <BrainCircuit
              className="text-[#FF9933]"
              size={21}
            />

            <div>

              <h2 className="font-semibold">
                Triage assessment
              </h2>

              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                AI-assisted
              </p>

            </div>

          </div>


          <div className="mt-8">

            <p className="text-xs text-slate-400 uppercase tracking-wider">
              Predicted resolution
            </p>

            <p className="font-serif text-4xl mt-1">
              {item.predicted || "—"}
            </p>

            <p className="text-xs text-slate-400">
              days
            </p>

          </div>


          <div className="mt-7">

            <div className="flex justify-between text-xs">

              <span className="text-slate-400">
                Priority score
              </span>

              <strong>
                {item.score || 0}/100
              </strong>

            </div>

            <div className="h-1.5 bg-white/10 mt-2">

              <div
                className="h-full bg-[#FF9933]"
                style={{
                  width: `${item.score || 0}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>


      <div className="bg-white border border-slate-200 mt-6 p-6">

        <div className="flex items-center gap-3 mb-6">

          <ShieldCheck
            className="text-[#138808]"
            size={21}
          />

          <div>

            <h2 className="font-semibold">
              Explainability
            </h2>

            <p className="text-xs text-slate-400">
              Factors influencing the recommendation
            </p>

          </div>

        </div>


        <div className="grid md:grid-cols-2 gap-4">

          <Reason
            title="Case age"
            text={`${item.age || 0} days pending`}
          />

          <Reason
            title="Hearing activity"
            text={`${item.hearings || 0} hearings recorded`}
          />

          <Reason
            title="Adjournment history"
            text={`${item.adjournments || 0} adjournments`}
          />

          {item.undertrial && (

            <Reason
              title="Undertrial status"
              text="Requires additional human review"
            />

          )}

        </div>

      </div>


      <Disclaimer />

    </>

  );

}


/* =========================================================
   ANALYTICS
========================================================= */

function Analytics({
  cases,
}) {

  const states = {};

  cases.forEach((item) => {

    const state =
      item.state || "Unknown";

    states[state] =
      (states[state] || 0) + 1;

  });


  return (

    <>

      <PageHeader
        eyebrow="Judicial Intelligence"
        title="Analytics"
        description="Understand pendency, case composition and triage patterns."
      />


      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-slate-200">

        <KPI
          label="Cases in current view"
          value={cases.length}
          note="Loaded from backend"
          accent="navy"
        />

        <KPI
          label="Undertrial cases"
          value={
            cases.filter(
              (c) => c.undertrial
            ).length
          }
          note="Requires additional review"
          accent="green"
        />

        <KPI
          label="High priority"
          value={
            cases.filter(
              (c) =>
                c.priority ===
                "Immediate Review"
            ).length
          }
          note="Highest triage category"
          accent="red"
        />

      </div>


      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-7">

        <div className="bg-white border border-slate-200 p-6">

          <p className="text-[10px] uppercase tracking-wider text-[#FF9933] font-semibold">
            Geography
          </p>

          <h2 className="font-serif text-2xl mt-1">
            Cases by state
          </h2>

          <div className="mt-7 space-y-5">

            {Object.entries(states).map(
              ([state, count]) => (

                <div key={state}>

                  <div className="flex justify-between text-sm mb-2">

                    <span>
                      {state}
                    </span>

                    <strong>
                      {count}
                    </strong>

                  </div>

                  <div className="h-2 bg-slate-100">

                    <div
                      className="h-full bg-[#0B3152]"
                      style={{
                        width: `${Math.min(
                          count * 15,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>

              )
            )}

          </div>

        </div>


        <div className="bg-[#071A2F] text-white p-6">

          <p className="text-[10px] uppercase tracking-wider text-[#FF9933] font-semibold">
            Triage
          </p>

          <h2 className="font-serif text-2xl mt-1">
            Current classification
          </h2>

          <div className="mt-7 space-y-5">

            <Progress
              label="Standard"
              value={51}
            />

            <Progress
              label="Complex"
              value={21}
            />

            <Progress
              label="Fast Track"
              value={18}
            />

            <Progress
              label="Immediate Review"
              value={10}
              danger
            />

          </div>

        </div>

      </div>

    </>

  );

}


/* =========================================================
   ALERTS
========================================================= */

function Alerts({
  cases,
  onOpenCase,
}) {

  const alerts = cases.filter(
    (item) =>
      item.priority ===
        "Immediate Review" ||
      item.undertrial
  );


  return (

    <>

      <PageHeader
        eyebrow="Attention Required"
        title="Alerts"
        description="Cases and patterns that may require immediate human review."
      />


      <div className="space-y-3">

        {alerts.length ? (

          alerts.map((item) => (

            <button
              key={item.id}
              onClick={() =>
                onOpenCase(item)
              }
              className="w-full text-left bg-white border border-slate-200 p-5 hover:border-[#FF9933] transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 bg-red-50 text-red-600 flex items-center justify-center">
                  <AlertTriangle
                    size={18}
                  />
                </div>

                <div className="flex-1">

                  <div className="flex gap-3 items-center">

                    <h3 className="font-semibold">
                      {item.id}
                    </h3>

                    <span
                      className={`px-2 py-1 border text-[10px] ${
                        priorityStyles[
                          item.priority
                        ]
                      }`}
                    >
                      {item.priority}
                    </span>

                  </div>

                  <p className="text-xs text-slate-500 mt-1">
                    {item.age} days pending
                    {item.undertrial
                      ? " · Undertrial"
                      : ""}
                  </p>

                </div>

                <ArrowUpRight
                  size={17}
                  className="text-slate-400"
                />

              </div>

            </button>

          ))

        ) : (

          <div className="bg-white border border-slate-200 p-12 text-center">

            <CheckCircle2
              size={30}
              className="mx-auto text-[#138808]"
            />

            <p className="font-semibold mt-4">
              No active alerts
            </p>

          </div>

        )}

      </div>

    </>

  );

}


/* =========================================================
   SETTINGS
========================================================= */

function SettingsPage() {

  return (

    <>

      <PageHeader
        eyebrow="System"
        title="Settings"
        description="Platform configuration and governance controls."
      />


      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <SettingCard
          icon={ShieldCheck}
          title="AI governance"
          text="Human oversight, explainability and recommendation controls."
        />

        <SettingCard
          icon={Users}
          title="Access control"
          text="Court administration roles and permissions."
        />

        <SettingCard
          icon={Activity}
          title="Model status"
          text="Prediction model version and operational health."
        />

        <SettingCard
          icon={MapPinned}
          title="Jurisdiction"
          text="State, district and court hierarchy configuration."
        />

      </div>

    </>

  );

}


/* =========================================================
   COMPONENTS
========================================================= */

function NavItem({
  icon: Icon,
  label,
  active,
  badge,
  onClick,
}) {

  return (

    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 mb-1 text-sm transition ${
        active
          ? "bg-white text-[#071A2F]"
          : "text-slate-400 hover:text-white hover:bg-white/5"
      }`}
    >

      <Icon size={17} />

      <span className="flex-1 text-left">
        {label}
      </span>

      {badge && (

        <span className="text-[9px] px-1.5 py-0.5 bg-[#FF9933] text-white">
          {badge}
        </span>

      )}

    </button>

  );

}


function KPI({
  label,
  value,
  note,
  accent,
}) {

  const accentStyles = {

    navy:
      "border-t-[#071A2F]",

    saffron:
      "border-t-[#FF9933]",

    green:
      "border-t-[#138808]",

    red:
      "border-t-red-600",

  };


  return (

    <div
      className={`bg-white border-r border-b border-slate-200 border-t-[3px] p-6 ${accentStyles[accent]}`}
    >

      <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
        {label}
      </p>

      <p className="font-serif text-3xl sm:text-4xl mt-3 text-[#071A2F]">
        {Number(value).toLocaleString()}
      </p>

      <p className="text-xs text-slate-400 mt-2">
        {note}
      </p>

    </div>

  );

}


function Progress({
  label,
  value,
  danger,
}) {

  return (

    <div>

      <div className="flex justify-between text-xs mb-2">

        <span className="text-slate-300">
          {label}
        </span>

        <span>
          {value}%
        </span>

      </div>

      <div className="h-1.5 bg-white/10">

        <div
          className={`h-full ${
            danger
              ? "bg-[#FF9933]"
              : "bg-white"
          }`}
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>

  );

}


function CaseTable({
  cases,
  onOpenCase,
}) {

  return (

    <div className="overflow-x-auto">

      <table className="w-full text-sm">

        <thead>

          <tr className="bg-[#F7F8F6] text-[10px] uppercase tracking-wider text-slate-400">

            <th className="text-left px-6 py-4">
              Case
            </th>

            <th className="text-left px-4 py-4">
              Jurisdiction
            </th>

            <th className="text-left px-4 py-4">
              Age
            </th>

            <th className="text-left px-4 py-4">
              Hearings
            </th>

            <th className="text-left px-4 py-4">
              Prediction
            </th>

            <th className="text-left px-4 py-4">
              Triage
            </th>

          </tr>

        </thead>


        <tbody className="divide-y divide-slate-100">

          {cases.map((item) => (

            <tr
              key={item.id}
              onClick={() =>
                onOpenCase(item)
              }
              className="hover:bg-[#FF9933]/[0.04] cursor-pointer transition"
            >

              <td className="px-6 py-5">

                <p className="font-semibold">
                  {item.id}
                </p>

                <p className="text-[11px] text-slate-400 mt-1">
                  {item.type} · {item.category}
                </p>

              </td>


              <td className="px-4 py-5">

                <p>
                  {item.state ||
                    "—"}
                </p>

                <p className="text-[11px] text-slate-400 mt-1">
                  {item.district ||
                    "—"}
                </p>

              </td>


              <td className="px-4 py-5">
                {item.age || 0} days
              </td>


              <td className="px-4 py-5">
                {item.hearings || 0}
              </td>


              <td className="px-4 py-5">

                {item.predicted
                  ? `${item.predicted} days`
                  : "Pending"}

              </td>


              <td className="px-4 py-5">

                <span
                  className={`inline-flex px-2.5 py-1 border text-[10px] font-semibold ${
                    priorityStyles[
                      item.priority
                    ] ||
                    "bg-slate-50 text-slate-500 border-slate-200"
                  }`}
                >
                  {item.priority ||
                    "Pending analysis"}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}


function PageHeader({
  eyebrow,
  title,
  description,
}) {

  return (

    <div className="mb-8">

      <p className="text-[10px] uppercase tracking-[0.18em] text-[#FF9933] font-semibold">
        {eyebrow}
      </p>

      <h1 className="font-serif text-4xl mt-2 text-[#071A2F]">
        {title}
      </h1>

      <p className="text-sm text-slate-500 mt-2 max-w-2xl">
        {description}
      </p>

    </div>

  );

}


function Info({
  label,
  value,
}) {

  return (

    <div>

      <p className="text-[10px] uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="text-sm font-medium mt-1">
        {value}
      </p>

    </div>

  );

}


function Reason({
  title,
  text,
}) {

  return (

    <div className="border border-slate-200 p-4 flex gap-3">

      <CheckCircle2
        size={17}
        className="text-[#138808] mt-0.5"
      />

      <div>

        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="text-xs text-slate-500 mt-1">
          {text}
        </p>

      </div>

    </div>

  );

}


function Notification({
  title,
  text,
}) {

  return (

    <div className="border-b border-slate-100 pb-4 mb-4">

      <p className="text-sm font-semibold">
        {title}
      </p>

      <p className="text-xs text-slate-500 mt-1">
        {text}
      </p>

    </div>

  );

}


function SettingCard({
  icon: Icon,
  title,
  text,
}) {

  return (

    <div className="bg-white border border-slate-200 p-6 hover:border-[#FF9933] transition">

      <div className="w-10 h-10 bg-[#F5F6F4] flex items-center justify-center">

        <Icon size={19} />

      </div>

      <h3 className="font-semibold mt-5">
        {title}
      </h3>

      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
        {text}
      </p>

      <button className="text-xs font-semibold text-[#FF9933] mt-5">
        Configure →
      </button>

    </div>

  );

}


function Disclaimer() {

  return (

    <div className="mt-6 border-l-[3px] border-[#FF9933] bg-[#FFF9F2] p-4">

      <div className="flex gap-3">

        <ShieldCheck
          size={17}
          className="text-[#FF9933] mt-0.5"
        />

        <p className="text-xs text-slate-600 leading-relaxed">

          <strong>
            Decision-support system.
          </strong>{" "}

          JudicialTriage recommendations are advisory and
          intended to support authorized court personnel.
          Final judicial decisions remain with the appropriate
          human authority.

        </p>

      </div>

    </div>

  );

}


function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("jt_user"));
    } catch {
      return null;
    }
  });

  const login = (u) => {
    try { sessionStorage.setItem("jt_user", JSON.stringify(u)); } catch { /* ignore */ }
    setUser(u);
  };

  const logout = () => {
    try { sessionStorage.removeItem("jt_user"); } catch { /* ignore */ }
    setUser(null);
  };

  return user ? <AppShell user={user} onLogout={logout} /> : <Login onLogin={login} />;
}

export default App;
