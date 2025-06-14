import { Analytics } from "@/components/analytics";

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Insights into your productivity patterns
        </p>
      </div>
      <Analytics />
    </div>
  );
}
