import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { ReportTemplate } from '../types';

interface ReportTemplateGridProps {
  templates: ReportTemplate[];
  onGenerateReport: (templateId: string) => void;
}

const ReportTemplateGrid = ({ templates, onGenerateReport }: ReportTemplateGridProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'operational':
        return 'bg-primary/10 text-primary';
      case 'safety':
        return 'bg-error/10 text-error';
      case 'efficiency':
        return 'bg-success/10 text-success';
      case 'compliance':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Report Templates</h3>
        <p className="text-sm text-muted-foreground">Pre-configured analytics and summaries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-150">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCategoryColor(template.category)}`}>
                <Icon name={template.icon} size={24} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground mb-1">{template.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{template.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              {template.lastGenerated && (
                <span className="text-xs text-muted-foreground">
                  Last: {template.lastGenerated.toLocaleDateString()}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                iconName="FileText"
                iconPosition="left"
                onClick={() => onGenerateReport(template.id)}
              >
                Generate
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportTemplateGrid;