import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import { FlightPlan } from '../types';

interface AuthorizationPanelProps {
  pendingFlights: FlightPlan[];
  onApprove: (flightId: string, notes: string) => void;
  onDeny: (flightId: string, reason: string) => void;
}

const AuthorizationPanel = ({ pendingFlights, onApprove, onDeny }: AuthorizationPanelProps) => {
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);
  const [actionNotes, setActionNotes] = useState<Record<string, string>>({});

  const handleApprove = (flightId: string) => {
    onApprove(flightId, actionNotes[flightId] || '');
    setActionNotes((prev) => {
      const updated = { ...prev };
      delete updated[flightId];
      return updated;
    });
    setExpandedFlight(null);
  };

  const handleDeny = (flightId: string) => {
    if (actionNotes[flightId]) {
      onDeny(flightId, actionNotes[flightId]);
      setActionNotes((prev) => {
        const updated = { ...prev };
        delete updated[flightId];
        return updated;
      });
      setExpandedFlight(null);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency':
        return 'bg-error/10 text-error border-error/20';
      case 'priority':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'routine':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (pendingFlights.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle2" size={32} strokeWidth={2} className="text-success" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">All Caught Up!</h3>
        <p className="text-sm text-muted-foreground">
          No pending flight authorizations at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Shield" size={20} strokeWidth={2} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Pending Authorizations</h3>
        <span className="px-2 py-1 bg-warning/10 text-warning text-xs font-medium rounded">
          {pendingFlights.length} pending
        </span>
      </div>

      <div className="space-y-4">
        {pendingFlights.map((flight) => (
          <div
            key={flight.id}
            className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-150"
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <Image
                    src={flight.operator.avatar}
                    alt={flight.operator.avatarAlt}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">{flight.operator.name}</h4>
                      <span className={`px-2 py-0.5 border rounded text-xs font-medium ${getPriorityColor(flight.priority)}`}>
                        {flight.priority}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{flight.operator.organization}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedFlight(expandedFlight === flight.id ? null : flight.id)}
                  className="p-2 hover:bg-muted rounded-md transition-colors duration-150"
                  aria-label={expandedFlight === flight.id ? 'Collapse details' : 'Expand details'}
                >
                  <Icon
                    name={expandedFlight === flight.id ? 'ChevronUp' : 'ChevronDown'}
                    size={20}
                    strokeWidth={2}
                  />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Flight ID</p>
                  <p className="text-sm font-medium text-foreground">{flight.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vehicle</p>
                  <p className="text-sm font-medium text-foreground">{flight.vehicle.model}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Route</p>
                  <p className="text-sm font-medium text-foreground">
                    {flight.route.origin.name} → {flight.route.destination.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Departure</p>
                  <p className="text-sm font-medium text-foreground">
                    {flight.scheduledDeparture.toLocaleString()}
                  </p>
                </div>
              </div>

              {expandedFlight === flight.id && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Purpose</p>
                      <p className="text-sm text-foreground">{flight.purpose}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Altitude</p>
                      <p className="text-sm text-foreground">{flight.altitude} ft</p>
                    </div>
                  </div>

                  {flight.restrictions.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Restrictions</p>
                      <div className="flex flex-wrap gap-2">
                        {flight.restrictions.map((restriction, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-warning/10 text-warning text-xs rounded border border-warning/20"
                          >
                            {restriction}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor={`notes-${flight.id}`} className="text-xs text-muted-foreground mb-2 block">
                      Authorization Notes / Denial Reason
                    </label>
                    <textarea
                      id={`notes-${flight.id}`}
                      value={actionNotes[flight.id] || ''}
                      onChange={(e) =>
                        setActionNotes((prev) => ({
                          ...prev,
                          [flight.id]: e.target.value
                        }))
                      }
                      placeholder="Enter notes or reason..."
                      className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="success"
                      size="sm"
                      iconName="CheckCircle2"
                      iconPosition="left"
                      onClick={() => handleApprove(flight.id)}
                    >
                      Approve Flight
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      iconName="XCircle"
                      iconPosition="left"
                      onClick={() => handleDeny(flight.id)}
                      disabled={!actionNotes[flight.id]}
                    >
                      Deny Flight
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorizationPanel;