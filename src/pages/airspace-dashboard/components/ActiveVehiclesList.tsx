import { FC, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

import { AerialVehicle } from '../types';

interface ActiveVehiclesListProps {
  vehicles: AerialVehicle[];
  onVehicleSelect: (vehicleId: string) => void;
}

const ActiveVehiclesList: FC<ActiveVehiclesListProps> = ({
  vehicles,
  onVehicleSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'idle':
        return 'text-warning';
      case 'emergency':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return 'CheckCircle2';
      case 'idle':
        return 'Clock';
      case 'emergency':
        return 'AlertOctagon';
      default:
        return 'Circle';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'drone':
        return 'Plane';
      case 'uav':
        return 'Navigation';
      case 'helicopter':
        return 'Plane';
      default:
        return 'Plane';
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.callSign.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.operator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || vehicle.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Radio" size={20} strokeWidth={2} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Active Vehicles</h2>
            <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs font-medium">
              {vehicles.length}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Icon
              name="Search"
              size={16}
              strokeWidth={2}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search by call sign or operator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="idle">Idle</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Icon name="Search" size={32} strokeWidth={2} className="text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground mb-2">No Vehicles Found</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          filteredVehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              type="button"
              onClick={() => onVehicleSelect(vehicle.id)}
              className="w-full bg-background border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all duration-150 text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {vehicle.callSign}
                    </h3>
                    <Icon
                      name={getStatusIcon(vehicle.status)}
                      size={14}
                      strokeWidth={2}
                      className={getStatusColor(vehicle.status)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Icon name={getTypeIcon(vehicle.type)} size={12} strokeWidth={2} />
                    <span className="capitalize">{vehicle.type}</span>
                    <span>•</span>
                    <span>{vehicle.operator}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Icon name="Navigation" size={12} strokeWidth={2} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Alt:</span>
                      <span className="font-medium text-foreground">{vehicle.position.altitude}ft</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Gauge" size={12} strokeWidth={2} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Speed:</span>
                      <span className="font-medium text-foreground">{vehicle.speed}kts</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Battery" size={12} strokeWidth={2} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Battery:</span>
                      <span className={`font-medium ${vehicle.battery < 20 ? 'text-error' : 'text-foreground'}`}>
                        {vehicle.battery}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Compass" size={12} strokeWidth={2} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Heading:</span>
                      <span className="font-medium text-foreground">{vehicle.heading}°</span>
                    </div>
                  </div>
                </div>

                <Icon name="ChevronRight" size={20} strokeWidth={2} className="text-muted-foreground flex-shrink-0" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveVehiclesList;