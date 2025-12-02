import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Incident, IncidentSeverity, IncidentStatus } from '../types';

interface IncidentTableProps {
  incidents: Incident[];
  onIncidentSelect: (incident: Incident) => void;
  selectedIncidentId?: string;
}

const IncidentTable = ({ incidents, onIncidentSelect, selectedIncidentId }: IncidentTableProps) => {
  const [sortField, setSortField] = useState<'timestamp' | 'severity'>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'collision-risk':
        return 'AlertTriangle';
      case 'unauthorized-entry':
        return 'ShieldAlert';
      case 'equipment-failure':
        return 'Wrench';
      case 'weather-emergency':
        return 'Cloud';
      case 'communication-loss':
        return 'WifiOff';
      case 'medical-emergency':
        return 'Heart';
      case 'security-breach':
        return 'Lock';
      default:
        return 'AlertCircle';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleSort = (field: 'timestamp' | 'severity') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedIncidents = [...incidents].sort((a, b) => {
    if (sortField === 'timestamp') {
      return sortDirection === 'asc' 
        ? a.timestamp.getTime() - b.timestamp.getTime()
        : b.timestamp.getTime() - a.timestamp.getTime();
    } else {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return sortDirection === 'asc'
        ? severityOrder[a.severity] - severityOrder[b.severity]
        : severityOrder[b.severity] - severityOrder[a.severity];
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  type="button"
                  onClick={() => handleSort('severity')}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors duration-150"
                >
                  Severity
                  <Icon 
                    name={sortField === 'severity' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    strokeWidth={2} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Incident
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  type="button"
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors duration-150"
                >
                  Time
                  <Icon 
                    name={sortField === 'timestamp' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                    strokeWidth={2} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedIncidents.map((incident) => (
              <tr
                key={incident.id}
                className={`hover:bg-muted/50 transition-colors duration-150 cursor-pointer ${
                  selectedIncidentId === incident.id ? 'bg-primary/5' : ''
                }`}
                onClick={() => onIncidentSelect(incident)}
              >
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                    {incident.severity.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Icon name={getTypeIcon(incident.type)} size={18} strokeWidth={2} className="text-muted-foreground" />
                    <span className="text-sm text-foreground capitalize">
                      {incident.type.replace('-', ' ')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{incident.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {incident.affectedVehicles.length} vehicle{incident.affectedVehicles.length !== 1 ? 's' : ''} affected
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-sm text-foreground">{incident.location.zone}</p>
                    <p className="text-xs text-muted-foreground">{incident.location.address}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(incident.status)}`}>
                    {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-sm text-foreground">{formatTimestamp(incident.timestamp)}</p>
                    <p className="text-xs text-muted-foreground">
                      {incident.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onIncidentSelect(incident);
                    }}
                    iconName="Eye"
                    iconSize={16}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {incidents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="AlertCircle" size={32} strokeWidth={2} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">No incidents found</p>
          <p className="text-xs text-muted-foreground">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
};

export default IncidentTable;