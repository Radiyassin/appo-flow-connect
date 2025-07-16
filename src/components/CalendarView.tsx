import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CalendarEvent {
  id: string;
  title: string;
  client: string;
  worker: string;
  time: string;
  duration: number;
  status: "confirmed" | "pending" | "cancelled";
}

const mockEvents: { [key: string]: CalendarEvent[] } = {
  "2025-01-17": [
    {
      id: "1",
      title: "Consultation",
      client: "Sarah Johnson",
      worker: "Dr. Smith",
      time: "10:00",
      duration: 60,
      status: "confirmed"
    },
    {
      id: "2",
      title: "Therapy Session",
      client: "Mike Chen",
      worker: "Lisa Wilson",
      time: "14:30",
      duration: 90,
      status: "pending"
    }
  ],
  "2025-01-18": [
    {
      id: "3",
      title: "Follow-up",
      client: "Emma Davis",
      worker: "Dr. Smith",
      time: "09:00",
      duration: 30,
      status: "confirmed"
    }
  ]
};

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("2025-01-17");

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  const days = [];
  const currentDateIter = new Date(startDate);
  while (currentDateIter <= endDate) {
    days.push(new Date(currentDateIter));
    currentDateIter.setDate(currentDateIter.getDate() + 1);
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth;
  };

  const hasEvents = (date: Date) => {
    const dateStr = formatDate(date);
    return mockEvents[dateStr] && mockEvents[dateStr].length > 0;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedDateEvents = mockEvents[selectedDate] || [];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "confirmed":
        return "status-confirmed";
      case "pending":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">Schedule and manage appointments</p>
        </div>
        <Button variant="gradient" size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Schedule
        </Button>
      </div>

      {/* Calendar */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {monthNames[currentMonth]} {currentYear}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const dateStr = formatDate(date);
              const isSelected = selectedDate === dateStr;
              const isTodayDate = isToday(date);
              const isCurrentMonthDate = isCurrentMonth(date);
              const hasEventsDate = hasEvents(date);

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`
                    relative h-12 w-full rounded-lg text-sm font-medium smooth-transition
                    ${isCurrentMonthDate ? 'text-foreground' : 'text-muted-foreground'}
                    ${isSelected ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-muted'}
                    ${isTodayDate && !isSelected ? 'bg-accent/20 text-accent font-bold' : ''}
                  `}
                >
                  {date.getDate()}
                  {hasEventsDate && (
                    <div className={`
                      absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full
                      ${isSelected ? 'bg-primary-foreground' : 'bg-primary'}
                    `} />
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Events */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-md smooth-transition interactive-card"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.client} with {event.worker}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {event.time} ({event.duration}min)
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusBadgeClass(event.status)}>
                    {event.status}
                  </Badge>
                </div>
              ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No appointments scheduled</p>
              <p className="text-sm">Select a different date or schedule a new appointment</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;