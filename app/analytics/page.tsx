import { Analytics } from "@/components/analytics";
import { PageHeader } from "@/components/molecules/page-header";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Analytics Dashboard"
          description="Insights into your productivity patterns"
        />
      </div>
      <Analytics />
    </div>
  );
}
