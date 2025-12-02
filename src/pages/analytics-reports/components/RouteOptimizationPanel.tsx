import Icon from '../../../components/AppIcon';
import { RouteOptimization } from '../types';

interface RouteOptimizationPanelProps {
  optimizations: RouteOptimization[];
}

const RouteOptimizationPanel = ({ optimizations }: RouteOptimizationPanelProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Route Optimization</h3>
          <p className="text-sm text-muted-foreground">Efficiency improvement recommendations</p>
        </div>
        <Icon name="Route" size={24} strokeWidth={2} className="text-primary" />
      </div>

      <div className="space-y-4">
        {optimizations.map((opt) => (
          <div key={opt.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-150">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{opt.routeName}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{opt.recommendation}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Current</p>
                  <p className="text-sm font-semibold text-foreground">{opt.currentEfficiency}%</p>
                </div>
                <Icon name="ArrowRight" size={16} strokeWidth={2} className="text-muted-foreground" />
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Optimized</p>
                  <p className="text-sm font-semibold text-success">{opt.optimizedEfficiency}%</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Potential Savings</span>
              <span className="text-sm font-semibold text-success">{opt.potentialSavings}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteOptimizationPanel;