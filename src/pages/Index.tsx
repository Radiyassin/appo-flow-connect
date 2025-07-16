import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import CalendarView from "@/components/CalendarView";
import ClientsView from "@/components/ClientsView";
import WorkersView from "@/components/WorkersView";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "calendar":
        return <CalendarView />;
      case "clients":
        return <ClientsView />;
      case "workers":
        return <WorkersView />;
      case "settings":
        return (
          <div className="space-y-6 p-4 pb-24">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Configure your application preferences</p>
            </div>
            <div className="text-center py-12 text-muted-foreground">
              <p>Settings page coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-md mx-auto bg-card min-h-screen">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
