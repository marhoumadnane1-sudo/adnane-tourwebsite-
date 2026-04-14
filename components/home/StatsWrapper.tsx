import dynamic from "next/dynamic";

const Stats = dynamic(
  () => import("./Stats").then((m) => ({ default: m.Stats })),
  { ssr: false, loading: () => <div className="bg-charcoal py-12 sm:py-16" /> }
);

export function StatsWrapper() {
  return <Stats />;
}
