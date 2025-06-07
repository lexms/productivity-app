import { WearablesIntegration } from "@/components/wearables-integration"

export default function WearablesPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Wearables Integration</h1>
        <p className="text-gray-600">Connect and sync your fitness devices</p>
      </div>
      <WearablesIntegration />
    </div>
  )
}
