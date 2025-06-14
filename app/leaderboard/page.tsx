import { Leaderboard } from "@/components/leaderboard";
import { PageHeader } from "@/components/molecules/page-header";

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Leaderboard"
        description="See how you rank against other users"
      />
      <Leaderboard />
    </div>
  );
}
