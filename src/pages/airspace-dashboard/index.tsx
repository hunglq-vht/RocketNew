import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import EmergencyAlertBanner from '../../components/EmergencyAlertBanner';
import SystemStatusIndicator from '../../components/SystemStatusIndicator';
import QuickActionToolbar from '../../components/QuickActionToolbar';
import TrafficMetricsCard from './components/TrafficMetricsCard';
import AirspaceMap from './components/AirspaceMap';
import CriticalAlertsList from './components/CriticalAlertsList';
import ActiveVehiclesList from './components/ActiveVehiclesList';
import WeatherPanel from './components/WeatherPanel';
import {
  AerialVehicle,
  RestrictedZone,
  WeatherCondition,
  TrafficMetric,
  CriticalAlert,
  MapLayer } from
'./types';

const AirspaceDashboard = () => {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [mapLayers, setMapLayers] = useState<MapLayer[]>([
  { id: 'vehicles', name: 'Vehicles', type: 'vehicles', visible: true, icon: 'Plane' },
  { id: 'zones', name: 'Zones', type: 'zones', visible: true, icon: 'ShieldAlert' },
  { id: 'weather', name: 'Weather', type: 'weather', visible: true, icon: 'Cloud' },
  { id: 'routes', name: 'Routes', type: 'routes', visible: false, icon: 'Route' }]
  );

  const [trafficMetrics] = useState<TrafficMetric[]>([
  {
    label: 'Active Flights',
    value: 47,
    unit: 'vehicles',
    trend: 'up',
    trendValue: 12,
    icon: 'Plane',
    color: 'bg-primary'
  },
  {
    label: 'Traffic Density',
    value: 68,
    unit: '%',
    trend: 'stable',
    trendValue: 0,
    icon: 'Activity',
    color: 'bg-accent'
  },
  {
    label: 'Critical Alerts',
    value: 3,
    unit: 'active',
    trend: 'down',
    trendValue: 25,
    icon: 'AlertTriangle',
    color: 'bg-error'
  },
  {
    label: 'System Status',
    value: 99,
    unit: '%',
    trend: 'up',
    trendValue: 2,
    icon: 'CheckCircle2',
    color: 'bg-success'
  }]
  );

  const [aerialVehicles] = useState<AerialVehicle[]>([
  {
    id: 'UAV-001',
    callSign: 'ALPHA-7',
    type: 'drone',
    status: 'active',
    position: { lat: 28.6139, lng: 77.2090, altitude: 450 },
    heading: 285,
    speed: 45,
    battery: 78,
    operator: 'Delhi Air Services',
    flightPlan: 'FP-2024-001',
    lastUpdate: new Date(Date.now() - 30000),
    image: "https://images.unsplash.com/photo-1697994309887-c6e669268e7e",
    alt: 'White quadcopter drone with camera gimbal flying against clear blue sky'
  },
  {
    id: 'UAV-002',
    callSign: 'BRAVO-3',
    type: 'uav',
    status: 'active',
    position: { lat: 28.6289, lng: 77.2195, altitude: 380 },
    heading: 142,
    speed: 52,
    battery: 65,
    operator: 'National Survey Corp',
    flightPlan: 'FP-2024-002',
    lastUpdate: new Date(Date.now() - 45000),
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13ef24da4-1764210562668.png",
    alt: 'Professional surveillance drone with multiple rotors and advanced sensor array'
  },
  {
    id: 'UAV-003',
    callSign: 'CHARLIE-9',
    type: 'helicopter',
    status: 'emergency',
    position: { lat: 28.6189, lng: 77.2285, altitude: 520 },
    heading: 95,
    speed: 38,
    battery: 42,
    operator: 'Emergency Response Unit',
    flightPlan: 'FP-2024-003',
    lastUpdate: new Date(Date.now() - 15000),
    image: "https://images.unsplash.com/photo-1714416047118-aee97f8257fa",
    alt: 'Red and white emergency medical helicopter in flight with visible rotor blades'
  },
  {
    id: 'UAV-004',
    callSign: 'DELTA-5',
    type: 'fixed-wing',
    status: 'active',
    position: { lat: 28.6089, lng: 77.1990, altitude: 610 },
    heading: 220,
    speed: 68,
    battery: 88,
    operator: 'Cargo Express Aviation',
    flightPlan: 'FP-2024-004',
    lastUpdate: new Date(Date.now() - 60000),
    image: "https://images.unsplash.com/photo-1689510230402-cf675397dd9e",
    alt: 'Fixed-wing unmanned aerial vehicle with sleek aerodynamic design in flight'
  },
  {
    id: 'UAV-005',
    callSign: 'ECHO-2',
    type: 'drone',
    status: 'idle',
    position: { lat: 28.6239, lng: 77.2140, altitude: 0 },
    heading: 0,
    speed: 0,
    battery: 95,
    operator: 'Metro Surveillance',
    flightPlan: 'FP-2024-005',
    lastUpdate: new Date(Date.now() - 120000),
    image: "https://images.unsplash.com/photo-1632681877245-bb521e428268",
    alt: 'Black commercial drone with folded propellers on landing pad'
  },
  {
    id: 'UAV-006',
    callSign: 'FOXTROT-8',
    type: 'uav',
    status: 'active',
    position: { lat: 28.6339, lng: 77.2240, altitude: 425 },
    heading: 315,
    speed: 48,
    battery: 71,
    operator: 'Infrastructure Monitoring',
    flightPlan: 'FP-2024-006',
    lastUpdate: new Date(Date.now() - 25000),
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19760df70-1764210562136.png",
    alt: 'Industrial inspection drone with thermal imaging camera hovering near structure'
  }]
  );

  const [restrictedZones] = useState<RestrictedZone[]>([
  {
    id: 'RZ-001',
    name: 'Parliament Complex',
    type: 'no-fly',
    coordinates: [
    { lat: 28.6172, lng: 77.2082 },
    { lat: 28.6172, lng: 77.2120 },
    { lat: 28.6145, lng: 77.2120 },
    { lat: 28.6145, lng: 77.2082 }],

    altitude: { min: 0, max: 1000 },
    active: true,
    reason: 'Government Security Zone'
  },
  {
    id: 'RZ-002',
    name: 'Airport Approach',
    type: 'restricted',
    coordinates: [
    { lat: 28.5562, lng: 77.0999 },
    { lat: 28.5562, lng: 77.1200 },
    { lat: 28.5400, lng: 77.1200 },
    { lat: 28.5400, lng: 77.0999 }],

    altitude: { min: 0, max: 500 },
    active: true,
    reason: 'Commercial Aviation Path'
  },
  {
    id: 'RZ-003',
    name: 'Military Installation',
    type: 'no-fly',
    coordinates: [
    { lat: 28.6450, lng: 77.2350 },
    { lat: 28.6450, lng: 77.2450 },
    { lat: 28.6350, lng: 77.2450 },
    { lat: 28.6350, lng: 77.2350 }],

    altitude: { min: 0, max: 2000 },
    active: true,
    reason: 'Defense Restricted Area'
  }]
  );

  const [weatherConditions] = useState<WeatherCondition[]>([
  {
    id: 'WX-001',
    location: 'Central Delhi',
    temperature: 28,
    windSpeed: 15,
    windDirection: 'NW',
    visibility: 8,
    conditions: 'Partly Cloudy',
    alerts: [],
    timestamp: new Date()
  },
  {
    id: 'WX-002',
    location: 'South Delhi',
    temperature: 30,
    windSpeed: 22,
    windDirection: 'W',
    visibility: 6,
    conditions: 'Hazy',
    alerts: ['Reduced visibility due to dust', 'Wind gusts up to 35 km/h expected'],
    timestamp: new Date()
  }]
  );

  const [criticalAlerts, setCriticalAlerts] = useState<CriticalAlert[]>([
  {
    id: 'ALERT-001',
    severity: 'critical',
    type: 'emergency',
    title: 'Emergency Landing Request - CHARLIE-9',
    description: 'Medical emergency helicopter requesting immediate priority landing clearance at nearest facility. Low fuel warning active.',
    vehicleId: 'UAV-003',
    location: 'Sector 28.6189, 77.2285',
    timestamp: new Date(Date.now() - 120000),
    acknowledged: false
  },
  {
    id: 'ALERT-002',
    severity: 'high',
    type: 'weather',
    title: 'Severe Wind Conditions Detected',
    description: 'Wind speeds exceeding safe operational limits in South Delhi sector. Multiple vehicles advised to adjust altitude or reroute.',
    location: 'South Delhi Airspace',
    timestamp: new Date(Date.now() - 300000),
    acknowledged: false
  },
  {
    id: 'ALERT-003',
    severity: 'high',
    type: 'violation',
    title: 'Unauthorized Entry - Unknown Vehicle',
    description: 'Unidentified aerial vehicle detected entering restricted airspace near Parliament Complex. No flight plan on record.',
    location: 'Parliament Security Zone',
    timestamp: new Date(Date.now() - 180000),
    acknowledged: false
  }]
  );

  const [emergencyAlerts] = useState([
  {
    id: 'EMERG-001',
    severity: 'critical' as const,
    title: 'Emergency Landing in Progress - CHARLIE-9',
    description: 'Medical emergency helicopter executing emergency landing protocol. All traffic cleared from approach vector.',
    timestamp: new Date(Date.now() - 120000),
    location: 'Central Delhi Sector'
  }]
  );

  const handleLayerToggle = (layerId: string) => {
    setMapLayers((prev) =>
    prev.map((layer) =>
    layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    )
    );
  };

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    navigate('/vehicle-tracking', { state: { vehicleId } });
  };

  const handleAlertAcknowledge = (alertId: string) => {
    setCriticalAlerts((prev) =>
    prev.map((alert) =>
    alert.id === alertId ? { ...alert, acknowledged: true } : alert
    )
    );
  };

  const handleAlertDetails = (alertId: string) => {
    navigate('/incident-management', { state: { alertId } });
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'emergency-alert':navigate('/incident-management', { state: { action: 'create-emergency' } });
        break;
      case 'quick-comm':console.log('Opening emergency communication channel');
        break;
      default:
        console.log('Quick action:', actionId);
    }
  };

  useEffect(() => {
    document.title = 'Airspace Dashboard - SkyGuard Traffic System';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header showMobileMenu />
      <EmergencyAlertBanner alerts={emergencyAlerts} />
      
      <main className="pt-24 pb-8 px-6 max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Airspace Command Center
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring and coordination of unmanned aerial traffic
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SystemStatusIndicator
              status={{
                connection: 'connected',
                dataStream: 'active',
                lastUpdate: new Date(Date.now() - 15000),
                criticalAlerts: criticalAlerts.filter((a) => !a.acknowledged).length
              }} />

            <QuickActionToolbar
              context="dashboard"
              onActionClick={handleQuickAction} />

          </div>
        </div>

        <div className="space-y-6">
          <TrafficMetricsCard metrics={trafficMetrics} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[600px]">
              <AirspaceMap
                vehicles={aerialVehicles}
                zones={restrictedZones}
                layers={mapLayers}
                onLayerToggle={handleLayerToggle}
                onVehicleSelect={handleVehicleSelect} />

            </div>

            <div className="space-y-6">
              <div className="h-[280px]">
                <CriticalAlertsList
                  alerts={criticalAlerts}
                  onAcknowledge={handleAlertAcknowledge}
                  onViewDetails={handleAlertDetails} />

              </div>
              <WeatherPanel conditions={weatherConditions} />
            </div>
          </div>

          <div className="h-[500px]">
            <ActiveVehiclesList
              vehicles={aerialVehicles}
              onVehicleSelect={handleVehicleSelect} />

          </div>
        </div>
      </main>
    </div>);

};

export default AirspaceDashboard;