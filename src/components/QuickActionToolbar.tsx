import { useState } from 'react';
import Icon from './AppIcon';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  variant: 'default' | 'warning' | 'danger';
  tooltip: string;
  requiresConfirmation?: boolean;
}

interface QuickActionToolbarProps {
  actions?: QuickAction[];
  onActionClick?: (actionId: string) => void;
  context?: 'dashboard' | 'flight' | 'vehicle' | 'incident' | 'analytics';
}

const QuickActionToolbar = ({ 
  actions = [],
  onActionClick,
  context = 'dashboard'
}: QuickActionToolbarProps) => {
  const [expandedMobile, setExpandedMobile] = useState(false);
  const [confirmingAction, setConfirmingAction] = useState<string | null>(null);

  const defaultActions: Record<string, QuickAction[]> = {
    dashboard: [
      {
        id: 'emergency-alert',
        label: 'Emergency Alert',
        icon: 'Siren',
        variant: 'danger',
        tooltip: 'Activate emergency alert system',
        requiresConfirmation: true
      },
      {
        id: 'quick-comm',
        label: 'Quick Comm',
        icon: 'Radio',
        variant: 'default',
        tooltip: 'Open emergency communication channel'
      }
    ],
    flight: [
      {
        id: 'emergency-landing',
        label: 'Emergency Landing',
        icon: 'PlaneLanding',
        variant: 'danger',
        tooltip: 'Initiate emergency landing protocol',
        requiresConfirmation: true
      },
      {
        id: 'reroute',
        label: 'Reroute',
        icon: 'Route',
        variant: 'warning',
        tooltip: 'Request flight path rerouting'
      }
    ],
    vehicle: [
      {
        id: 'override',
        label: 'Override',
        icon: 'ShieldAlert',
        variant: 'danger',
        tooltip: 'Activate manual override controls',
        requiresConfirmation: true
      },
      {
        id: 'track-lock',
        label: 'Track Lock',
        icon: 'Target',
        variant: 'warning',
        tooltip: 'Lock tracking on selected vehicle'
      }
    ],
    incident: [
      {
        id: 'escalate',
        label: 'Escalate',
        icon: 'AlertOctagon',
        variant: 'danger',
        tooltip: 'Escalate incident to higher authority',
        requiresConfirmation: true
      },
      {
        id: 'dispatch',
        label: 'Dispatch',
        icon: 'Send',
        variant: 'warning',
        tooltip: 'Dispatch emergency response team'
      }
    ],
    analytics: [
      {
        id: 'export',
        label: 'Export',
        icon: 'Download',
        variant: 'default',
        tooltip: 'Export current report data'
      },
      {
        id: 'share',
        label: 'Share',
        icon: 'Share2',
        variant: 'default',
        tooltip: 'Share report with team members'
      }
    ]
  };

  const contextActions = actions.length > 0 ? actions : defaultActions[context] || [];

  const handleActionClick = (action: QuickAction) => {
    if (action.requiresConfirmation) {
      setConfirmingAction(action.id);
    } else {
      if (onActionClick) {
        onActionClick(action.id);
      }
    }
  };

  const handleConfirm = (actionId: string) => {
    if (onActionClick) {
      onActionClick(actionId);
    }
    setConfirmingAction(null);
  };

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'danger':
        return 'bg-error hover:bg-error/90 text-error-foreground';
      case 'warning':
        return 'bg-warning hover:bg-warning/90 text-warning-foreground';
      default:
        return 'bg-primary hover:bg-primary/90 text-primary-foreground';
    }
  };

  if (contextActions.length === 0) return null;

  return (
    <>
      <div className="hidden lg:flex items-center gap-2 px-4">
        {contextActions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => handleActionClick(action)}
            title={action.tooltip}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
              transition-all duration-150 ease-out shadow-sm
              ${getVariantStyles(action.variant)}
            `}
          >
            <Icon name={action.icon} size={16} strokeWidth={2} />
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      <div className="lg:hidden fixed bottom-6 right-6 z-[1000]">
        <button
          type="button"
          onClick={() => setExpandedMobile(!expandedMobile)}
          className="w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-xl flex items-center justify-center transition-all duration-150"
          aria-label="Quick actions"
        >
          <Icon name={expandedMobile ? 'X' : 'Zap'} size={24} strokeWidth={2} />
        </button>

        {expandedMobile && (
          <div className="absolute bottom-16 right-0 mb-2 w-56 bg-popover border border-border rounded-lg shadow-xl animate-slide-in-right">
            <div className="p-2 space-y-1">
              {contextActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => {
                    handleActionClick(action);
                    setExpandedMobile(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                    transition-all duration-150 ease-out
                    ${getVariantStyles(action.variant)}
                  `}
                >
                  <Icon name={action.icon} size={18} strokeWidth={2} />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {confirmingAction && (
        <div className="fixed inset-0 bg-black/50 z-[1200] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-popover border border-border rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={24} strokeWidth={2} className="text-error" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Confirm Action
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This action requires confirmation. Are you sure you want to proceed with this operation?
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-end">
              <button
                type="button"
                onClick={() => setConfirmingAction(null)}
                className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-md text-sm font-medium transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConfirm(confirmingAction)}
                className="px-4 py-2 bg-error hover:bg-error/90 text-error-foreground rounded-md text-sm font-medium transition-colors duration-150"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActionToolbar;