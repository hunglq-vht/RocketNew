import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { EmergencyControl } from '../types';

interface EmergencyControlsProps {
  controls: EmergencyControl[];
  onControlActivate?: (controlId: string) => void;
}

const EmergencyControls = ({ controls, onControlActivate }: EmergencyControlsProps) => {
  const [confirmingControl, setConfirmingControl] = useState<string | null>(null);

  const handleControlClick = (control: EmergencyControl) => {
    if (control.requiresConfirmation) {
      setConfirmingControl(control.id);
    } else {
      if (onControlActivate) {
        onControlActivate(control.id);
      }
    }
  };

  const handleConfirm = (controlId: string) => {
    if (onControlActivate) {
      onControlActivate(controlId);
    }
    setConfirmingControl(null);
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Icon name="ShieldAlert" size={16} strokeWidth={2} className="text-error" />
            Emergency Controls
          </h3>
          <span className="text-xs text-error font-medium">Authorized Access Only</span>
        </div>

        <div className="space-y-3">
          {controls.map((control) => (
            <button
              key={control.id}
              type="button"
              onClick={() => handleControlClick(control)}
              className="w-full p-3 bg-error/10 hover:bg-error/20 border border-error/20 rounded-lg transition-all duration-150 text-left"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-error/20 rounded-full flex items-center justify-center">
                  <Icon name={control.icon} size={20} strokeWidth={2} className="text-error" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">{control.action}</span>
                    {control.requiresConfirmation && (
                      <span className="text-xs text-error font-medium">Requires Confirmation</span>
                    )}
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed">{control.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg">
            <Icon name="AlertTriangle" size={16} strokeWidth={2} className="text-warning flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground leading-relaxed">
              Emergency controls should only be used in critical situations. All actions are logged and require proper authorization.
            </p>
          </div>
        </div>
      </div>

      {confirmingControl && (
        <div className="fixed inset-0 bg-black/50 z-[1200] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-popover border border-border rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="AlertOctagon" size={28} strokeWidth={2} className="text-error" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Confirm Emergency Action
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You are about to activate an emergency control. This action will be logged and may have significant operational impact. Are you sure you want to proceed?
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setConfirmingControl(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleConfirm(confirmingControl)}
              >
                Confirm Action
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyControls;