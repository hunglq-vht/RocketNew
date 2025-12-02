import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrafficPattern } from '../types';

interface TrafficDensityChartProps {
  data: TrafficPattern[];
}

const TrafficDensityChart = ({ data }: TrafficDensityChartProps) => {
  const chartData = data.map(pattern => ({
    hour: `${pattern.hour.toString().padStart(2, '0')}:00`,
    density: pattern.density,
    flights: pattern.flights
  }));

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Traffic Density Patterns</h3>
        <p className="text-sm text-muted-foreground">Hourly flight activity and airspace utilization</p>
      </div>
      
      <div className="w-full h-80" aria-label="Traffic Density Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="hour" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar dataKey="flights" fill="var(--color-primary)" name="Flight Count" radius={[4, 4, 0, 0]} />
            <Bar dataKey="density" fill="var(--color-accent)" name="Density %" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficDensityChart;