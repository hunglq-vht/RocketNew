import Icon from '../../../components/AppIcon';
import { Vehicle } from '../types';

interface VehicleInfoCardProps {
  vehicle: Vehicle;
}

const VehicleInfoCard = ({ vehicle }: VehicleInfoCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'idle':
        return 'bg-accent text-accent-foreground';
      case 'maintenance':
        return 'bg-warning text-warning-foreground';
      case 'emergency':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'drone':
        return 'Plane';
      case 'helicopter':
        return 'Plane';
      case 'fixed-wing':
        return 'Plane';
      default:
        return 'Plane';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name={getTypeIcon(vehicle.type)} size={24} strokeWidth={2} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-foreground mb-1">{vehicle.name}</h2>
            <p className="text-sm text-muted-foreground">ID: {vehicle.id}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(vehicle.status)}`}>
          {vehicle.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Tag" size={14} strokeWidth={2} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Type</span>
          </div>
          <span className="text-sm font-semibold text-foreground capitalize">{vehicle.type}</span>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="FileText" size={14} strokeWidth={2} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Registration</span>
          </div>
          <span className="text-sm font-semibold text-foreground font-mono">{vehicle.registration}</span>
        </div>

        <div className="col-span-2 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="User" size={14} strokeWidth={2} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Operator</span>
          </div>
          <span className="text-sm font-semibold text-foreground">{vehicle.operator}</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoCard;