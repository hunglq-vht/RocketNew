import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { HeatMapData } from '../types';

interface TrafficHeatMapProps {
  data: HeatMapData[];
}

const TrafficHeatMap = ({ data }: TrafficHeatMapProps) => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return 'bg-error';
    if (intensity >= 60) return 'bg-warning';
    if (intensity >= 40) return 'bg-accent';
    return 'bg-success';
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity >= 80) return 'Critical';
    if (intensity >= 60) return 'High';
    if (intensity >= 40) return 'Moderate';
    return 'Low';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Traffic Heat Map</h3>
          <p className="text-sm text-muted-foreground">Congestion patterns by airspace zone</p>
        </div>
        <Icon name="Map" size={24} strokeWidth={2} className="text-primary" />
      </div>

      <div className="mb-6">
        <iframe
          width="100%"
          height="400"
          loading="lazy"
          title="Airspace Traffic Heat Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=11&output=embed"
          className="rounded-lg border border-border"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Intensity Legend</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-xs text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <span className="text-xs text-muted-foreground">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-xs text-muted-foreground">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-error rounded-full" />
              <span className="text-xs text-muted-foreground">Critical</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.map((zone) => (
            <button
              key={zone.zone}
              type="button"
              onClick={() => setSelectedZone(zone.zone)}
              className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-150 ${
                selectedZone === zone.zone
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getIntensityColor(zone.intensity)}`} />
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm">{zone.zone}</p>
                  <p className="text-xs text-muted-foreground">{zone.flightCount} flights</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{zone.intensity}%</p>
                <p className="text-xs text-muted-foreground">{getIntensityLabel(zone.intensity)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficHeatMap;