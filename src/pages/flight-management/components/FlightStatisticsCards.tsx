import Icon from '../../../components/AppIcon';
import { FlightStatistics } from '../types';

interface FlightStatisticsCardsProps {
  statistics: FlightStatistics;
}

const FlightStatisticsCards = ({ statistics }: FlightStatisticsCardsProps) => {
  const cards = [
    {
      id: 'total',
      label: 'Total Flights',
      value: statistics.totalFlights,
      icon: 'Plane',
      color: 'bg-primary',
      textColor: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'active',
      label: 'Active Flights',
      value: statistics.activeFlights,
      icon: 'Activity',
      color: 'bg-success',
      textColor: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'scheduled',
      label: 'Scheduled',
      value: statistics.scheduledFlights,
      icon: 'Calendar',
      color: 'bg-accent',
      textColor: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'pending',
      label: 'Pending Approvals',
      value: statistics.pendingApprovals,
      icon: 'Clock',
      color: 'bg-warning',
      textColor: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-150"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={card.icon} size={24} strokeWidth={2} className={card.textColor} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm text-muted-foreground">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightStatisticsCards;