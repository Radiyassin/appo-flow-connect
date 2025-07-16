import { useState } from "react";
import { Search, Plus, Phone, Mail, User, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastAppointment?: string;
  nextAppointment?: string;
  totalAppointments: number;
  status: "active" | "inactive" | "new";
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+1 (555) 123-4567",
    lastAppointment: "2025-01-10",
    nextAppointment: "2025-01-17",
    totalAppointments: 5,
    status: "active"
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+1 (555) 234-5678",
    lastAppointment: "2025-01-12",
    nextAppointment: "2025-01-17",
    totalAppointments: 3,
    status: "active"
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (555) 345-6789",
    lastAppointment: "2025-01-15",
    nextAppointment: "2025-01-18",
    totalAppointments: 8,
    status: "active"
  },
  {
    id: "4",
    name: "Robert Wilson",
    email: "robert.w@email.com",
    phone: "+1 (555) 456-7890",
    lastAppointment: "2024-12-20",
    totalAppointments: 2,
    status: "inactive"
  },
  {
    id: "5",
    name: "Jessica Brown",
    email: "jessica.brown@email.com",
    phone: "+1 (555) 567-8901",
    totalAppointments: 0,
    status: "new"
  }
];

const ClientsView = () => {
  const [clients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "status-confirmed";
      case "inactive":
        return "bg-muted text-muted-foreground";
      case "new":
        return "status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage your client database</p>
        </div>
        <Button variant="gradient" size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{clients.filter(c => c.status === "active").length}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="card-elevated">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{clients.filter(c => c.status === "new").length}</p>
            <p className="text-sm text-muted-foreground">New</p>
          </CardContent>
        </Card>
        <Card className="card-elevated">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">{clients.filter(c => c.status === "inactive").length}</p>
            <p className="text-sm text-muted-foreground">Inactive</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="card-elevated interactive-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{client.name}</h3>
                      <Badge className={getStatusBadgeClass(client.status)}>
                        {client.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Appointments</p>
                    <p className="font-semibold text-foreground">{client.totalAppointments}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {(client.lastAppointment || client.nextAppointment) && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {client.lastAppointment && (
                      <div>
                        <p className="text-muted-foreground">Last Visit</p>
                        <p className="font-medium">{client.lastAppointment}</p>
                      </div>
                    )}
                    {client.nextAppointment && (
                      <div>
                        <p className="text-muted-foreground">Next Visit</p>
                        <p className="font-medium text-primary">{client.nextAppointment}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No clients found</p>
          <p className="text-sm">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default ClientsView;