import { Analytics } from "@/components/analytics";
import { PageHeader } from "@/components/molecules/page-header";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Analytics Dashboard"
        description="Insights into your productivity patterns"
      />
      <Analytics />
    </div>
  );
}
