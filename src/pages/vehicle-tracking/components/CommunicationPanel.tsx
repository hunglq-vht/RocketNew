import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { CommunicationLog } from '../types';

interface CommunicationPanelProps {
  logs: CommunicationLog[];
  onSendMessage?: (message: string) => void;
}

const CommunicationPanel = ({ logs, onSendMessage }: CommunicationPanelProps) => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'voice' | 'text' | 'alert'>('all');

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-accent';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'voice':
        return 'Phone';
      case 'text':
        return 'MessageSquare';
      case 'alert':
        return 'Bell';
      default:
        return 'Radio';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const filteredLogs = activeTab === 'all' ? logs : logs.filter(log => log.type === activeTab);

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="Radio" size={16} strokeWidth={2} className="text-primary" />
          Communications
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors duration-150 ${
              activeTab === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('voice')}
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors duration-150 ${
              activeTab === 'voice' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Voice
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors duration-150 ${
              activeTab === 'text' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Text
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('alert')}
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors duration-150 ${
              activeTab === 'alert' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Alerts
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 mb-4">
        {filteredLogs.map((log) => (
          <div key={log.id} className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-background flex items-center justify-center ${getPriorityColor(log.priority)}`}>
                <Icon name={getTypeIcon(log.type)} size={16} strokeWidth={2} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-medium text-foreground">{log.sender}</span>
                  <span className="text-xs text-muted-foreground font-mono">{formatTime(log.timestamp)}</span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed mb-1">{log.message}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium uppercase ${getPriorityColor(log.priority)}`}>
                    {log.priority}
                  </span>
                  <span className="text-xs text-muted-foreground">→ {log.receiver}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-border space-y-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Phone"
            iconPosition="left"
            className="flex-1"
          >
            Voice Call
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Send"
            iconPosition="right"
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex-1"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPanel;