import { useState } from "react";
import { Search, Plus, Phone, Mail, User, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  rating: number;
  totalClients: number;
  todayAppointments: number;
  weeklyHours: number;
  status: "available" | "busy" | "offline";
}

const mockWorkers: Worker[] = [
  {
    id: "1",
    name: "Dr. Smith",
    email: "dr.smith@clinic.com",
    phone: "+1 (555) 111-2222",
    specialization: "General Consultation",
    rating: 4.8,
    totalClients: 45,
    todayAppointments: 6,
    weeklyHours: 35,
    status: "available"
  },
  {
    id: "2",
    name: "Lisa Wilson",
    email: "lisa.wilson@clinic.com",
    phone: "+1 (555) 222-3333",
    specialization: "Therapy & Counseling",
    rating: 4.9,
    totalClients: 32,
    todayAppointments: 4,
    weeklyHours: 40,
    status: "busy"
  },
  {
    id: "3",
    name: "Michael Davis",
    email: "m.davis@clinic.com",
    phone: "+1 (555) 333-4444",
    specialization: "Physiotherapy",
    rating: 4.7,
    totalClients: 28,
    todayAppointments: 3,
    weeklyHours: 30,
    status: "available"
  },
  {
    id: "4",
    name: "Sarah Lee",
    email: "sarah.lee@clinic.com",
    phone: "+1 (555) 444-5555",
    specialization: "Nutrition Counseling",
    rating: 4.6,
    totalClients: 22,
    todayAppointments: 0,
    weeklyHours: 25,
    status: "offline"
  }
];

const WorkersView = () => {
  const [workers] = useState<Worker[]>(mockWorkers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "available":
        return "status-confirmed";
      case "busy":
        return "status-pending";
      case "offline":
        return "bg-muted text-muted-foreground";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-accent";
      case "busy":
        return "bg-warning";
      case "offline":
        return "bg-muted-foreground";
      default:
        return "bg-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Workers</h1>
          <p className="text-muted-foreground">Manage your service providers</p>
        </div>
        <Button variant="gradient" size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Worker
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search workers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">{workers.filter(w => w.status === "available").length}</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </CardContent>
        </Card>
        <Card className="card-elevated">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{workers.filter(w => w.status === "busy").length}</p>
            <p className="text-sm text-muted-foreground">Busy</p>
          </CardContent>
        </Card>
        <Card className="card-elevated">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">{workers.filter(w => w.status === "offline").length}</p>
            <p className="text-sm text-muted-foreground">Offline</p>
          </CardContent>
        </Card>
      </div>

      {/* Workers List */}
      <div className="space-y-4">
        {filteredWorkers.map((worker) => (
          <Card key={worker.id} className="card-elevated interactive-card">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(worker.status)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{worker.name}</h3>
                    <Badge className={getStatusBadgeClass(worker.status)}>
                      {worker.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm font-medium text-primary mb-2">{worker.specialization}</p>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{worker.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{worker.phone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-warning fill-current" />
                      <span className="text-sm font-medium">{worker.rating}</span>
                      <span className="text-sm text-muted-foreground">({worker.totalClients} clients)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{worker.weeklyHours}h/week</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Today's appointments: </span>
                        <span className="font-medium text-primary">{worker.todayAppointments}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No workers found</p>
          <p className="text-sm">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default WorkersView;