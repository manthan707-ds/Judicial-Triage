import {
  Scale,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertTriangle,
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

/* Demo credentials – replace handleSubmit with a call to your FastAPI auth endpoint */
export const DEMO_USER = {
  email: "judge@example.com",
  password: "Judge@123",
};

const ROLES = ["Judge", "Registrar", "Analyst"];

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your official email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (
        email.trim().toLowerCase() === DEMO_USER.email &&
        password === DEMO_USER.password
      ) {
        onLogin({ email: email.trim(), role, remember });
      } else {
        setError("Invalid credentials. Use the demo account below.");
        setLoading(false);
      }
    }, 700);
  };

  const useDemo = () => {
    setEmail(DEMO_USER.email);
    setPassword(DEMO_USER.password);
    setError("");
  };

  const field = "mt-1.5 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 focus-within:border-[#0B1F33] focus-within:ring-4 focus-within:ring-[#FF9933]/20";

  const features = [
    [BrainCircuit, "AI priority scoring", "Every case ranked by urgency, pendency and vulnerability."],
    [TrendingUp, "Disposal-time forecasts", "Predict how long a case will take before it is listed."],
    [ShieldCheck, "Explainable, human-reviewed", "See why each score was given. People make the final call."],
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.1fr_1fr] bg-white text-[#0B1F33]">
      {/* Featured panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#0B1F33] text-white p-14">
        <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-[#FF9933]/25 blur-[110px]" />
        <div className="absolute -bottom-40 -right-24 w-[460px] h-[460px] rounded-full bg-[#138808]/30 blur-[120px]" />

        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
            <Scale size={20} />
          </div>
          <span className="font-semibold tracking-tight text-lg">JudicialTriage</span>
        </div>

        <div className="relative max-w-lg">
          <span className="inline-block text-[11px] uppercase tracking-[0.18em] px-3 py-1 rounded-full border border-white/20 text-slate-200">
            Case prioritisation platform
          </span>
          <h2 className="mt-6 text-5xl leading-[1.08]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Put the most urgent cases <span className="text-[#FF9933]">first.</span>
          </h2>
          <p className="mt-5 text-slate-300 leading-relaxed">
            A decision-support tool that helps legal teams cut through a large backlog
            with clear, explainable recommendations.
          </p>

          <div className="mt-10 space-y-4">
            {features.map(([Icon, title, text]) => (
              <div key={title} className="flex gap-4 rounded-xl bg-white/[0.05] border border-white/10 p-4 backdrop-blur">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon size={18} className="text-[#FF9933]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-sm text-slate-400 mt-0.5">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-500 max-w-md leading-relaxed">
          Independent software project. Not affiliated with, endorsed by, or
          operated by any government body or court.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Scale size={22} />
            <span className="font-semibold">JudicialTriage</span>
          </div>

          <h2 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome back
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 mb-8">Sign in to your workspace.</p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="text-xs font-semibold text-slate-600">Work email</label>
              <div className={field}>
                <Mail size={16} className="text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@yourorg.com"
                  autoComplete="username"
                  className="flex-1 py-3 text-sm bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label className="text-xs font-semibold text-slate-600">Password</label>
                <button type="button" className="text-xs text-slate-500 hover:text-[#0B1F33]">Forgot password?</button>
              </div>
              <div className={field}>
                <Lock size={16} className="text-slate-400" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="flex-1 py-3 text-sm bg-transparent outline-none"
                />
                <button type="button" onClick={() => setShow(!show)} className="text-slate-400 hover:text-slate-700" aria-label="Toggle password visibility">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600">Role</label>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {ROLES.map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`py-2.5 text-xs rounded-lg border transition ${
                      role === r
                        ? "bg-[#0B1F33] text-white border-[#0B1F33]"
                        : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-[#138808]" />
              Keep me signed in on this device
            </label>

            {error && (
              <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#0B1F33] text-white py-3.5 text-sm font-semibold hover:bg-[#12304d] disabled:opacity-70 transition"
            >
              {loading ? "Verifying…" : (<>Sign in <ArrowRight size={16} /></>)}
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-slate-700">Try the demo</p>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              {DEMO_USER.email}<br />{DEMO_USER.password}
            </p>
            <button type="button" onClick={useDemo} className="mt-2 text-xs font-semibold text-[#0B1F33] underline">
              Fill demo credentials
            </button>
          </div>

          <div className="flex h-[3px] mt-8 w-16 rounded-full overflow-hidden">
            <div className="flex-1 bg-[#FF9933]" /><div className="flex-1 bg-slate-200" /><div className="flex-1 bg-[#138808]" />
          </div>
        </div>
      </div>
    </div>
  );
}
