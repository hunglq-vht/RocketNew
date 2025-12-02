import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { IncidentType, IncidentSeverity } from '../types';

interface CreateIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (incidentData: CreateIncidentData) => void;
}

interface CreateIncidentData {
  type: IncidentType;
  severity: IncidentSeverity;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    zone: string;
  };
  affectedVehicles: string[];
}

const CreateIncidentModal = ({ isOpen, onClose, onCreate }: CreateIncidentModalProps) => {
  const [formData, setFormData] = useState<CreateIncidentData>({
    type: 'other',
    severity: 'medium',
    title: '',
    description: '',
    location: {
      latitude: 0,
      longitude: 0,
      address: '',
      zone: ''
    },
    affectedVehicles: []
  });

  const [vehicleInput, setVehicleInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const severityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.location.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.location.zone.trim()) {
      newErrors.zone = 'Zone is required';
    }

    if (formData.affectedVehicles.length === 0) {
      newErrors.vehicles = 'At least one vehicle must be specified';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onCreate(formData);
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      type: 'other',
      severity: 'medium',
      title: '',
      description: '',
      location: {
        latitude: 0,
        longitude: 0,
        address: '',
        zone: ''
      },
      affectedVehicles: []
    });
    setVehicleInput('');
    setErrors({});
  };

  const handleAddVehicle = () => {
    if (vehicleInput.trim() && !formData.affectedVehicles.includes(vehicleInput.trim())) {
      setFormData({
        ...formData,
        affectedVehicles: [...formData.affectedVehicles, vehicleInput.trim()]
      });
      setVehicleInput('');
      if (errors.vehicles) {
        setErrors({ ...errors, vehicles: '' });
      }
    }
  };

  const handleRemoveVehicle = (vehicleId: string) => {
    setFormData({
      ...formData,
      affectedVehicles: formData.affectedVehicles.filter(v => v !== vehicleId)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[1300] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background border border-border rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} strokeWidth={2} className="text-error" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Report New Incident</h2>
              <p className="text-xs text-muted-foreground">Document and initiate emergency response</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors duration-150"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Incident Type"
                required
                options={typeOptions}
                value={formData.type}
                onChange={(value) => setFormData({ ...formData, type: value as IncidentType })}
              />

              <Select
                label="Severity Level"
                required
                options={severityOptions}
                value={formData.severity}
                onChange={(value) => setFormData({ ...formData, severity: value as IncidentSeverity })}
              />
            </div>

            <Input
              label="Incident Title"
              type="text"
              required
              placeholder="Brief description of the incident"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={errors.title}
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Detailed Description <span className="text-error">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Provide comprehensive details about the incident..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-error">{errors.description}</p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Location Information</h3>
              
              <Input
                label="Address"
                type="text"
                required
                placeholder="Street address or landmark"
                value={formData.location.address}
                onChange={(e) => setFormData({
                  ...formData,
                  location: { ...formData.location, address: e.target.value }
                })}
                error={errors.address}
              />

              <Input
                label="Airspace Zone"
                type="text"
                required
                placeholder="e.g., Zone A-12, Sector North"
                value={formData.location.zone}
                onChange={(e) => setFormData({
                  ...formData,
                  location: { ...formData.location, zone: e.target.value }
                })}
                error={errors.zone}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Latitude"
                  type="number"
                  step="0.000001"
                  placeholder="0.000000"
                  value={formData.location.latitude || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, latitude: parseFloat(e.target.value) || 0 }
                  })}
                />

                <Input
                  label="Longitude"
                  type="number"
                  step="0.000001"
                  placeholder="0.000000"
                  value={formData.location.longitude || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, longitude: parseFloat(e.target.value) || 0 }
                  })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Affected Vehicles</h3>
              
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter vehicle ID (e.g., UAV-001)"
                  value={vehicleInput}
                  onChange={(e) => setVehicleInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddVehicle();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddVehicle}
                  iconName="Plus"
                  iconSize={16}
                >
                  Add
                </Button>
              </div>

              {errors.vehicles && (
                <p className="text-xs text-error">{errors.vehicles}</p>
              )}

              {formData.affectedVehicles.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.affectedVehicles.map((vehicleId) => (
                    <div
                      key={vehicleId}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md text-xs font-medium text-foreground"
                    >
                      <span>{vehicleId}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveVehicle(vehicleId)}
                        className="hover:text-error transition-colors duration-150"
                        aria-label={`Remove ${vehicleId}`}
                      >
                        <Icon name="X" size={14} strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleSubmit}
            iconName="AlertTriangle"
            iconSize={16}
          >
            Report Incident
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateIncidentModal;