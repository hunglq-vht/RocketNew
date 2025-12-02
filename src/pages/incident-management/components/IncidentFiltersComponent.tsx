import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { IncidentFilters, IncidentSeverity, IncidentStatus, IncidentType } from '../types';

interface IncidentFiltersProps {
  filters: IncidentFilters;
  onFiltersChange: (filters: IncidentFilters) => void;
  onReset: () => void;
}

const IncidentFiltersComponent = ({ filters, onFiltersChange, onReset }: IncidentFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const typeOptions = [
    { value: 'collision-risk', label: 'Collision Risk' },
    { value: 'unauthorized-entry', label: 'Unauthorized Entry' },
    { value: 'equipment-failure', label: 'Equipment Failure' },
    { value: 'weather-emergency', label: 'Weather Emergency' },
    { value: 'communication-loss', label: 'Communication Loss' },
    { value: 'medical-emergency', label: 'Medical Emergency' },
    { value: 'security-breach', label: 'Security Breach' },
    { value: 'other', label: 'Other' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchQuery: e.target.value
    });
  };

  const handleSeverityChange = (values: (string | number)[]) => {
    onFiltersChange({
      ...filters,
      severity: values as IncidentSeverity[]
    });
  };

  const handleStatusChange = (values: (string | number)[]) => {
    onFiltersChange({
      ...filters,
      status: values as IncidentStatus[]
    });
  };

  const handleTypeChange = (values: (string | number)[]) => {
    onFiltersChange({
      ...filters,
      type: values as IncidentType[]
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} strokeWidth={2} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            iconName="RotateCcw"
            iconSize={16}
          >
            Reset
          </Button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors duration-150"
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <Input
          type="search"
          placeholder="Search incidents..."
          value={filters.searchQuery}
          onChange={handleSearchChange}
          className="w-full"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Select
            label="Severity"
            options={severityOptions}
            value={filters.severity}
            onChange={handleSeverityChange}
            multiple
            searchable
            clearable
            placeholder="All severities"
          />

          <Select
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={handleStatusChange}
            multiple
            searchable
            clearable
            placeholder="All statuses"
          />

          <Select
            label="Type"
            options={typeOptions}
            value={filters.type}
            onChange={handleTypeChange}
            multiple
            searchable
            clearable
            placeholder="All types"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Start Date"
            value={filters.dateRange.start ? filters.dateRange.start.toISOString().split('T')[0] : ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              dateRange: {
                ...filters.dateRange,
                start: e.target.value ? new Date(e.target.value) : null
              }
            })}
          />

          <Input
            type="date"
            label="End Date"
            value={filters.dateRange.end ? filters.dateRange.end.toISOString().split('T')[0] : ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              dateRange: {
                ...filters.dateRange,
                end: e.target.value ? new Date(e.target.value) : null
              }
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default IncidentFiltersComponent;