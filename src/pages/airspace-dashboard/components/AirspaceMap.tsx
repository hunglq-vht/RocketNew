import { FC, useState } from 'react';
import Icon from '../../../components/AppIcon';
import { AerialVehicle, RestrictedZone, MapLayer } from '../types';

interface AirspaceMapProps {
  vehicles: AerialVehicle[];
  zones: RestrictedZone[];
  layers: MapLayer[];
  onLayerToggle: (layerId: string) => void;
  onVehicleSelect: (vehicleId: string) => void;
}

const AirspaceMap: FC<AirspaceMapProps> = ({
  vehicles,
  zones,
  layers,
  onLayerToggle,
  onVehicleSelect
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [mapCenter] = useState({ lat: 28.6139, lng: 77.2090 });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'idle':
        return 'bg-warning';
      case 'emergency':
        return 'bg-error';
      default:
        return 'bg-muted';
    }
  };

  const getZoneColor = (type: string) => {
    switch (type) {
      case 'no-fly':
        return 'border-error bg-error/10';
      case 'restricted':
        return 'border-warning bg-warning/10';
      case 'temporary':
        return 'border-accent bg-accent/10';
      default:
        return 'border-muted bg-muted/10';
    }
  };

  const handleVehicleClick = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    onVehicleSelect(vehicleId);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="Map" size={20} strokeWidth={2} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Live Airspace View</h2>
        </div>
        <div className="flex items-center gap-2">
          {layers.map((layer) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => onLayerToggle(layer.id)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium
                transition-colors duration-150
                ${layer.visible
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              <Icon name={layer.icon} size={14} strokeWidth={2} />
              <span className="hidden sm:inline">{layer.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 relative bg-slate-100">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Airspace Map View"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=12&output=embed`}
          className="absolute inset-0"
        />

        <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-none">
          {zones.filter(z => z.active).map((zone) => (
            <div
              key={zone.id}
              className={`
                px-3 py-2 rounded-lg border-2 backdrop-blur-sm
                ${getZoneColor(zone.type)} pointer-events-auto
              `}
            >
              <div className="flex items-center gap-2">
                <Icon name="ShieldAlert" size={16} strokeWidth={2} />
                <span className="text-xs font-medium">{zone.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-4 right-4 max-h-48 overflow-y-auto pointer-events-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {vehicles.slice(0, 6).map((vehicle) => (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => handleVehicleClick(vehicle.id)}
                className={`
                  bg-card/95 backdrop-blur-sm border-2 rounded-lg p-3
                  transition-all duration-150 pointer-events-auto
                  ${selectedVehicle === vehicle.id
                    ? 'border-primary shadow-lg'
                    : 'border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(vehicle.status)} mt-1.5 animate-pulse`} />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {vehicle.callSign}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{(vehicle as any).altitude}ft</span>
                      <span>•</span>
                      <span>{vehicle.speed}kts</span>
                      <span>•</span>
                      <span>{vehicle.battery}%</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            type="button"
            className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors duration-150"
            title="Zoom in"
          >
            <Icon name="Plus" size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors duration-150"
            title="Zoom out"
          >
            <Icon name="Minus" size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors duration-150"
            title="Reset view"
          >
            <Icon name="Maximize2" size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AirspaceMap;