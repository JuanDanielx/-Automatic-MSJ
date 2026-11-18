/**
 * Tipos compartidos de la aplicación.
 * Mantiene fuera de los componentes la forma de usuarios, tickets y mensajes.
 */

export type UserRole = "Estudiante" | "Docente";
export type TicketStatus = "En espera" | "En revisión" | "Respondido" | "Cerrado";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  subject?: string;
  officeHours?: string;
  isAvailable?: boolean;
  initials: string;
}

export interface Message {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  body: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  number: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  description: string;
  status: TicketStatus;
  queuePosition: number;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export interface CreateTicketInput {
  student: User;
  teacher: User;
  subject: string;
  description: string;
  attachments: string[];
}
