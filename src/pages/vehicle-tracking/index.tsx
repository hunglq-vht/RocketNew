import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import EmergencyAlertBanner from '../../components/EmergencyAlertBanner';
import SystemStatusIndicator from '../../components/SystemStatusIndicator';
import QuickActionToolbar from '../../components/QuickActionToolbar';
import VehicleMap from './components/VehicleMap';
import TelemetryPanel from './components/TelemetryPanel';
import FlightHistoryTimeline from './components/FlightHistoryTimeline';
import WeatherPanel from './components/WeatherPanel';
import MaintenanceAlerts from './components/MaintenanceAlerts';
import CommunicationPanel from './components/CommunicationPanel';
import PerformanceMetrics from './components/PerformanceMetrics';
import EmergencyControls from './components/EmergencyControls';
import VehicleInfoCard from './components/VehicleInfoCard';
import { VehicleTrackingData } from './types';

const VehicleTracking = () => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState<'overview' | 'detailed'>('overview');
  const [trackingData, setTrackingData] = useState<VehicleTrackingData>({
    vehicle: {
      id: "UAV-2847",
      name: "SkyGuard Alpha-7",
      type: "drone",
      status: "active",
      operator: "Captain Sarah Mitchell",
      registration: "N847SG"
    },
    currentPosition: {
      latitude: 40.7128,
      longitude: -74.0060,
      altitude: 1250,
      heading: 285,
      timestamp: new Date()
    },
    telemetry: {
      altitude: 1250,
      speed: 45,
      battery: 78,
      signalStrength: 92,
      temperature: 22,
      gpsAccuracy: 2.5,
      verticalSpeed: 150
    },
    flightPath: {
      id: "FP-2847-001",
      waypoints: [
        { latitude: 40.7128, longitude: -74.0060, altitude: 1250, heading: 285, timestamp: new Date() },
        { latitude: 40.7580, longitude: -73.9855, altitude: 1500, heading: 320, timestamp: new Date(Date.now() + 600000) },
        { latitude: 40.7829, longitude: -73.9654, altitude: 1800, heading: 15, timestamp: new Date(Date.now() + 1200000) }
      ],
      estimatedTime: 45,
      distance: 12.5,
      status: "active"
    },
    weather: {
      temperature: 18,
      windSpeed: 12,
      windDirection: 270,
      visibility: 15,
      precipitation: 0,
      condition: "clear",
      alerts: []
    },
    maintenanceAlerts: [
      {
        id: "MA-001",
        type: "routine",
        component: "Propeller System",
        description: "Scheduled maintenance inspection due for propeller assembly and motor bearings.",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "scheduled"
      },
      {
        id: "MA-002",
        type: "urgent",
        component: "Battery Pack",
        description: "Battery performance degradation detected. Replacement recommended within 48 hours.",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: "pending"
      }
    ],
    communicationLogs: [
      {
        id: "CL-001",
        timestamp: new Date(Date.now() - 300000),
        sender: "Ground Control",
        receiver: "UAV-2847",
        message: "Flight path approved. Proceed to waypoint Alpha-2.",
        type: "text",
        priority: "medium"
      },
      {
        id: "CL-002",
        timestamp: new Date(Date.now() - 180000),
        sender: "UAV-2847",
        receiver: "Ground Control",
        message: "Waypoint Alpha-1 reached. Altitude stable at 1250 feet.",
        type: "text",
        priority: "low"
      },
      {
        id: "CL-003",
        timestamp: new Date(Date.now() - 60000),
        sender: "Weather Service",
        receiver: "UAV-2847",
        message: "Weather conditions optimal. No adverse conditions expected.",
        type: "alert",
        priority: "low"
      }
    ],
    performanceMetrics: [
      { name: "Flight Efficiency", value: 94, unit: "%", status: "normal", trend: "stable" },
      { name: "Power Consumption", value: 22, unit: "W", status: "normal", trend: "down" },
      { name: "Communication Latency", value: 45, unit: "ms", status: "normal", trend: "stable" },
      { name: "GPS Accuracy", value: 2.5, unit: "m", status: "normal", trend: "up" }
    ],
    emergencyControls: [
      {
        id: "EC-001",
        action: "Emergency Landing",
        description: "Initiate immediate emergency landing protocol at nearest safe location.",
        requiresConfirmation: true,
        icon: "PlaneLanding"
      },
      {
        id: "EC-002",
        action: "Return to Base",
        description: "Override current flight plan and return vehicle to launch point.",
        requiresConfirmation: true,
        icon: "Home"
      },
      {
        id: "EC-003",
        action: "Collision Avoidance",
        description: "Activate automated collision avoidance system with priority override.",
        requiresConfirmation: false,
        icon: "ShieldAlert"
      }
    ],
    flightHistory: [
      {
        timestamp: new Date(Date.now() - 1800000),
        position: { latitude: 40.7128, longitude: -74.0060, altitude: 500, heading: 0, timestamp: new Date() },
        event: "Flight Initiated",
        eventType: "waypoint"
      },
      {
        timestamp: new Date(Date.now() - 1200000),
        position: { latitude: 40.7280, longitude: -74.0020, altitude: 1000, heading: 45, timestamp: new Date() },
        event: "Altitude Adjustment",
        eventType: "altitude-change"
      },
      {
        timestamp: new Date(Date.now() - 900000),
        position: { latitude: 40.7380, longitude: -73.9980, altitude: 1250, heading: 90, timestamp: new Date() },
        event: "Waypoint Alpha-1 Reached",
        eventType: "waypoint"
      },
      {
        timestamp: new Date(Date.now() - 600000),
        position: { latitude: 40.7450, longitude: -73.9940, altitude: 1250, heading: 120, timestamp: new Date() },
        event: "Communication Check",
        eventType: "communication"
      }
    ]
  });

  const emergencyAlerts = [
    {
      id: "EA-001",
      severity: "medium" as const,
      title: "Weather Advisory",
      description: "Moderate wind conditions detected in sector B-7. Monitor vehicle stability.",
      timestamp: new Date(Date.now() - 300000),
      location: "Sector B-7"
    }
  ];

  const systemStatus = {
    connection: "connected" as const,
    dataStream: "active" as const,
    lastUpdate: new Date(Date.now() - 5000),
    criticalAlerts: 0
  };

  const handleQuickAction = (actionId: string) => {
    console.log("Quick action triggered:", actionId);
  };

  const handleMapInteraction = (action: string) => {
    console.log("Map interaction:", action);
  };

  const handleAlertClick = (alertId: string) => {
    console.log("Alert clicked:", alertId);
  };

  const handleSendMessage = (message: string) => {
    console.log("Message sent:", message);
  };

  const handleControlActivate = (controlId: string) => {
    console.log("Emergency control activated:", controlId);
  };

  const handleMenuToggle = () => {
    console.log("Menu toggled");
  };

  const handleDismissAlert = (alertId: string) => {
    console.log("Alert dismissed:", alertId);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTrackingData(prev => ({
        ...prev,
        currentPosition: {
          ...prev.currentPosition,
          timestamp: new Date()
        },
        telemetry: {
          ...prev.telemetry,
          battery: Math.max(0, prev.telemetry.battery - 0.1),
          altitude: prev.telemetry.altitude + (Math.random() - 0.5) * 10
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header showMobileMenu={true} onMenuToggle={handleMenuToggle} />
      <EmergencyAlertBanner alerts={emergencyAlerts} onDismiss={handleDismissAlert} />
      
      <main className="pt-24 pb-8 px-6">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Vehicle Tracking</h1>
              <p className="text-sm text-muted-foreground">Real-time monitoring and control for {trackingData.vehicle.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <SystemStatusIndicator status={systemStatus} />
              <div className="hidden lg:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedView('overview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    selectedView === 'overview' ?'bg-primary text-primary-foreground' :'bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  Overview
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedView('detailed')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    selectedView === 'detailed' ?'bg-primary text-primary-foreground' :'bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  Detailed
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-[500px]">
                <VehicleMap
                  currentPosition={trackingData.currentPosition}
                  flightPath={trackingData.flightPath}
                  vehicleName={trackingData.vehicle.name}
                  onMapInteraction={handleMapInteraction}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TelemetryPanel telemetry={trackingData.telemetry} />
                <WeatherPanel weather={trackingData.weather} />
              </div>

              {selectedView === 'detailed' && (
                <>
                  <FlightHistoryTimeline history={trackingData.flightHistory} />
                  <PerformanceMetrics metrics={trackingData.performanceMetrics} />
                </>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <VehicleInfoCard vehicle={trackingData.vehicle} />
              
              <div className="h-[400px]">
                <CommunicationPanel
                  logs={trackingData.communicationLogs}
                  onSendMessage={handleSendMessage}
                />
              </div>

              <MaintenanceAlerts
                alerts={trackingData.maintenanceAlerts}
                onAlertClick={handleAlertClick}
              />

              <EmergencyControls
                controls={trackingData.emergencyControls}
                onControlActivate={handleControlActivate}
              />
            </div>
          </div>
        </div>
      </main>

      <QuickActionToolbar
        context="vehicle"
        onActionClick={handleQuickAction}
      />
    </div>
  );
};

export default VehicleTracking;