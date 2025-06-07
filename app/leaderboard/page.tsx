import { Leaderboard } from "@/components/leaderboard"

export default function LeaderboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
        <p className="text-gray-600">See how you rank against other users</p>
      </div>
      <Leaderboard />
    </div>
  )
}
