import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import EmergencyAlertBanner from '../../components/EmergencyAlertBanner';
import SystemStatusIndicator from '../../components/SystemStatusIndicator';
import QuickActionToolbar from '../../components/QuickActionToolbar';
import IncidentStatsCards from './components/IncidentStatsCards';
import IncidentFiltersComponent from './components/IncidentFilters';
import IncidentTable from './components/IncidentTable';
import IncidentDetailPanel from './components/IncidentDetailPanel';
import CreateIncidentModal from './components/CreateIncidentModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { Incident, IncidentFilters, IncidentStats, IncidentStatus } from './types';

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filters, setFilters] = useState<IncidentFilters>({
    severity: [],
    status: [],
    type: [],
    dateRange: {
      start: null,
      end: null
    },
    searchQuery: ''
  });

  const mockIncidents: Incident[] = [
  {
    id: "INC-2024-001",
    type: "collision-risk",
    severity: "critical",
    status: "active",
    title: "Near-Miss Collision Event in Zone A-12",
    description: "Two unmanned aerial vehicles came within 50 meters of each other in restricted airspace Zone A-12. Automated collision avoidance systems activated successfully, preventing potential collision. Both vehicles were operating under approved flight plans but experienced GPS drift due to atmospheric conditions.",
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: "Manhattan Airspace Sector, New York",
      zone: "Zone A-12"
    },
    timestamp: new Date(Date.now() - 1800000),
    reportedBy: "Automated System Alert",
    affectedVehicles: ["UAV-2847", "UAV-3192"],
    weatherConditions: {
      temperature: 22,
      windSpeed: 15,
      visibility: 8,
      conditions: "Partly Cloudy"
    },
    witnesses: ["Ground Observer Station 4", "Pilot UAV-2847"],
    evidence: [
    {
      id: "EV-001",
      type: "photo",
      url: "https://images.unsplash.com/photo-1673111859123-fe97fc2d7878",
      alt: "Aerial photograph showing two drones in close proximity against cloudy sky with city buildings visible below",
      description: "Automated camera capture showing proximity of vehicles",
      uploadedBy: "System Camera UAV-2847",
      uploadedAt: new Date(Date.now() - 1700000)
    }],

    responseTeam: [
    {
      id: "RT-001",
      name: "Sarah Mitchell",
      role: "Senior Air Traffic Controller",
      status: "on-scene",
      contactNumber: "+1-555-0101",
      assignedAt: new Date(Date.now() - 1600000),
      arrivedAt: new Date(Date.now() - 1500000)
    },
    {
      id: "RT-002",
      name: "James Rodriguez",
      role: "Safety Inspector",
      status: "dispatched",
      contactNumber: "+1-555-0102",
      assignedAt: new Date(Date.now() - 1400000)
    }],

    timeline: [
    {
      id: "TL-001",
      timestamp: new Date(Date.now() - 1800000),
      event: "Incident Detected",
      description: "Automated collision detection system identified proximity alert",
      actor: "Collision Avoidance System",
      automated: true
    },
    {
      id: "TL-002",
      timestamp: new Date(Date.now() - 1750000),
      event: "Emergency Protocols Activated",
      description: "Both vehicles received automated evasive maneuver commands",
      actor: "Traffic Management System",
      automated: true
    },
    {
      id: "TL-003",
      timestamp: new Date(Date.now() - 1600000),
      event: "Response Team Assigned",
      description: "Senior controller and safety inspector dispatched to investigate",
      actor: "Operations Center",
      automated: false
    }],

    regulatoryNotifications: [
    {
      id: "RN-001",
      authority: "Federal Aviation Administration",
      notifiedAt: new Date(Date.now() - 1700000),
      reportNumber: "FAA-2024-CR-001",
      status: "acknowledged"
    }]

  },
  {
    id: "INC-2024-002",
    type: "unauthorized-entry",
    severity: "high",
    status: "investigating",
    title: "Unauthorized Vehicle Entry in Restricted Zone B-7",
    description: "An unregistered unmanned aerial vehicle was detected entering restricted military airspace Zone B-7 without proper authorization or flight plan. The vehicle did not respond to communication attempts and was tracked for 12 minutes before exiting the restricted zone.",
    location: {
      latitude: 38.8977,
      longitude: -77.0365,
      address: "Washington DC Restricted Airspace",
      zone: "Zone B-7"
    },
    timestamp: new Date(Date.now() - 7200000),
    reportedBy: "Radar Station Delta-3",
    affectedVehicles: ["UNKNOWN-001"],
    weatherConditions: {
      temperature: 18,
      windSpeed: 8,
      visibility: 10,
      conditions: "Clear"
    },
    witnesses: ["Radar Operator Station Delta-3", "Security Patrol Unit 5"],
    evidence: [
    {
      id: "EV-002",
      type: "photo",
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_198fc28f2-1764210562131.png",
      alt: "Radar screen display showing unidentified aircraft blip in restricted airspace with red warning indicators",
      description: "Radar tracking data showing unauthorized vehicle path",
      uploadedBy: "Radar Station Delta-3",
      uploadedAt: new Date(Date.now() - 7000000)
    }],

    responseTeam: [
    {
      id: "RT-003",
      name: "Michael Chen",
      role: "Security Coordinator",
      status: "on-scene",
      contactNumber: "+1-555-0103",
      assignedAt: new Date(Date.now() - 6800000),
      arrivedAt: new Date(Date.now() - 6500000)
    }],

    timeline: [
    {
      id: "TL-004",
      timestamp: new Date(Date.now() - 7200000),
      event: "Unauthorized Entry Detected",
      description: "Radar system identified unregistered vehicle entering restricted zone",
      actor: "Radar Monitoring System",
      automated: true
    },
    {
      id: "TL-005",
      timestamp: new Date(Date.now() - 7100000),
      event: "Communication Attempts Initiated",
      description: "Multiple radio frequency attempts to contact vehicle operator",
      actor: "Communications Officer",
      automated: false
    }],

    regulatoryNotifications: [
    {
      id: "RN-002",
      authority: "Department of Homeland Security",
      notifiedAt: new Date(Date.now() - 7000000),
      reportNumber: "DHS-2024-UE-002",
      status: "under-review"
    }]

  },
  {
    id: "INC-2024-003",
    type: "equipment-failure",
    severity: "medium",
    status: "resolved",
    title: "GPS Navigation System Malfunction - UAV-5621",
    description: "Vehicle UAV-5621 experienced complete GPS navigation system failure during routine delivery operation. Backup navigation systems activated successfully, and the vehicle executed emergency landing protocol at designated safe zone. No injuries or property damage reported.",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: "Los Angeles Commercial Corridor",
      zone: "Zone C-4"
    },
    timestamp: new Date(Date.now() - 14400000),
    reportedBy: "Pilot UAV-5621",
    affectedVehicles: ["UAV-5621"],
    weatherConditions: {
      temperature: 25,
      windSpeed: 12,
      visibility: 15,
      conditions: "Sunny"
    },
    witnesses: ["Ground Control Station 8"],
    evidence: [],
    responseTeam: [
    {
      id: "RT-004",
      name: "Emily Watson",
      role: "Technical Support Engineer",
      status: "resolved",
      contactNumber: "+1-555-0104",
      assignedAt: new Date(Date.now() - 14000000),
      arrivedAt: new Date(Date.now() - 13500000)
    }],

    timeline: [
    {
      id: "TL-006",
      timestamp: new Date(Date.now() - 14400000),
      event: "Equipment Failure Detected",
      description: "GPS navigation system reported critical error",
      actor: "Vehicle Diagnostic System",
      automated: true
    },
    {
      id: "TL-007",
      timestamp: new Date(Date.now() - 14300000),
      event: "Emergency Landing Initiated",
      description: "Backup systems activated and safe landing executed",
      actor: "Automated Safety System",
      automated: true
    },
    {
      id: "TL-008",
      timestamp: new Date(Date.now() - 12000000),
      event: "Incident Resolved",
      description: "Vehicle recovered and GPS system replaced",
      actor: "Emily Watson",
      automated: false
    }],

    regulatoryNotifications: [],
    resolution: "GPS navigation module replaced. Vehicle passed all diagnostic tests and returned to service.",
    closedAt: new Date(Date.now() - 12000000)
  },
  {
    id: "INC-2024-004",
    type: "weather-emergency",
    severity: "high",
    status: "active",
    title: "Severe Weather Emergency - Multiple Vehicles Affected",
    description: "Unexpected severe thunderstorm developed rapidly in operational area, affecting 8 active vehicles. Emergency weather protocols activated, directing all vehicles to nearest safe landing zones. Two vehicles experienced minor turbulence-related system alerts.",
    location: {
      latitude: 41.8781,
      longitude: -87.6298,
      address: "Chicago Metropolitan Airspace",
      zone: "Zone D-9"
    },
    timestamp: new Date(Date.now() - 3600000),
    reportedBy: "Weather Monitoring System",
    affectedVehicles: ["UAV-7234", "UAV-7891", "UAV-8012", "UAV-8456", "UAV-8923", "UAV-9145", "UAV-9678", "UAV-9834"],
    weatherConditions: {
      temperature: 16,
      windSpeed: 45,
      visibility: 2,
      conditions: "Severe Thunderstorm"
    },
    witnesses: ["Weather Station Chicago-1", "Multiple Ground Observers"],
    evidence: [
    {
      id: "EV-003",
      type: "photo",
      url: "https://images.unsplash.com/photo-1559060036-834f4cc4a5f3",
      alt: "Dark storm clouds with lightning strikes over city skyline during severe weather event",
      description: "Weather satellite imagery showing storm development",
      uploadedBy: "Weather Monitoring System",
      uploadedAt: new Date(Date.now() - 3500000)
    }],

    responseTeam: [
    {
      id: "RT-005",
      name: "David Thompson",
      role: "Weather Emergency Coordinator",
      status: "on-scene",
      contactNumber: "+1-555-0105",
      assignedAt: new Date(Date.now() - 3400000),
      arrivedAt: new Date(Date.now() - 3200000)
    },
    {
      id: "RT-006",
      name: "Lisa Anderson",
      role: "Fleet Operations Manager",
      status: "dispatched",
      contactNumber: "+1-555-0106",
      assignedAt: new Date(Date.now() - 3300000)
    }],

    timeline: [
    {
      id: "TL-009",
      timestamp: new Date(Date.now() - 3600000),
      event: "Severe Weather Alert Issued",
      description: "Rapid storm development detected in operational area",
      actor: "Weather Monitoring System",
      automated: true
    },
    {
      id: "TL-010",
      timestamp: new Date(Date.now() - 3500000),
      event: "Emergency Protocols Activated",
      description: "All affected vehicles directed to safe landing zones",
      actor: "Emergency Response System",
      automated: true
    }],

    regulatoryNotifications: [
    {
      id: "RN-003",
      authority: "National Weather Service",
      notifiedAt: new Date(Date.now() - 3400000),
      reportNumber: "NWS-2024-WE-003",
      status: "acknowledged"
    }]

  },
  {
    id: "INC-2024-005",
    type: "communication-loss",
    severity: "medium",
    status: "investigating",
    title: "Temporary Communication Loss - UAV-4523",
    description: "Vehicle UAV-4523 experienced 8-minute communication blackout during routine patrol operation. Vehicle maintained autonomous flight path and communication was restored automatically. Investigating potential radio frequency interference from nearby construction equipment.",
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: "San Francisco Bay Area",
      zone: "Zone E-3"
    },
    timestamp: new Date(Date.now() - 10800000),
    reportedBy: "Ground Control Station 12",
    affectedVehicles: ["UAV-4523"],
    weatherConditions: {
      temperature: 20,
      windSpeed: 10,
      visibility: 12,
      conditions: "Foggy"
    },
    witnesses: ["Ground Control Operator Station 12"],
    evidence: [],
    responseTeam: [
    {
      id: "RT-007",
      name: "Robert Martinez",
      role: "Communications Specialist",
      status: "on-scene",
      contactNumber: "+1-555-0107",
      assignedAt: new Date(Date.now() - 10500000),
      arrivedAt: new Date(Date.now() - 10200000)
    }],

    timeline: [
    {
      id: "TL-011",
      timestamp: new Date(Date.now() - 10800000),
      event: "Communication Loss Detected",
      description: "Ground control lost radio contact with vehicle",
      actor: "Communication Monitoring System",
      automated: true
    },
    {
      id: "TL-012",
      timestamp: new Date(Date.now() - 10320000),
      event: "Communication Restored",
      description: "Radio contact automatically re-established",
      actor: "Communication System",
      automated: true
    }],

    regulatoryNotifications: []
  }];


  useEffect(() => {
    setIncidents(mockIncidents);
    setFilteredIncidents(mockIncidents);
  }, []);

  useEffect(() => {
    let filtered = [...incidents];

    if (filters.severity.length > 0) {
      filtered = filtered.filter((incident) =>
      filters.severity.includes(incident.severity)
      );
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter((incident) =>
      filters.status.includes(incident.status)
      );
    }

    if (filters.type.length > 0) {
      filtered = filtered.filter((incident) =>
      filters.type.includes(incident.type)
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((incident) =>
      incident.title.toLowerCase().includes(query) ||
      incident.description.toLowerCase().includes(query) ||
      incident.id.toLowerCase().includes(query) ||
      incident.location.address.toLowerCase().includes(query)
      );
    }

    if (filters.dateRange.start) {
      filtered = filtered.filter((incident) =>
      incident.timestamp >= filters.dateRange.start!
      );
    }

    if (filters.dateRange.end) {
      filtered = filtered.filter((incident) =>
      incident.timestamp <= filters.dateRange.end!
      );
    }

    setFilteredIncidents(filtered);
  }, [filters, incidents]);

  const stats: IncidentStats = {
    total: incidents.length,
    active: incidents.filter((i) => i.status === 'active').length,
    resolved: incidents.filter((i) => i.status === 'resolved').length,
    critical: incidents.filter((i) => i.severity === 'critical').length,
    averageResponseTime: 12,
    trendsData: [
    { date: '2024-01', incidents: 45 },
    { date: '2024-02', incidents: 52 },
    { date: '2024-03', incidents: 38 },
    { date: '2024-04', incidents: 61 },
    { date: '2024-05', incidents: 48 },
    { date: '2024-06', incidents: 55 }]

  };

  const emergencyAlerts = incidents.
  filter((i) => i.severity === 'critical' && i.status === 'active').
  map((i) => ({
    id: i.id,
    severity: i.severity,
    title: i.title,
    description: i.description,
    timestamp: i.timestamp,
    location: i.location.address
  }));

  const handleFiltersChange = (newFilters: IncidentFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      severity: [],
      status: [],
      type: [],
      dateRange: {
        start: null,
        end: null
      },
      searchQuery: ''
    });
  };

  const handleIncidentSelect = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  const handleCreateIncident = (incidentData: any) => {
    const newIncident: Incident = {
      ...incidentData,
      id: `INC-2024-${String(incidents.length + 1).padStart(3, '0')}`,
      timestamp: new Date(),
      reportedBy: "Manual Report",
      witnesses: [],
      evidence: [],
      responseTeam: [],
      timeline: [
      {
        id: "TL-001",
        timestamp: new Date(),
        event: "Incident Reported",
        description: "Incident manually reported through system interface",
        actor: "System User",
        automated: false
      }],

      regulatoryNotifications: []
    };

    setIncidents([newIncident, ...incidents]);
    setIsCreateModalOpen(false);
  };

  const handleEscalate = (incidentId: string) => {
    console.log('Escalating incident:', incidentId);
  };

  const handleResolve = (incidentId: string) => {
    setIncidents(incidents.map((incident) =>
    incident.id === incidentId ?
    { ...incident, status: 'resolved' as IncidentStatus, closedAt: new Date() } :
    incident
    ));
    setSelectedIncident(null);
  };

  const handleQuickAction = (actionId: string) => {
    console.log('Quick action triggered:', actionId);
  };

  return (
    <>
      <Helmet>
        <title>Incident Management - SkyGuard Traffic System</title>
        <meta name="description" content="Emergency response coordination and documentation for aviation safety events and emergencies in the SkyGuard unmanned traffic management system" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header showMobileMenu />
        
        {emergencyAlerts.length > 0 &&
        <EmergencyAlertBanner alerts={emergencyAlerts} />
        }

        <main className={`pt-20 ${emergencyAlerts.length > 0 ? 'mt-16' : ''}`}>
          <div className="max-w-screen-2xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Incident Management</h1>
                <p className="text-sm text-muted-foreground">
                  Emergency response coordination and safety event documentation
                </p>
              </div>
              <div className="flex items-center gap-3">
                <SystemStatusIndicator />
                <Button
                  variant="danger"
                  onClick={() => setIsCreateModalOpen(true)}
                  iconName="AlertTriangle"
                  iconSize={18}>

                  Report Incident
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <IncidentStatsCards stats={stats} />
            </div>

            <div className="mb-6">
              <IncidentFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters} />

            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="List" size={20} strokeWidth={2} className="text-muted-foreground" />
                  <h2 className="text-lg font-semibold text-foreground">Active Incidents</h2>
                  <span className="px-2 py-0.5 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                    {filteredIncidents.length}
                  </span>
                </div>
                <QuickActionToolbar context="incident" onActionClick={handleQuickAction} />
              </div>
              <IncidentTable
                incidents={filteredIncidents}
                onIncidentSelect={handleIncidentSelect}
                selectedIncidentId={selectedIncident?.id} />

            </div>
          </div>
        </main>

        <IncidentDetailPanel
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onEscalate={handleEscalate}
          onResolve={handleResolve} />


        <CreateIncidentModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateIncident} />

      </div>
    </>);

};

export default IncidentManagement;