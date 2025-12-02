import Icon from '../../../components/AppIcon';

import { ExportFormat } from '../types';

interface ExportPanelProps {
  formats: ExportFormat[];
  onExport: (formatId: string) => void;
}

const ExportPanel = ({ formats, onExport }: ExportPanelProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Download" size={20} strokeWidth={2} className="text-primary" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">Export Data</h3>
          <p className="text-sm text-muted-foreground">Download reports in multiple formats</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {formats.map((format) => (
          <button
            key={format.id}
            type="button"
            onClick={() => onExport(format.id)}
            className="flex flex-col items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted hover:border-primary transition-all duration-150"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={format.icon} size={24} strokeWidth={2} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">{format.name}</p>
              <p className="text-xs text-muted-foreground">.{format.extension}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExportPanel;