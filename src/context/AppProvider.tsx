/**
 * Estado global compartido por todos los flujos de la aplicación.
 * Centraliza docentes, usuario actual, tickets y mensajes.
 */

import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { initialTeachers, initialTickets } from "@/data/initialData";
import type { CreateTicketInput, Ticket, TicketStatus, User } from "@/types/app";

interface AppContextValue {
  currentUser: User | null;
  teachers: User[];
  tickets: Ticket[];
  setCurrentUser: (user: User | null) => void;
  toggleAvailability: (teacherId: string) => void;
  createTicket: (input: CreateTicketInput) => Ticket;
  setTicketStatus: (ticketId: string, status: TicketStatus) => void;
  addMessage: (ticketId: string, message: Omit<import("@/types/app").Message, "id" | "ticketId" | "createdAt">) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [tickets, setTickets] = useState(initialTickets);

  const value = useMemo<AppContextValue>(() => ({
    currentUser,
    teachers,
    tickets,
    setCurrentUser,
    toggleAvailability: (teacherId) => {
      setTeachers((current) => current.map((teacher) => teacher.id === teacherId
        ? { ...teacher, isAvailable: !teacher.isAvailable }
        : teacher));
    },
    createTicket: ({ student, teacher, subject, description, attachments }) => {
      const activeQueue = tickets.filter((ticket) => ticket.teacherId === teacher.id && ticket.status === "En espera");
      const id = `ticket-${Date.now()}-${tickets.length}`;
      const timestamp = new Date().toISOString();
      const ticket: Ticket = {
        id,
        number: `#${String(1043 + tickets.length - initialTickets.length).padStart(4, "0")}`,
        studentId: student.id,
        studentName: student.name,
        teacherId: teacher.id,
        teacherName: teacher.name,
        subject: subject.trim(),
        description: description.trim(),
        status: "En espera",
        queuePosition: activeQueue.length + 1,
        attachments,
        createdAt: timestamp,
        updatedAt: timestamp,
        messages: [],
      };
      setTickets((current) => [...current, ticket]);
      return ticket;
    },
    setTicketStatus: (ticketId, status) => {
      setTickets((current) => current.map((ticket) => ticket.id === ticketId
        ? { ...ticket, status, updatedAt: new Date().toISOString() }
        : ticket));
    },
    addMessage: (ticketId, message) => {
      const timestamp = new Date().toISOString();
      setTickets((current) => current.map((ticket) => ticket.id === ticketId
        ? {
            ...ticket,
            messages: [...ticket.messages, { ...message, id: `message-${Date.now()}-${ticket.messages.length}`, ticketId, createdAt: timestamp }],
            updatedAt: timestamp,
            status: message.senderRole === "Docente" ? "Respondido" : ticket.status,
          }
        : ticket));
    },
  }), [currentUser, teachers, tickets]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext debe usarse dentro de AppProvider.");
  return context;
}
