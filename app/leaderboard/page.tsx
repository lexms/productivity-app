import { Leaderboard } from "@/components/leaderboard";
import { PageHeader } from "@/components/molecules/page-header";

export default function LeaderboardPage() {
  return (
    <div>
      <div className="mb-6">
        <PageHeader
          title="Leaderboard"
          description="See how you rank against other users"
        />
      </div>
      <Leaderboard />
    </div>
  );
}
