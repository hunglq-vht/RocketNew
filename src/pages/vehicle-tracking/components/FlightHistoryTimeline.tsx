import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { FlightHistoryPoint } from '../types';

interface FlightHistoryTimelineProps {
  history: FlightHistoryPoint[];
}

const FlightHistoryTimeline = ({ history }: FlightHistoryTimelineProps) => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const getEventIcon = (eventType?: string) => {
    switch (eventType) {
      case 'waypoint':
        return 'MapPin';
      case 'altitude-change':
        return 'TrendingUp';
      case 'deviation':
        return 'AlertTriangle';
      case 'communication':
        return 'Radio';
      default:
        return 'Circle';
    }
  };

  const getEventColor = (eventType?: string) => {
    switch (eventType) {
      case 'waypoint':
        return 'text-primary';
      case 'altitude-change':
        return 'text-accent';
      case 'deviation':
        return 'text-warning';
      case 'communication':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="Clock" size={16} strokeWidth={2} className="text-primary" />
          Flight History Timeline
        </h3>
        <span className="text-xs text-muted-foreground">{history.length} events</span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {history.map((point, index) => (
          <div key={index} className="relative">
            <div
              className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-150 cursor-pointer ${
                expandedEvent === index ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50 hover:bg-muted'
              }`}
              onClick={() => setExpandedEvent(expandedEvent === index ? null : index)}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                point.eventType ? 'bg-background border-2 border-current' : 'bg-muted'
              } ${getEventColor(point.eventType)}`}>
                <Icon name={getEventIcon(point.eventType)} size={16} strokeWidth={2} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-medium text-foreground">
                    {point.event || 'Position Update'}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {formatTime(point.timestamp)}
                  </span>
                </div>

                {expandedEvent === index && (
                  <div className="mt-2 pt-2 border-t border-border space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Latitude:</span>
                      <span className="font-mono text-foreground">{point.position.latitude.toFixed(6)}°</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Longitude:</span>
                      <span className="font-mono text-foreground">{point.position.longitude.toFixed(6)}°</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Altitude:</span>
                      <span className="font-mono text-foreground">{point.position.altitude} ft</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Heading:</span>
                      <span className="font-mono text-foreground">{point.position.heading}°</span>
                    </div>
                  </div>
                )}
              </div>

              <Icon
                name={expandedEvent === index ? 'ChevronUp' : 'ChevronDown'}
                size={16}
                strokeWidth={2}
                className="text-muted-foreground flex-shrink-0"
              />
            </div>

            {index < history.length - 1 && (
              <div className="absolute left-7 top-14 w-0.5 h-3 bg-border"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightHistoryTimeline;