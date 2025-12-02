import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import NotFound from './pages/NotFound';
import AirspaceDashboard from './pages/airspace-dashboard';
import VehicleTracking from './pages/vehicle-tracking';
import FlightManagement from './pages/flight-management';
import IncidentManagement from './pages/incident-management';
import AnalyticsReports from './pages/analytics-reports';
// import ErrorBoundary from "components/ErrorBoundary";
// import ScrollToTop from "components/ScrollToTop";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
        <RouterRoutes>
          {/* Define your routes here */}
        <Route path="/" element={<AirspaceDashboard />} />
        <Route path="/airspace-dashboard" element={<AirspaceDashboard />} />
        <Route path="/vehicle-tracking" element={<VehicleTracking />} />
        <Route path="/flight-management" element={<FlightManagement />} />
        <Route path="/incident-management" element={<IncidentManagement />} />
        <Route path="/analytics-reports" element={<AnalyticsReports />} />
        <Route path="*" element={<NotFound />} />
        </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
