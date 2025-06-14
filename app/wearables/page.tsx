import { WearablesIntegration } from "@/components/wearables-integration";
import { PageHeader } from "@/components/molecules/page-header";

export default function WearablesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Wearables Integration"
          description="Connect and sync your fitness devices"
        />
      </div>
      <WearablesIntegration />
    </div>
  );
}
