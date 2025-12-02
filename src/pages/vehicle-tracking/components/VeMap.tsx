import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Position, FlightPath } from '../types';

interface VehicleMapProps {
  currentPosition: Position;
  flightPath: FlightPath;
  vehicleName: string;
  onMapInteraction?: (action: string) => void;
}

const VehicleMap = ({ currentPosition, flightPath, vehicleName, onMapInteraction }: VehicleMapProps) => {
  const [mapView, setMapView] = useState<'satellite' | 'terrain' | 'hybrid'>('satellite');
  const [showFlightPath, setShowFlightPath] = useState(true);
  const [showWeatherLayer, setShowWeatherLayer] = useState(false);

  const handleZoomIn = () => {
    if (onMapInteraction) onMapInteraction('zoom-in');
  };

  const handleZoomOut = () => {
    if (onMapInteraction) onMapInteraction('zoom-out');
  };

  const handleRecenter = () => {
    if (onMapInteraction) onMapInteraction('recenter');
  };

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title={`${vehicleName} Location Map`}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${currentPosition.latitude},${currentPosition.longitude}&z=14&output=embed`}
        className="absolute inset-0"
      />

      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-3 space-y-2">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Icon name="MapPin" size={16} strokeWidth={2} className="text-primary" />
          <span className="text-xs font-semibold text-foreground">Current Position</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">Latitude:</span>
            <span className="text-xs font-mono font-medium text-foreground">{currentPosition.latitude.toFixed(6)}°</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">Longitude:</span>
            <span className="text-xs font-mono font-medium text-foreground">{currentPosition.longitude.toFixed(6)}°</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">Altitude:</span>
            <span className="text-xs font-mono font-medium text-foreground">{currentPosition.altitude} ft</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">Heading:</span>
            <span className="text-xs font-mono font-medium text-foreground">{currentPosition.heading}°</span>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-10 h-10 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg flex items-center justify-center hover:bg-muted transition-colors duration-150"
          title="Zoom in"
        >
          <Icon name="Plus" size={20} strokeWidth={2} className="text-foreground" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="w-10 h-10 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg flex items-center justify-center hover:bg-muted transition-colors duration-150"
          title="Zoom out"
        >
          <Icon name="Minus" size={20} strokeWidth={2} className="text-foreground" />
        </button>
        <button
          type="button"
          onClick={handleRecenter}
          className="w-10 h-10 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg flex items-center justify-center hover:bg-muted transition-colors duration-150"
          title="Recenter on vehicle"
        >
          <Icon name="Crosshair" size={20} strokeWidth={2} className="text-foreground" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMapView('satellite')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
            mapView === 'satellite' ?'bg-primary text-primary-foreground' :'bg-card/95 backdrop-blur-sm border border-border text-foreground hover:bg-muted'
          }`}
        >
          Satellite
        </button>
        <button
          type="button"
          onClick={() => setMapView('terrain')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
            mapView === 'terrain' ?'bg-primary text-primary-foreground' :'bg-card/95 backdrop-blur-sm border border-border text-foreground hover:bg-muted'
          }`}
        >
          Terrain
        </button>
        <button
          type="button"
          onClick={() => setMapView('hybrid')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
            mapView === 'hybrid' ?'bg-primary text-primary-foreground' :'bg-card/95 backdrop-blur-sm border border-border text-foreground hover:bg-muted'
          }`}
        >
          Hybrid
        </button>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowFlightPath(!showFlightPath)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
            showFlightPath
              ? 'bg-primary text-primary-foreground'
              : 'bg-card/95 backdrop-blur-sm border border-border text-foreground hover:bg-muted'
          }`}
        >
          <Icon name="Route" size={14} strokeWidth={2} className="inline mr-1" />
          Flight Path
        </button>
        <button
          type="button"
          onClick={() => setShowWeatherLayer(!showWeatherLayer)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
            showWeatherLayer
              ? 'bg-primary text-primary-foreground'
              : 'bg-card/95 backdrop-blur-sm border border-border text-foreground hover:bg-muted'
          }`}
        >
          <Icon name="Cloud" size={14} strokeWidth={2} className="inline mr-1" />
          Weather
        </button>
      </div>

      {flightPath.status === 'active' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Icon name="Navigation" size={20} strokeWidth={2} className="text-primary-foreground" />
            </div>
            <div className="absolute inset-0 w-8 h-8 bg-primary rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleMap;