import { Home, Calendar, Users, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Home", icon: Home, path: "/" },
  { id: "calendar", label: "Calendar", icon: Calendar, path: "/calendar" },
  { id: "clients", label: "Clients", icon: Users, path: "/clients" },
  { id: "workers", label: "Workers", icon: User, path: "/workers" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-[var(--shadow-elevated)] z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg smooth-transition min-w-0 flex-1",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span
                className={cn(
                  "text-xs font-medium truncate",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-primary rounded-full absolute -top-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;