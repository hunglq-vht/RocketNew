export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface FilterOptions {
  operators: string[];
  vehicleTypes: string[];
  airspaceZones: string[];
  timeRange: DateRange;
}

export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: number;
  trendDirection: 'up' | 'down' | 'stable';
  icon: string;
  description: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  category?: string;
}

export interface TrafficPattern {
  hour: number;
  density: number;
  flights: number;
}

export interface RouteOptimization {
  id: string;
  routeName: string;
  currentEfficiency: number;
  optimizedEfficiency: number;
  potentialSavings: string;
  recommendation: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'operational' | 'safety' | 'efficiency' | 'compliance';
  lastGenerated?: Date;
}

export interface ExportFormat {
  id: string;
  name: string;
  extension: string;
  icon: string;
  description: string;
}

export interface ScheduledReport {
  id: string;
  templateId: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  nextDelivery: Date;
  enabled: boolean;
}

export interface PredictiveAnalytics {
  date: string;
  predictedFlights: number;
  confidence: number;
  capacityUtilization: number;
}

export interface HeatMapData {
  zone: string;
  lat: number;
  lng: number;
  intensity: number;
  flightCount: number;
}