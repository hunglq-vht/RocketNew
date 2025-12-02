export interface FlightOperator {
  id: string;
  name: string;
  organization: string;
  licenseNumber: string;
  contactEmail: string;
  contactPhone: string;
  avatar: string;
  avatarAlt: string;
}

export interface Vehicle {
  id: string;
  model: string;
  registrationNumber: string;
  type: 'fixed-wing' | 'rotary' | 'hybrid';
  maxAltitude: number;
  maxRange: number;
  status: 'operational' | 'maintenance' | 'grounded';
}

export interface FlightRoute {
  id: string;
  origin: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  destination: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  waypoints: Array<{
    id: string;
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    altitude: number;
  }>;
  distance: number;
  estimatedDuration: number;
}

export interface WeatherCondition {
  temperature: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  precipitation: number;
  conditions: string;
  severity: 'safe' | 'caution' | 'unsafe';
}

export interface FlightPlan {
  id: string;
  operator: FlightOperator;
  vehicle: Vehicle;
  route: FlightRoute;
  scheduledDeparture: Date;
  scheduledArrival: Date;
  actualDeparture?: Date;
  actualArrival?: Date;
  altitude: number;
  speed: number;
  purpose: string;
  weather: WeatherCondition;
  status: 'scheduled' | 'pending-approval' | 'approved' | 'active' | 'completed' | 'cancelled' | 'delayed';
  priority: 'routine' | 'priority' | 'emergency';
  authorizationStatus: 'pending' | 'approved' | 'denied' | 'expired';
  authorizationNotes?: string;
  restrictions: string[];
  emergencyContacts: Array<{
    name: string;
    role: string;
    phone: string;
  }>;
}

export interface AirspaceZone {
  id: string;
  name: string;
  type: 'unrestricted' | 'restricted' | 'prohibited' | 'temporary';
  coordinates: Array<{
    lat: number;
    lng: number;
  }>;
  altitudeRange: {
    min: number;
    max: number;
  };
  activeHours?: {
    start: string;
    end: string;
  };
  restrictions: string[];
}

export interface FlightFilter {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  operator: string;
  status: string[];
  airspaceZone: string;
  priority: string[];
  searchQuery: string;
}

export interface CollisionAlert {
  id: string;
  flightId: string;
  conflictingFlightId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  estimatedTime: Date;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  recommendedAction: string;
}

export interface FlightStatistics {
  totalFlights: number;
  activeFlights: number;
  scheduledFlights: number;
  completedFlights: number;
  pendingApprovals: number;
  cancelledFlights: number;
  averageFlightDuration: number;
  totalFlightHours: number;
}