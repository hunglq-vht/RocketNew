import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import EmergencyAlertBanner from '../../components/EmergencyAlertBanner';
import SystemStatusIndicator from '../../components/SystemStatusIndicator';
import QuickActionToolbar from '../../components/QuickActionToolbar';
import FlightStatisticsCards from './components/FlightStatisticsCards';
import FlightFilterPanel from './components/FlightFilterPanel';
import FlightPlanningPanel from './components/FlightPlanningPanel';
import AuthorizationPanel from './components/AuthorizationPanel';
import FlightOperationsTable from './components/FlightOperationsTable';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import {
  FlightPlan,
  FlightFilter,
  FlightStatistics,
  FlightOperator,
  Vehicle,
  FlightRoute,
  WeatherCondition } from
'./types';

const FlightManagement = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FlightFilter>({
    dateRange: { start: null, end: null },
    operator: '',
    status: [],
    airspaceZone: 'all',
    priority: [],
    searchQuery: ''
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mockOperators: FlightOperator[] = [
  {
    id: 'op-001',
    name: 'Sarah Mitchell',
    organization: 'SkyTech Logistics',
    licenseNumber: 'UAV-2024-001',
    contactEmail: 'sarah.mitchell@skytech.com',
    contactPhone: '+1-555-0101',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16be75a7b-1763298247063.png",
    avatarAlt: 'Professional woman with short brown hair wearing blue aviation uniform smiling at camera'
  },
  {
    id: 'op-002',
    name: 'James Rodriguez',
    organization: 'AeroSurvey Inc',
    licenseNumber: 'UAV-2024-002',
    contactEmail: 'james.rodriguez@aerosurvey.com',
    contactPhone: '+1-555-0102',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19b58ddcf-1763296385924.png",
    avatarAlt: 'Hispanic man with black hair and beard wearing pilot uniform with headset'
  },
  {
    id: 'op-003',
    name: 'Emily Chen',
    organization: 'DroneExpress Delivery',
    licenseNumber: 'UAV-2024-003',
    contactEmail: 'emily.chen@droneexpress.com',
    contactPhone: '+1-555-0103',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11f631977-1763295619675.png",
    avatarAlt: 'Asian woman with long black hair wearing professional aviation jacket in control room'
  }];


  const mockVehicles: Vehicle[] = [
  {
    id: 'uav-001',
    model: 'SkyGuard X-500',
    registrationNumber: 'N-UAV-5001',
    type: 'fixed-wing',
    maxAltitude: 15000,
    maxRange: 100,
    status: 'operational'
  },
  {
    id: 'uav-002',
    model: 'AeroScout R-300',
    registrationNumber: 'N-UAV-3002',
    type: 'rotary',
    maxAltitude: 10000,
    maxRange: 50,
    status: 'operational'
  },
  {
    id: 'uav-003',
    model: 'CargoLift H-800',
    registrationNumber: 'N-UAV-8003',
    type: 'hybrid',
    maxAltitude: 12000,
    maxRange: 75,
    status: 'operational'
  }];


  const mockRoutes: FlightRoute[] = [
  {
    id: 'route-001',
    origin: {
      name: 'JFK International Airport',
      coordinates: { lat: 40.6413, lng: -73.7781 }
    },
    destination: {
      name: 'LaGuardia Airport',
      coordinates: { lat: 40.7769, lng: -73.8740 }
    },
    waypoints: [
    {
      id: 'wp-001',
      name: 'Queens Waypoint',
      coordinates: { lat: 40.7128, lng: -73.8260 },
      altitude: 5000
    }],

    distance: 15.5,
    estimatedDuration: 45
  },
  {
    id: 'route-002',
    origin: {
      name: 'Newark Liberty International',
      coordinates: { lat: 40.6895, lng: -74.1745 }
    },
    destination: {
      name: 'Teterboro Airport',
      coordinates: { lat: 40.8501, lng: -74.0608 }
    },
    waypoints: [],
    distance: 22.3,
    estimatedDuration: 60
  }];


  const mockWeather: WeatherCondition = {
    temperature: 22,
    windSpeed: 15,
    windDirection: 'NW',
    visibility: 10,
    precipitation: 0,
    conditions: 'Clear skies',
    severity: 'safe'
  };

  const mockFlights: FlightPlan[] = [
  {
    id: 'FLT-2024-001',
    operator: mockOperators[0],
    vehicle: mockVehicles[0],
    route: mockRoutes[0],
    scheduledDeparture: new Date(Date.now() + 7200000),
    scheduledArrival: new Date(Date.now() + 9900000),
    altitude: 5000,
    speed: 120,
    purpose: 'Cargo delivery - Medical supplies',
    weather: mockWeather,
    status: 'scheduled',
    priority: 'priority',
    authorizationStatus: 'approved',
    restrictions: ['No-fly zone avoidance', 'Weather monitoring required'],
    emergencyContacts: [
    { name: 'Emergency Control', role: 'Primary', phone: '+1-555-9999' }]

  },
  {
    id: 'FLT-2024-002',
    operator: mockOperators[1],
    vehicle: mockVehicles[1],
    route: mockRoutes[1],
    scheduledDeparture: new Date(Date.now() + 3600000),
    scheduledArrival: new Date(Date.now() + 7200000),
    altitude: 3500,
    speed: 80,
    purpose: 'Aerial survey - Infrastructure inspection',
    weather: mockWeather,
    status: 'active',
    priority: 'routine',
    authorizationStatus: 'approved',
    restrictions: ['Maintain minimum altitude 3000ft'],
    emergencyContacts: [
    { name: 'Survey Control', role: 'Primary', phone: '+1-555-8888' }]

  },
  {
    id: 'FLT-2024-003',
    operator: mockOperators[2],
    vehicle: mockVehicles[2],
    route: mockRoutes[0],
    scheduledDeparture: new Date(Date.now() + 1800000),
    scheduledArrival: new Date(Date.now() + 4500000),
    altitude: 4000,
    speed: 100,
    purpose: 'Emergency response - Search and rescue support',
    weather: mockWeather,
    status: 'pending-approval',
    priority: 'emergency',
    authorizationStatus: 'pending',
    restrictions: ['Priority clearance required', 'Emergency protocols active'],
    emergencyContacts: [
    { name: 'Emergency Services', role: 'Primary', phone: '+1-555-7777' }]

  },
  {
    id: 'FLT-2024-004',
    operator: mockOperators[0],
    vehicle: mockVehicles[0],
    route: mockRoutes[1],
    scheduledDeparture: new Date(Date.now() - 3600000),
    scheduledArrival: new Date(Date.now() - 900000),
    actualDeparture: new Date(Date.now() - 3600000),
    actualArrival: new Date(Date.now() - 900000),
    altitude: 5500,
    speed: 125,
    purpose: 'Package delivery - Express service',
    weather: mockWeather,
    status: 'completed',
    priority: 'routine',
    authorizationStatus: 'approved',
    restrictions: [],
    emergencyContacts: [
    { name: 'Delivery Control', role: 'Primary', phone: '+1-555-6666' }]

  }];


  const [flights, setFlights] = useState<FlightPlan[]>(mockFlights);
  const [filteredFlights, setFilteredFlights] = useState<FlightPlan[]>(mockFlights);

  const statistics: FlightStatistics = {
    totalFlights: flights.length,
    activeFlights: flights.filter((f) => f.status === 'active').length,
    scheduledFlights: flights.filter((f) => f.status === 'scheduled').length,
    completedFlights: flights.filter((f) => f.status === 'completed').length,
    pendingApprovals: flights.filter((f) => f.status === 'pending-approval').length,
    cancelledFlights: flights.filter((f) => f.status === 'cancelled').length,
    averageFlightDuration: 52,
    totalFlightHours: 248
  };

  const pendingFlights = flights.filter((f) => f.status === 'pending-approval');

  useEffect(() => {
    let filtered = [...flights];

    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (f) =>
        f.id.toLowerCase().includes(query) ||
        f.operator.name.toLowerCase().includes(query) ||
        f.vehicle.registrationNumber.toLowerCase().includes(query) ||
        f.route.origin.name.toLowerCase().includes(query) ||
        f.route.destination.name.toLowerCase().includes(query)
      );
    }

    if (filter.status.length > 0) {
      filtered = filtered.filter((f) => filter.status.includes(f.status));
    }

    if (filter.priority.length > 0) {
      filtered = filtered.filter((f) => filter.priority.includes(f.priority));
    }

    setFilteredFlights(filtered);
  }, [filter, flights]);

  const handleScheduleNewFlight = () => {
    console.log('Schedule new flight');
  };

  const handlePlanFlight = (route: Partial<FlightRoute>) => {
    console.log('Plan flight with route:', route);
  };

  const handleApproveFlight = (flightId: string, notes: string) => {
    setFlights((prev) =>
    prev.map((f) =>
    f.id === flightId ?
    {
      ...f,
      status: 'approved',
      authorizationStatus: 'approved',
      authorizationNotes: notes
    } :
    f
    )
    );
  };

  const handleDenyFlight = (flightId: string, reason: string) => {
    setFlights((prev) =>
    prev.map((f) =>
    f.id === flightId ?
    {
      ...f,
      status: 'cancelled',
      authorizationStatus: 'denied',
      authorizationNotes: reason
    } :
    f
    )
    );
  };

  const handleViewDetails = (flightId: string) => {
    console.log('View flight details:', flightId);
  };

  const handleTrackVehicle = (vehicleId: string) => {
    navigate('/vehicle-tracking', { state: { vehicleId } });
  };

  const handleQuickAction = (actionId: string) => {
    console.log('Quick action:', actionId);
  };

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDismissAlert = () => {
    console.log('Alert dismissed');
  };

  return (
    <>
      <Helmet>
        <title>Flight Management - SkyGuard Traffic System</title>
        <meta
          name="description"
          content="Comprehensive flight planning, authorization, and monitoring for unmanned aerial vehicle operations" />

      </Helmet>

      <div className="min-h-screen bg-background">
        <Header showMobileMenu onMenuToggle={handleMenuToggle} />
        <EmergencyAlertBanner onDismiss={handleDismissAlert} />

        <main className="pt-24 pb-8 px-6">
          <div className="max-w-screen-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Flight Management</h1>
                <p className="text-muted-foreground">
                  Plan, authorize, and monitor unmanned aerial vehicle operations
                </p>
              </div>
              <div className="flex items-center gap-3">
                <SystemStatusIndicator />
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleScheduleNewFlight}>

                  Schedule New Flight
                </Button>
              </div>
            </div>

            <FlightStatisticsCards statistics={statistics} />

            <FlightFilterPanel
              filter={filter}
              onFilterChange={setFilter}
              resultCount={filteredFlights.length} />


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FlightPlanningPanel onPlanFlight={handlePlanFlight} />
              <AuthorizationPanel
                pendingFlights={pendingFlights}
                onApprove={handleApproveFlight}
                onDeny={handleDenyFlight} />

            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Plane" size={24} strokeWidth={2} className="text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Flight Operations</h2>
              </div>
              <FlightOperationsTable
                flights={filteredFlights}
                onViewDetails={handleViewDetails}
                onTrackVehicle={handleTrackVehicle} />

            </div>
          </div>
        </main>

        <QuickActionToolbar context="flight" onActionClick={handleQuickAction} />
      </div>
    </>);

};

export default FlightManagement;