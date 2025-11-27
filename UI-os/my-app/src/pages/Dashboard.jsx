import {
  FaUtensils,
  FaWallet,
  FaMoon,
  FaRunning,
  FaCog,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "../components/ui/SpotlightCard";
import useDashboardSummary from "../hooks/useDashboardSummary";

const navCards = [
  {
    id: "food",
    label: "Food",
    icon: FaUtensils,
    to: "/food",
    cols: "col-span-6 md:col-span-5 md:row-span-2",
    bgImage: "food.png",
  },
  {
    id: "expense",
    label: "Expenses",
    icon: FaWallet,
    to: "/expense",
    cols: "col-span-6 md:col-span-3",
    bgImage: "expense.png",
  },
  {
    id: "sleep",
    label: "Sleep",
    icon: FaMoon,
    to: "/sleep",
    cols: "col-span-6 md:col-span-4",
    bgImage: "sleep.png",
  },
  {
    id: "activity",
    label: "Activity",
    icon: FaRunning,
    to: "/activity",
    cols: "col-span-6 md:col-span-6 md:row-span-2",
    bgImage: "/Activity.png",
  },
  {
    id: "prefs",
    label: "Preferences",
    icon: FaCog,
    to: "/preferences",
    cols: "col-span-6 md:col-span-3",
    bgImage: "preferences.png",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FaChartLine,
    to: "/reports",
    cols: "col-span-6 md:col-span-6",
    bgImage: "reports.png",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, loading, error } = useDashboardSummary();

  // if API still loading → show skeleton cards
  const summaryItems = [
    {
      id: 1,
      label: "Calorie / day",
      value: data?.calories ? `${data.calories} kcal` : "--",
    },
    {
      id: 2,
      label: "Expenses (this mo.)",
      value: data?.expenses ? `₹${data.expenses}` : "--",
    },
    {
      id: 3,
      label: "Sleep (avg)",
      value: data?.sleepHours ? `${data.sleepHours} hr` : "--",
    },
    {
      id: 4,
      label: "Active min",
      value: data?.activityMinutes ? `${data.activityMinutes} min` : "--",
    },
  ];

  return (
    <div className="space-y-10">

      {/* SUMMARY STRIP */}
      <section className="flex gap-5 overflow-x-auto pb-1">
        {summaryItems.map((s) => (
          <div key={s.id} className="min-w-[220px]">
            <SpotlightCard className="h-28">

              {!loading ? (
                <div className="flex items-center justify-between h-full">
                  <div>
                    <p className="text-sm text-slate-400">{s.label}</p>
                    <h3 className="text-2xl font-semibold">{s.value}</h3>
                  </div>
                  <div className="text-3xl opacity-60">⚡</div>
                </div>
              ) : (
                <div className="animate-pulse flex flex-col gap-2">
                  <div className="h-3 bg-white/10 w-24 rounded"></div>
                  <div className="h-5 bg-white/10 w-32 rounded"></div>
                </div>
              )}

            </SpotlightCard>
          </div>
        ))}
      </section>

      {/* ERROR STATE */}
      {error && (
        <p className="text-red-400 text-sm">
          Failed to load dashboard summary. Try again later.
        </p>
      )}

      {/* BENTO GRID */}
      <section>
        <div className="grid grid-cols-6 md:grid-cols-12 auto-rows-[200px] gap-6">
          {navCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.id} className={card.cols}>
                <SpotlightCard
                  onClick={() => navigate(card.to)}
                  bgImage={card.bgImage}
                  bgOpacity={0.25}
                  className="h-full rounded-xl"
                >
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <p className="text-xs text-slate-300">{card.label}</p>
                      <h2 className="text-white text-2xl font-semibold mt-1">
                        {card.label}
                      </h2>
                      <p className="text-slate-400 text-xs mt-2">
                        View details & analytics
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <div className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10">
                        <Icon className="w-7 h-7 text-white/80" />
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
