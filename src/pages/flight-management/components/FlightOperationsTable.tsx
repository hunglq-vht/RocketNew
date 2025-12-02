import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { FlightPlan } from '../types';

interface FlightOperationsTableProps {
  flights: FlightPlan[];
  onViewDetails: (flightId: string) => void;
  onTrackVehicle: (vehicleId: string) => void;
}

const FlightOperationsTable = ({ flights, onViewDetails, onTrackVehicle }: FlightOperationsTableProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedFlights, setSelectedFlights] = useState<Set<string>>(new Set());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'scheduled':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'pending-approval':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'approved':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      case 'delayed':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activity';
      case 'scheduled':
        return 'Calendar';
      case 'pending-approval':
        return 'Clock';
      case 'approved':
        return 'CheckCircle2';
      case 'completed':
        return 'CheckCircle';
      case 'cancelled':
        return 'XCircle';
      case 'delayed':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const handleSelectFlight = (flightId: string) => {
    setSelectedFlights((prev) => {
      const updated = new Set(prev);
      if (updated.has(flightId)) {
        updated.delete(flightId);
      } else {
        updated.add(flightId);
      }
      return updated;
    });
  };

  const handleSelectAll = () => {
    if (selectedFlights.size === flights.length) {
      setSelectedFlights(new Set());
    } else {
      setSelectedFlights(new Set(flights.map((f) => f.id)));
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <div className="hidden lg:block">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedFlights.size === flights.length && flights.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                    aria-label="Select all flights"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Operator
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Vehicle ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Route
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Departure
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {flights.map((flight) => (
                <tr
                  key={flight.id}
                  className="hover:bg-muted/30 transition-colors duration-150"
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedFlights.has(flight.id)}
                      onChange={() => handleSelectFlight(flight.id)}
                      className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                      aria-label={`Select flight ${flight.id}`}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={flight.operator.avatar}
                        alt={flight.operator.avatarAlt}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{flight.operator.name}</p>
                        <p className="text-xs text-muted-foreground">{flight.operator.organization}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-foreground">{flight.vehicle.registrationNumber}</p>
                    <p className="text-xs text-muted-foreground">{flight.vehicle.model}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-foreground">{flight.route.origin.name}</p>
                      <Icon name="ArrowRight" size={14} strokeWidth={2} className="text-muted-foreground" />
                      <p className="text-sm text-foreground">{flight.route.destination.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{flight.route.distance} km</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 border rounded text-xs font-medium ${getStatusColor(flight.status)}`}>
                      <Icon name={getStatusIcon(flight.status)} size={12} strokeWidth={2} />
                      {flight.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-foreground">
                      {flight.scheduledDeparture.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {flight.scheduledDeparture.toLocaleTimeString()}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-foreground">
                      {formatDuration(flight.route.estimatedDuration)}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onViewDetails(flight.id)}
                        className="p-2 hover:bg-muted rounded-md transition-colors duration-150"
                        title="View flight details"
                        aria-label="View flight details"
                      >
                        <Icon name="Eye" size={16} strokeWidth={2} className="text-muted-foreground" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onTrackVehicle(flight.vehicle.id)}
                        className="p-2 hover:bg-muted rounded-md transition-colors duration-150"
                        title="Track vehicle"
                        aria-label="Track vehicle"
                      >
                        <Icon name="Navigation" size={16} strokeWidth={2} className="text-muted-foreground" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setExpandedRow(expandedRow === flight.id ? null : flight.id)}
                        className="p-2 hover:bg-muted rounded-md transition-colors duration-150"
                        aria-label={expandedRow === flight.id ? 'Collapse details' : 'Expand details'}
                      >
                        <Icon
                          name={expandedRow === flight.id ? 'ChevronUp' : 'ChevronDown'}
                          size={16}
                          strokeWidth={2}
                          className="text-muted-foreground"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden space-y-4 p-4">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedFlights.has(flight.id)}
                    onChange={() => handleSelectFlight(flight.id)}
                    className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring mt-1"
                    aria-label={`Select flight ${flight.id}`}
                  />
                  <Image
                    src={flight.operator.avatar}
                    alt={flight.operator.avatarAlt}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{flight.operator.name}</p>
                    <p className="text-xs text-muted-foreground">{flight.operator.organization}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 border rounded text-xs font-medium ${getStatusColor(flight.status)}`}>
                  <Icon name={getStatusIcon(flight.status)} size={12} strokeWidth={2} />
                  {flight.status.replace('-', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vehicle</p>
                  <p className="text-sm font-medium text-foreground">{flight.vehicle.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatDuration(flight.route.estimatedDuration)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Route</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-foreground">{flight.route.origin.name}</p>
                  <Icon name="ArrowRight" size={14} strokeWidth={2} className="text-muted-foreground" />
                  <p className="text-sm text-foreground">{flight.route.destination.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => onViewDetails(flight.id)}
                  fullWidth
                >
                  Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Navigation"
                  iconPosition="left"
                  onClick={() => onTrackVehicle(flight.vehicle.id)}
                  fullWidth
                >
                  Track
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFlights.size > 0 && (
        <div className="bg-primary/10 border-t border-primary/20 px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-primary">
              {selectedFlights.size} flight{selectedFlights.size !== 1 ? 's' : ''} selected
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                Export
              </Button>
              <Button variant="outline" size="sm" iconName="Trash2" iconPosition="left">
                Cancel Selected
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightOperationsTable;