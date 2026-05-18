import {
  Archive,
  BarChart3,
  BookOpen,
  Boxes,
  Brain,
  Clapperboard,
  Compass,
  Flag,
  Languages,
  LayoutDashboard,
  Map,
  Menu,
  Route,
  Settings as SettingsIcon,
  Signpost,
  Swords,
  Trophy,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Question } from "./types";
import { questions } from "./data/questions";
import { getQuestionsByFilters } from "./utils/questionGenerator";
import { useProfiles } from "./hooks/useProfiles";
import { useProgress } from "./hooks/useProgress";
import AssetManager from "./components/AssetManager";
import CountryDuel from "./components/CountryDuel";
import CountryProfile from "./components/CountryProfile";
import CustomTestBuilder from "./components/CustomTestBuilder";
import Dashboard from "./components/Dashboard";
import DisciplineExplorer from "./components/DisciplineExplorer";
import HongKongSpawns from "./components/HongKongSpawns";
import MapFinder from "./components/MapFinder";
import ProfileSelect from "./components/ProfileSelect";
import ProgressStats from "./components/ProgressStats";
import QuizEngine from "./components/QuizEngine";
import ReviewMistakes from "./components/ReviewMistakes";
import Settings from "./components/Settings";

type RouteId =
  | "dashboard"
  | "hong-kong-spawns"
  | "disciplines"
  | "world-map"
  | "road-signs"
  | "language-lab"
  | "country-duels"
  | "custom-tests"
  | "review"
  | "assets"
  | "stats"
  | "settings"
  | "countries";

