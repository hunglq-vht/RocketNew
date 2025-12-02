import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

interface HeaderProps {
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
}

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  tooltip: string;
}

const Header = ({ onMenuToggle, showMobileMenu = false }: HeaderProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      path: '/airspace-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Real-time airspace monitoring and situational awareness'
    },
    {
      label: 'Flight Management',
      path: '/flight-management',
      icon: 'Plane',
      tooltip: 'Flight planning, authorization, and coordination'
    },
    {
      label: 'Vehicle Tracking',
      path: '/vehicle-tracking',
      icon: 'Navigation',
      tooltip: 'Individual vehicle monitoring and control'
    },
    {
      label: 'Incidents',
      path: '/incident-management',
      icon: 'AlertTriangle',
      tooltip: 'Emergency response and safety event coordination'
    },
    {
      label: 'Analytics',
      path: '/analytics-reports',
      icon: 'BarChart3',
      tooltip: 'Strategic reporting and performance analysis'
    }
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (onMenuToggle) {
      onMenuToggle();
    }
  };

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-[1000] mt-4">
        <div className="h-full flex items-center px-6">
          <div className="flex items-center gap-8 flex-1">
            <Link to="/airspace-dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-150">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" className="text-primary-foreground" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" className="text-primary-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" className="text-primary-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground leading-tight">SkyGuard</span>
                <span className="text-xs text-muted-foreground leading-tight">Traffic System</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-2 flex-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.tooltip}
                  className={`
                    flex items-center gap-2 px-6 py-4 rounded-md text-sm font-medium
                    transition-all duration-150 ease-out
                    ${isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item.icon} size={18} strokeWidth={2} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              title="System status and notifications"
              className="p-2 rounded-md hover:bg-muted transition-colors duration-150 relative"
            >
              <Icon name="Bell" size={20} strokeWidth={2} className="text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-success rounded-full"></span>
            </button>

            <button
              type="button"
              title="User profile and settings"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors duration-150"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Icon name="User" size={16} strokeWidth={2} className="text-primary-foreground" />
              </div>
            </button>

            {showMobileMenu && (
              <button
                type="button"
                onClick={handleMobileMenuToggle}
                className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors duration-150"
                aria-label="Toggle mobile menu"
              >
                <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} strokeWidth={2} className="text-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      {showMobileMenu && mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-[999] lg:hidden animate-fade-in">
          <nav className="flex flex-col p-4 gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium
                  transition-all duration-150 ease-out
                  ${isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item.icon} size={20} strokeWidth={2} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;