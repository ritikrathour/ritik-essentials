import { ArrowDown, ArrowUp } from "lucide-react";

interface PerformanceMetric {
  label: string;
  value: string;
  change: number;
  isPositive: boolean;
}
const MetricCard: React.FC<
  PerformanceMetric & { icon: React.ReactNode; color: string }
> = ({ label, value, change, isPositive, icon, color }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}
      >
        {isPositive ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )}
        {Math.abs(change)}%
      </div>
    </div>{" "}
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
  </div>
);
export default MetricCard;
