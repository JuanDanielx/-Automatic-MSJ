import { Redirect } from "expo-router";
import { useMSJs, type Ticket, type TicketStatus } from "./UseMSJs";

export function useTickets() {
  const { currentUser, teachers, tickets, createTicket, setTicketStatus, toggleAvailability } = useMSJs();

  const myTickets = currentUser
    ? currentUser.role === "Docente"
      ? tickets.filter((ticket) => ticket.teacherId === currentUser.id)
      : tickets.filter((ticket) => ticket.studentId === currentUser.id)
    : [];

  const getQueuePosition = (ticket: Ticket) => ticket.status === "En espera"
    ? tickets.filter((item) => item.teacherId === ticket.teacherId && item.status === "En espera")
      .findIndex((item) => item.id === ticket.id) + 1
    : ticket.queuePosition;

  const updateStatus = (ticketId: string, status: TicketStatus) => setTicketStatus(ticketId, status);

  return {
    currentUser,
    myTickets,
    tickets,
    teachers,
    createTicket,
    updateStatus,
    setAvailability: toggleAvailability,
    getQueuePosition,
  };
}

export default function UseTicketsRoute() {
  return <Redirect href="/" />;
}