const navItems: Array<{ id: RouteId; label: string; icon: typeof Compass }> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "hong-kong-spawns", label: "Hong Kong Spawns", icon: Clapperboard },
  { id: "disciplines", label: "Disciplines", icon: Compass },
  { id: "world-map", label: "World Map Trainer", icon: Map },
  { id: "road-signs", label: "Road & Sign Finder", icon: Signpost },
  { id: "language-lab", label: "Language Lab", icon: Languages },
  { id: "country-duels", label: "Country Duels", icon: Swords },
  { id: "custom-tests", label: "Custom Tests", icon: Boxes },
  { id: "review", label: "Review Mistakes", icon: Brain },
  { id: "assets", label: "Asset Manager", icon: Archive },
  { id: "stats", label: "Progress / Stats", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const getHashRoute = (): RouteId => {
  const route = window.location.hash.replace(/^#\/?/, "") as RouteId;
  return route || "dashboard";
};

type TrainingPanelProps = {
  title: string;
  eyebrow: string;
  body: string;
  actions: Array<{ label: string; questions: Question[] }>;
  onStartQuiz: (title: string, selectedQuestions: Question[]) => void;
};

const TrainingPanel = ({ title, eyebrow, body, actions, onStartQuiz }: TrainingPanelProps) => (
  <div className="space-y-5">
    <section className="map-texture glass rounded-lg p-6 sm:p-8">
      <div className="relative z-10 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.22em] text-signal">{eyebrow}</div>
        <h1 className="mt-2 font-display text-5xl font-black">{title}</h1>
        <p className="mt-3 text-slate-300">{body}</p>
      </div>
    </section>
    <section className="grid gap-4 lg:grid-cols-3">
      {actions.map((action) => (
        <button
          type="button"
          key={action.label}
          onClick={() => onStartQuiz(action.label, action.questions)}
          className="glass hover-lift rounded-lg p-5 text-left"
        >
          <div className="mb-4 inline-flex rounded-lg bg-signal/15 p-3 text-signal">
            <Trophy size={22} />
          </div>
          <h2 className="font-display text-2xl font-bold">{action.label}</h2>
          <p className="mt-2 text-sm text-slate-400">{action.questions.length} clues / close-answer feedback / review tracking</p>
        </button>
      ))}
    </section>
  </div>
);

const App = () => {
  const profilesApi = useProfiles();
  const [route, setRoute] = useState<RouteId>(getHashRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfiles, setShowProfiles] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<{ title: string; questions: Question[] } | null>(null);
  const activeProfile = profilesApi.activeProfile;
  const progressApi = useProgress(activeProfile?.id ?? "preview");

  useEffect(() => {
    const handler = () => setRoute(getHashRoute());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (next: string) => {
    window.location.hash = `/${next}`;
    setRoute(next as RouteId);
    setMenuOpen(false);
  };

  const startQuiz = (title: string, selectedQuestions: Question[]) => {
    setActiveQuiz({ title, questions: selectedQuestions });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const customQuestionsPool = useMemo(
    () => [...questions, ...progressApi.progress.customQuestions],
    [progressApi.progress.customQuestions]
  );

  if (!activeProfile || showProfiles) {
    return (
      <ProfileSelect
        profiles={profilesApi.profiles}
        activeProfileId={profilesApi.activeProfileId}
        createProfile={(name, avatar, skillLevel) => {
          const created = profilesApi.createProfile(name, avatar, skillLevel);
          setShowProfiles(false);
          return created;
        }}
        renameProfile={profilesApi.renameProfile}
        updateProfile={profilesApi.updateProfile}
        deleteProfile={profilesApi.deleteProfile}
        setActiveProfileId={(profileId) => {
          profilesApi.setActiveProfileId(profileId);
          if (profileId) setShowProfiles(false);
        }}
        exportProfile={profilesApi.exportProfile}
        importProfile={(raw) => {
          profilesApi.importProfile(raw);
          setShowProfiles(false);
        }}
      />
    );
  }

  const renderRoute = () => {
    if (activeQuiz) {
      return (
        <QuizEngine
          profileId={activeProfile.id}
          quizId={`quiz-${activeQuiz.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          title={activeQuiz.title}
          questions={activeQuiz.questions}
          onClose={() => setActiveQuiz(null)}
        />
      );
    }

    if (route === "dashboard") {
      return <Dashboard profile={activeProfile} progress={progressApi.progress} onStartQuiz={startQuiz} onNavigate={navigate} />;
    }

    if (route === "hong-kong-spawns") return <HongKongSpawns />;

    if (route === "disciplines") {
      return (
        <DisciplineExplorer
          profileId={activeProfile.id}
          progress={progressApi.progress}
          markLessonCompleted={progressApi.markLessonCompleted}
          addLessonToReview={progressApi.addLessonToReview}
          onStartQuiz={startQuiz}
        />
      );
    }

    if (route === "world-map") return <MapFinder progress={progressApi.progress} />;

    if (route === "road-signs") {
      return (
        <TrainingPanel
          title="Road & Sign Finder"
          eyebrow="Road systems and infrastructure"
          body="Fast drills for lane lines, route shields, bollards, kilometer markers, signs, poles, and road-side objects."
          onStartQuiz={startQuiz}
          actions={[
            { label: "Road lines warmup", questions: getQuestionsByFilters({ disciplineId: "roads", count: 10, closeCountryMode: true }, customQuestionsPool) },
            { label: "Signs and bollards test", questions: getQuestionsByFilters({ disciplineId: "signs", count: 15, visualOnly: true, closeCountryMode: true }, customQuestionsPool) },
            { label: "World Road Lines Boss", questions: getQuestionsByFilters({ count: 8, closeCountryMode: true }, customQuestionsPool).filter((question) => question.tags.includes("boss") || question.categoryId.includes("road")) },
          ]}
        />
      );
    }

    if (route === "language-lab") {
      return (
        <TrainingPanel
          title="Language Lab"
          eyebrow="Scripts, domains, and close languages"
          body="Practice alphabet recognition, Slavic traps, Romance language splits, Nordic comparisons, domains, and road-sign text."
          onStartQuiz={startQuiz}
          actions={[
            { label: "15-question Slavic language test", questions: getQuestionsByFilters({ disciplineId: "language", categoryId: "language-slavic-language-comparison", count: 15, closeCountryMode: true }, customQuestionsPool) },
            { label: "Domain endings flashcards", questions: getQuestionsByFilters({ disciplineId: "language", categoryId: "language-domain-endings", count: 10 }, customQuestionsPool) },
            { label: "Latin America Language Boss", questions: getQuestionsByFilters({ disciplineId: "language", count: 20, closeCountryMode: true }, customQuestionsPool) },
          ]}
        />
      );
    }

    if (route === "country-duels") return <CountryDuel masteryByCountry={progressApi.progress.countryMastery} onStartQuiz={startQuiz} />;
    if (route === "custom-tests") return <CustomTestBuilder progress={progressApi.progress} onStartQuiz={startQuiz} />;
    if (route === "review") return <ReviewMistakes progress={progressApi.progress} markMistakeMastered={progressApi.markMistakeMastered} onStartQuiz={startQuiz} />;
    if (route === "assets") return <AssetManager profileId={activeProfile.id} progress={progressApi.progress} importProgress={progressApi.importProgress} addCustomQuestion={progressApi.addCustomQuestion} />;
    if (route === "stats") return <ProgressStats progress={progressApi.progress} />;
    if (route === "countries") return <CountryProfile progress={progressApi.progress} onStartQuiz={startQuiz} />;
    if (route === "settings") {
      return (
        <Settings
          profile={activeProfile}
          progress={progressApi.progress}
          updateSettings={progressApi.updateSettings}
          onSwitchProfile={() => setShowProfiles(true)}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-night text-slate-100">
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        className="fixed left-4 top-4 z-40 rounded bg-panel p-2 text-slate-100 shadow-card lg:hidden"
        aria-label="Open menu"
      >
        <Menu />
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-80 flex-col border-r border-white/10 bg-ink/95 p-4 backdrop-blur-xl transition-transform lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <button type="button" onClick={() => navigate("dashboard")} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded bg-signal text-night">
              <Compass size={24} />
            </div>
            <div>
              <div className="font-display text-2xl font-black">GeoMastery</div>
              <div className="text-xs text-slate-400">standalone trainer</div>
            </div>
          </button>
          <button type="button" onClick={() => setMenuOpen(false)} className="rounded p-2 lg:hidden" aria-label="Close menu">
            <X />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.id === route && !activeQuiz;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setActiveQuiz(null);
                  navigate(item.id);
                }}
                className={`flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-sm ${
                  active ? "bg-signal text-night" : "text-slate-300 hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setActiveQuiz(null);
              navigate("countries");
            }}
            className={`flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-sm ${
              route === "countries" ? "bg-signal text-night" : "text-slate-300 hover:bg-white/10"
            }`}
          >
            <Flag size={18} />
            <span>Country Profiles</span>
          </button>
        </nav>
        <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <button type="button" onClick={() => setShowProfiles(true)} className="flex w-full items-center gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded bg-white/10 font-display font-bold">
              {activeProfile.avatar}
            </span>
            <span>
              <span className="block font-semibold">{activeProfile.name}</span>
              <span className="text-xs text-slate-400">{activeProfile.skillLevel}</span>
            </span>
          </button>
        </div>
      </aside>
      {menuOpen ? <button type="button" className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu overlay" /> : null}
      <main className="min-h-screen p-4 pt-20 lg:ml-80 lg:p-8">
        {activeQuiz ? (
          <button type="button" onClick={() => setActiveQuiz(null)} className="mb-4 inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-sm">
            <BookOpen size={16} /> Back to current section
          </button>
        ) : null}
        {renderRoute()}
      </main>
    </div>
  );
};

export default App;
