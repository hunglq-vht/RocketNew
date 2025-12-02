export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'active' | 'investigating' | 'resolved' | 'closed';
export type IncidentType = 'collision-risk' | 'unauthorized-entry' | 'equipment-failure' | 'weather-emergency' | 'communication-loss' | 'medical-emergency' | 'security-breach' | 'other';
export type ResponseStatus = 'pending' | 'dispatched' | 'on-scene' | 'resolved';

export interface Incident {
  id: string;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    zone: string;
  };
  timestamp: Date;
  reportedBy: string;
  affectedVehicles: string[];
  weatherConditions?: {
    temperature: number;
    windSpeed: number;
    visibility: number;
    conditions: string;
  };
  witnesses: string[];
  evidence: Evidence[];
  responseTeam: ResponseTeam[];
  timeline: TimelineEvent[];
  regulatoryNotifications: RegulatoryNotification[];
  resolution?: string;
  closedAt?: Date;
}

export interface Evidence {
  id: string;
  type: 'photo' | 'video' | 'document' | 'audio';
  url: string;
  alt: string;
  description: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface ResponseTeam {
  id: string;
  name: string;
  role: string;
  status: ResponseStatus;
  contactNumber: string;
  assignedAt: Date;
  arrivedAt?: Date;
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  event: string;
  description: string;
  actor: string;
  automated: boolean;
}

export interface RegulatoryNotification {
  id: string;
  authority: string;
  notifiedAt: Date;
  reportNumber: string;
  status: 'pending' | 'acknowledged' | 'under-review' | 'closed';
}

export interface IncidentFilters {
  severity: IncidentSeverity[];
  status: IncidentStatus[];
  type: IncidentType[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  searchQuery: string;
}

export interface IncidentStats {
  total: number;
  active: number;
  resolved: number;
  critical: number;
  averageResponseTime: number;
  trendsData: {
    date: string;
    incidents: number;
  }[];
}