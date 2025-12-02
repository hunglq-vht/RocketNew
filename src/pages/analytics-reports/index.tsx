import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import EmergencyAlertBanner from '../../components/EmergencyAlertBanner';
import SystemStatusIndicator from '../../components/SystemStatusIndicator';
import QuickActionToolbar from '../../components/QuickActionToolbar';
import KPICard from './components/KPICard';
import TrafficDensityChart from './components/TrafficDensityChart';
import PerformanceMetricsChart from './components/PerformanceMetricsChart';
import RouteOptimizationPanel from './components/RouteOptimizationPanel';
import ReportTemplateGrid from './components/ReportTemplateGrid';
import FilterPanel from './components/FilterPanel';
import ExportPanel from './components/ExportPanel';
import PredictiveAnalyticsChart from './components/PredictiveAnalyticsChart';
import TrafficHeatMap from './components/TrafficHeatMap';
import {
  KPIMetric,
  TrafficPattern,
  ChartDataPoint,
  RouteOptimization,
  ReportTemplate,
  FilterOptions,
  ExportFormat,
  PredictiveAnalytics,
  HeatMapData
} from './types';

const AnalyticsReports = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    operators: ['all'],
    vehicleTypes: ['all'],
    airspaceZones: ['all'],
    timeRange: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date()
    }
  });

  const kpiMetrics: KPIMetric[] = [
    {
      id: 'completion-rate',
      label: 'Flight Completion Rate',
      value: 98.5,
      unit: '%',
      trend: 2.3,
      trendDirection: 'up',
      icon: 'CheckCircle2',
      description: 'Successful flight completions vs total flights'
    },
    {
      id: 'avg-flight-time',
      label: 'Average Flight Time',
      value: 42,
      unit: 'min',
      trend: -5.2,
      trendDirection: 'down',
      icon: 'Clock',
      description: 'Mean duration of completed flights'
    },
    {
      id: 'incident-frequency',
      label: 'Incident Frequency',
      value: 0.8,
      unit: 'per 1000',
      trend: -12.5,
      trendDirection: 'down',
      icon: 'AlertTriangle',
      description: 'Safety incidents per thousand flights'
    },
    {
      id: 'compliance-score',
      label: 'Compliance Score',
      value: 99.2,
      unit: '%',
      trend: 1.8,
      trendDirection: 'up',
      icon: 'Shield',
      description: 'Regulatory compliance adherence rate'
    }
  ];

  const trafficPatterns: TrafficPattern[] = [
    { hour: 0, density: 15, flights: 12 },
    { hour: 1, density: 10, flights: 8 },
    { hour: 2, density: 8, flights: 6 },
    { hour: 3, density: 12, flights: 10 },
    { hour: 4, density: 18, flights: 15 },
    { hour: 5, density: 25, flights: 22 },
    { hour: 6, density: 45, flights: 38 },
    { hour: 7, density: 65, flights: 55 },
    { hour: 8, density: 85, flights: 72 },
    { hour: 9, density: 92, flights: 78 },
    { hour: 10, density: 88, flights: 75 },
    { hour: 11, density: 82, flights: 70 },
    { hour: 12, density: 78, flights: 66 },
    { hour: 13, density: 75, flights: 64 },
    { hour: 14, density: 80, flights: 68 },
    { hour: 15, density: 85, flights: 72 },
    { hour: 16, density: 90, flights: 76 },
    { hour: 17, density: 95, flights: 80 },
    { hour: 18, density: 88, flights: 75 },
    { hour: 19, density: 70, flights: 60 },
    { hour: 20, density: 55, flights: 47 },
    { hour: 21, density: 40, flights: 34 },
    { hour: 22, density: 28, flights: 24 },
    { hour: 23, density: 20, flights: 17 }
  ];

  const performanceData: ChartDataPoint[] = [
    { date: '2024-01-01', value: 96.2 },
    { date: '2024-01-08', value: 96.8 },
    { date: '2024-01-15', value: 97.1 },
    { date: '2024-01-22', value: 97.5 },
    { date: '2024-01-29', value: 97.8 },
    { date: '2024-02-05', value: 98.0 },
    { date: '2024-02-12', value: 98.2 },
    { date: '2024-02-19', value: 98.5 }
  ];

  const routeOptimizations: RouteOptimization[] = [
    {
      id: 'route-1',
      routeName: 'Downtown Corridor',
      currentEfficiency: 78,
      optimizedEfficiency: 92,
      potentialSavings: '14 min avg',
      recommendation: 'Implement direct routing through Zone B during off-peak hours to reduce congestion and flight time'
    },
    {
      id: 'route-2',
      routeName: 'Industrial Zone Path',
      currentEfficiency: 82,
      optimizedEfficiency: 94,
      potentialSavings: '12 min avg',
      recommendation: 'Utilize higher altitude corridors to avoid ground-level interference and improve throughput'
    },
    {
      id: 'route-3',
      routeName: 'Suburban Network',
      currentEfficiency: 85,
      optimizedEfficiency: 96,
      potentialSavings: '11 min avg',
      recommendation: 'Consolidate multiple waypoints into streamlined paths with fewer direction changes'
    }
  ];

  const reportTemplates: ReportTemplate[] = [
    {
      id: 'operational-summary',
      name: 'Operational Summary',
      description: 'Comprehensive overview of daily flight operations, traffic patterns, and system performance',
      icon: 'FileText',
      category: 'operational',
      lastGenerated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'safety-assessment',
      name: 'Safety Assessment',
      description: 'Detailed analysis of incidents, near-misses, and safety compliance metrics',
      icon: 'ShieldAlert',
      category: 'safety',
      lastGenerated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'efficiency-analysis',
      name: 'Efficiency Analysis',
      description: 'Route optimization recommendations, fuel consumption, and time savings opportunities',
      icon: 'TrendingUp',
      category: 'efficiency',
      lastGenerated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'compliance-report',
      name: 'Compliance Report',
      description: 'Regulatory adherence tracking, certification status, and audit trail documentation',
      icon: 'FileCheck',
      category: 'compliance',
      lastGenerated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    }
  ];

  const exportFormats: ExportFormat[] = [
    {
      id: 'pdf',
      name: 'PDF Report',
      extension: 'pdf',
      icon: 'FileText',
      description: 'Formatted document with charts and tables'
    },
    {
      id: 'csv',
      name: 'CSV Data',
      extension: 'csv',
      icon: 'Table',
      description: 'Raw data for spreadsheet analysis'
    },
    {
      id: 'excel',
      name: 'Excel Workbook',
      extension: 'xlsx',
      icon: 'FileSpreadsheet',
      description: 'Multi-sheet workbook with formulas'
    },
    {
      id: 'json',
      name: 'JSON Data',
      extension: 'json',
      icon: 'Code',
      description: 'Structured data for API integration'
    }
  ];

  const predictiveData: PredictiveAnalytics[] = [
    { date: '2024-02-26', predictedFlights: 850, confidence: 92, capacityUtilization: 78 },
    { date: '2024-02-27', predictedFlights: 920, confidence: 90, capacityUtilization: 84 },
    { date: '2024-02-28', predictedFlights: 880, confidence: 91, capacityUtilization: 81 },
    { date: '2024-02-29', predictedFlights: 950, confidence: 89, capacityUtilization: 87 },
    { date: '2024-03-01', predictedFlights: 1020, confidence: 88, capacityUtilization: 93 },
    { date: '2024-03-02', predictedFlights: 980, confidence: 90, capacityUtilization: 90 },
    { date: '2024-03-03', predictedFlights: 900, confidence: 91, capacityUtilization: 82 }
  ];

  const heatMapData: HeatMapData[] = [
    { zone: 'Zone A - Commercial', lat: 40.7128, lng: -74.0060, intensity: 85, flightCount: 245 },
    { zone: 'Zone B - Industrial', lat: 40.7580, lng: -73.9855, intensity: 72, flightCount: 198 },
    { zone: 'Zone C - Restricted', lat: 40.6782, lng: -73.9442, intensity: 45, flightCount: 87 },
    { zone: 'Zone D - Residential', lat: 40.7489, lng: -73.9680, intensity: 58, flightCount: 142 }
  ];

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
  };

  const handleResetFilters = () => {
    setFilters({
      operators: ['all'],
      vehicleTypes: ['all'],
      airspaceZones: ['all'],
      timeRange: {
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        endDate: new Date()
      }
    });
  };

  const handleGenerateReport = (templateId: string) => {
    console.log('Generating report:', templateId);
  };

  const handleExport = (formatId: string) => {
    console.log('Exporting data as:', formatId);
  };

  const handleQuickAction = (actionId: string) => {
    console.log('Quick action:', actionId);
  };

  const handleMenuToggle = () => {
    console.log('Menu toggled');
  };

  const handleDismissAlert = () => {
    console.log('Alert dismissed');
  };

  return (
    <>
      <Helmet>
        <title>Analytics Reports - SkyGuard Traffic System</title>
        <meta name="description" content="Comprehensive flight data analysis and performance insights for traffic optimization and operational planning" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header showMobileMenu onMenuToggle={handleMenuToggle} />
        <EmergencyAlertBanner onDismiss={handleDismissAlert} />
        
        <main className="pt-20 pb-8">
          <div className="max-w-screen-2xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
                <p className="text-muted-foreground">Comprehensive flight data analysis and performance insights</p>
              </div>
              <div className="flex items-center gap-4">
                <SystemStatusIndicator />
                <QuickActionToolbar context="analytics" onActionClick={handleQuickAction} />
              </div>
            </div>

            <div className="space-y-6">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiMetrics.map((metric) => (
                  <KPICard key={metric.id} metric={metric} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TrafficDensityChart data={trafficPatterns} />
                <PerformanceMetricsChart data={performanceData} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PredictiveAnalyticsChart data={predictiveData} />
                </div>
                <RouteOptimizationPanel optimizations={routeOptimizations} />
              </div>

              <TrafficHeatMap data={heatMapData} />

              <ReportTemplateGrid
                templates={reportTemplates}
                onGenerateReport={handleGenerateReport}
              />

              <ExportPanel formats={exportFormats} onExport={handleExport} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AnalyticsReports;