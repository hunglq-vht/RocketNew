import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { FlightFilter } from '../types';

interface FlightFilterPanelProps {
  filter: FlightFilter;
  onFilterChange: (filter: FlightFilter) => void;
  resultCount: number;
}

const FlightFilterPanel = ({ filter, onFilterChange, resultCount }: FlightFilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'pending-approval', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'delayed', label: 'Delayed' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'routine', label: 'Routine' },
    { value: 'priority', label: 'Priority' },
    { value: 'emergency', label: 'Emergency' }
  ];

  const airspaceZoneOptions = [
    { value: 'all', label: 'All Zones' },
    { value: 'zone-a', label: 'Zone A - Metropolitan' },
    { value: 'zone-b', label: 'Zone B - Suburban' },
    { value: 'zone-c', label: 'Zone C - Rural' },
    { value: 'zone-d', label: 'Zone D - Restricted' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      searchQuery: e.target.value
    });
  };

  const handleStatusChange = (value: string | number) => {
    onFilterChange({
      ...filter,
      status: value === 'all' ? [] : [value as string]
    });
  };

  const handlePriorityChange = (value: string | number) => {
    onFilterChange({
      ...filter,
      priority: value === 'all' ? [] : [value as string]
    });
  };

  const handleZoneChange = (value: string | number) => {
    onFilterChange({
      ...filter,
      airspaceZone: value as string
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      dateRange: { start: null, end: null },
      operator: '',
      status: [],
      airspaceZone: 'all',
      priority: [],
      searchQuery: ''
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} strokeWidth={2} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filter Flights</h3>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
            {resultCount} results
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors duration-150"
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} strokeWidth={2} />
        </button>
      </div>

      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search flights..."
            value={filter.searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />

          <Select
            options={statusOptions}
            value={filter.status.length > 0 ? filter.status[0] : 'all'}
            onChange={handleStatusChange}
            placeholder="Filter by status"
          />

          <Select
            options={priorityOptions}
            value={filter.priority.length > 0 ? filter.priority[0] : 'all'}
            onChange={handlePriorityChange}
            placeholder="Filter by priority"
          />

          <Select
            options={airspaceZoneOptions}
            value={filter.airspaceZone}
            onChange={handleZoneChange}
            placeholder="Filter by zone"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {resultCount} flight{resultCount !== 1 ? 's' : ''}
          </p>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightFilterPanel;