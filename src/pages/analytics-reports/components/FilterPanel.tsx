import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const FilterPanel = ({ filters, onFiltersChange, onApplyFilters, onResetFilters }: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const operatorOptions = [
    { value: 'all', label: 'All Operators' },
    { value: 'skyfleet', label: 'SkyFleet Operations' },
    { value: 'aerotech', label: 'AeroTech Services' },
    { value: 'dronelogix', label: 'DroneLogix Inc' }
  ];

  const vehicleTypeOptions = [
    { value: 'all', label: 'All Vehicle Types' },
    { value: 'quadcopter', label: 'Quadcopter' },
    { value: 'fixed-wing', label: 'Fixed-Wing' },
    { value: 'hybrid', label: 'Hybrid VTOL' }
  ];

  const zoneOptions = [
    { value: 'all', label: 'All Zones' },
    { value: 'zone-a', label: 'Zone A - Commercial' },
    { value: 'zone-b', label: 'Zone B - Industrial' },
    { value: 'zone-c', label: 'Zone C - Restricted' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} strokeWidth={2} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Operator"
              options={operatorOptions}
              value={filters.operators[0] || 'all'}
              onChange={(value) => onFiltersChange({ ...filters, operators: [value as string] })}
            />

            <Select
              label="Vehicle Type"
              options={vehicleTypeOptions}
              value={filters.vehicleTypes[0] || 'all'}
              onChange={(value) => onFiltersChange({ ...filters, vehicleTypes: [value as string] })}
            />

            <Select
              label="Airspace Zone"
              options={zoneOptions}
              value={filters.airspaceZones[0] || 'all'}
              onChange={(value) => onFiltersChange({ ...filters, airspaceZones: [value as string] })}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  value={filters.timeRange.startDate.toISOString().split('T')[0]}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    timeRange: { ...filters.timeRange, startDate: new Date(e.target.value) }
                  })}
                />
                <Input
                  type="date"
                  value={filters.timeRange.endDate.toISOString().split('T')[0]}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    timeRange: { ...filters.timeRange, endDate: new Date(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              iconName="Check"
              iconPosition="left"
              onClick={onApplyFilters}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={onResetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;