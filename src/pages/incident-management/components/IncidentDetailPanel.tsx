import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Incident, IncidentSeverity, IncidentStatus } from '../types';

interface IncidentDetailPanelProps {
  incident: Incident | null;
  onClose: () => void;
  onEscalate?: (incidentId: string) => void;
  onResolve?: (incidentId: string) => void;
}

const IncidentDetailPanel = ({ incident, onClose, onEscalate, onResolve }: IncidentDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'evidence' | 'response'>('overview');

  if (!incident) return null;

  const getSeverityColor = (severity: IncidentSeverity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
      case 'active':
        return 'bg-error/10 text-error border-error/20';
      case 'investigating':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'resolved':
        return 'bg-success/10 text-success border-success/20';
      case 'closed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'evidence', label: 'Evidence', icon: 'FileText' },
    { id: 'response', label: 'Response Team', icon: 'Users' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-[1300] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background border border-border rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                {incident.severity.toUpperCase()}
              </span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(incident.status)}`}>
                {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{incident.title}</h2>
              <p className="text-xs text-muted-foreground">Incident ID: {incident.id}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors duration-150"
            aria-label="Close panel"
          >
            <Icon name="X" size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="border-b border-border">
          <div className="flex items-center gap-2 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-150 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} strokeWidth={2} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{incident.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Location Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Icon name="MapPin" size={16} strokeWidth={2} className="text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-foreground">{incident.location.address}</p>
                        <p className="text-xs text-muted-foreground">Zone: {incident.location.zone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Navigation" size={16} strokeWidth={2} className="text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {incident.location.latitude.toFixed(6)}, {incident.location.longitude.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Incident Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} strokeWidth={2} className="text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {incident.timestamp.toLocaleString('en-US', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} strokeWidth={2} className="text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Reported by: {incident.reportedBy}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Plane" size={16} strokeWidth={2} className="text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {incident.affectedVehicles.length} vehicle{incident.affectedVehicles.length !== 1 ? 's' : ''} affected
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {incident.weatherConditions && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Weather Conditions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Thermometer" size={16} strokeWidth={2} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Temperature</p>
                        <p className="text-sm font-medium text-foreground">{incident.weatherConditions.temperature}°C</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Wind" size={16} strokeWidth={2} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Wind Speed</p>
                        <p className="text-sm font-medium text-foreground">{incident.weatherConditions.windSpeed} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Eye" size={16} strokeWidth={2} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Visibility</p>
                        <p className="text-sm font-medium text-foreground">{incident.weatherConditions.visibility} km</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Cloud" size={16} strokeWidth={2} className="text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Conditions</p>
                        <p className="text-sm font-medium text-foreground">{incident.weatherConditions.conditions}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Affected Vehicles</h3>
                <div className="flex flex-wrap gap-2">
                  {incident.affectedVehicles.map((vehicleId) => (
                    <span
                      key={vehicleId}
                      className="inline-flex items-center px-3 py-1.5 bg-muted rounded-md text-xs font-medium text-foreground"
                    >
                      {vehicleId}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Map Location</h3>
                <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title={incident.location.address}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${incident.location.latitude},${incident.location.longitude}&z=14&output=embed`}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {incident.timeline.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      event.automated ? 'bg-primary/10' : 'bg-accent/10'
                    }`}>
                      <Icon 
                        name={event.automated ? 'Cpu' : 'User'} 
                        size={16} 
                        strokeWidth={2} 
                        className={event.automated ? 'text-primary' : 'text-accent'}
                      />
                    </div>
                    {index < incident.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-medium text-foreground">{event.event}</p>
                      <span className="text-xs text-muted-foreground">
                        {event.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.automated ? 'Automated System' : event.actor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-6">
              {incident.evidence.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {incident.evidence.map((item) => (
                    <div key={item.id} className="bg-card border border-border rounded-lg p-4">
                      {item.type === 'photo' && (
                        <div className="w-full h-48 bg-muted rounded-lg overflow-hidden mb-3">
                          <Image
                            src={item.url}
                            alt={item.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon 
                            name={item.type === 'photo' ? 'Image' : item.type === 'video' ? 'Video' : 'FileText'} 
                            size={20} 
                            strokeWidth={2} 
                            className="text-primary"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground mb-1">{item.description}</p>
                          <p className="text-xs text-muted-foreground mb-1">
                            Uploaded by {item.uploadedBy}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.uploadedAt.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Icon name="FileText" size={32} strokeWidth={2} className="text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">No evidence uploaded</p>
                  <p className="text-xs text-muted-foreground">Evidence will appear here once uploaded</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'response' && (
            <div className="space-y-4">
              {incident.responseTeam.map((member) => (
                <div key={member.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} strokeWidth={2} className="text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                      member.status === 'on-scene' ? 'bg-success/10 text-success' :
                      member.status === 'dispatched' ? 'bg-warning/10 text-warning' :
                      member.status === 'resolved'? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" size={16} strokeWidth={2} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{member.contactNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} strokeWidth={2} className="text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Assigned {member.assignedAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {member.arrivedAt && (
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" size={16} strokeWidth={2} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Arrived {member.arrivedAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center gap-2">
            {incident.regulatoryNotifications.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="FileCheck" size={16} strokeWidth={2} />
                <span>{incident.regulatoryNotifications.length} regulatory notification{incident.regulatoryNotifications.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {incident.status === 'active' && onEscalate && (
              <Button
                variant="warning"
                onClick={() => onEscalate(incident.id)}
                iconName="AlertTriangle"
                iconSize={16}
              >
                Escalate
              </Button>
            )}
            {(incident.status === 'active' || incident.status === 'investigating') && onResolve && (
              <Button
                variant="success"
                onClick={() => onResolve(incident.id)}
                iconName="CheckCircle"
                iconSize={16}
              >
                Mark Resolved
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailPanel;