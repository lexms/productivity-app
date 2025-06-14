import { WearablesIntegration } from "@/components/wearables-integration";
import { PageHeader } from "@/components/molecules/page-header";

export default function WearablesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Wearables Integration"
        description="Connect and sync your fitness devices"
      />
      <WearablesIntegration />
    </div>
  );
}
