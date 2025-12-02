import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PredictiveAnalytics } from '../types';

interface PredictiveAnalyticsChartProps {
  data: PredictiveAnalytics[];
}

const PredictiveAnalyticsChart = ({ data }: PredictiveAnalyticsChartProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Predictive Analytics</h3>
        <p className="text-sm text-muted-foreground">Forecasted traffic patterns and capacity planning</p>
      </div>
      
      <div className="w-full h-80" aria-label="Predictive Analytics Area Chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorFlights" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorCapacity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
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
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area 
              type="monotone" 
              dataKey="predictedFlights" 
              stroke="var(--color-primary)" 
              fillOpacity={1} 
              fill="url(#colorFlights)"
              name="Predicted Flights"
            />
            <Area 
              type="monotone" 
              dataKey="capacityUtilization" 
              stroke="var(--color-accent)" 
              fillOpacity={1} 
              fill="url(#colorCapacity)"
              name="Capacity %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PredictiveAnalyticsChart;