/**
 * Datos iniciales utilizados por la demostración.
 * Sustituir este archivo por llamadas de API para conectar un backend real.
 */

import type { Message, Ticket, User } from "@/types/app";

export const initialTeachers: User[] = [
  { id: "teacher-ana", name: "Christian Japon", role: "Docente", email: "christian.japon@campus.edu", subject: "Programación Movil- CAD", officeHours: "Lun y mié · 10:00–12:00", isAvailable: true, initials: "AM" },
  { id: "teacher-luis", name: "Milton Velazquez", role: "Docente", email: "milton.velasquez@campus.edu", subject: "Soporte Técnico - Sistemas Operativos y Redes", officeHours: "Mar y jue · 14:00–16:00", isAvailable: false, initials: "LH" },
  { id: "teacher-sofia", name: "Josue Abad", role: "Docente", email: "josue.abad@campus.edu", subject: "Matematicas", officeHours: "Lun a vie · 09:00–11:00", isAvailable: true, initials: "SR" },
  { id: "teacher-diego", name: "Angelica Dumas", role: "Docente", email: "angelica.dumas@campus.edu", subject: "Programación y Base de Datos", officeHours: "Mié y vie · 12:00–14:00", isAvailable: true, initials: "DF" },
];

const createdAt = new Date().toISOString();

export const initialMessages: Message[] = [
  { id: "message-welcome", ticketId: "ticket-1042", senderId: "student-demo", senderName: "Valentina Cruz", senderRole: "Estudiante", body: "Hola, ¿podría ayudarme a entender cómo empezar este ejercicio?", createdAt },
  { id: "message-answer", ticketId: "ticket-1042", senderId: "teacher-ana", senderName: "Ana Martínez", senderRole: "Docente", body: "Claro. Empecemos identificando las variables y luego revisamos la primera ecuación.", createdAt },
];

export const initialTickets: Ticket[] = [
  { id: "ticket-1042", number: "#1042", studentId: "student-demo", studentName: "Valentina Cruz", teacherId: "teacher-ana", teacherName: "Ana Martínez", subject: "Duda con ecuaciones lineales", description: "No sé cómo plantear el sistema para resolver el ejercicio 4.", status: "En revisión", queuePosition: 1, attachments: ["ejercicio-4.pdf"], createdAt, updatedAt: createdAt, messages: initialMessages },
  { id: "ticket-1041", number: "#1041", studentId: "student-demo", studentName: "Valentina Cruz", teacherId: "teacher-sofia", teacherName: "Sofía Ramírez", subject: "Error en mi programa", description: "Me aparece un error al recorrer una lista en TypeScript.", status: "En espera", queuePosition: 1, attachments: [], createdAt, updatedAt: createdAt, messages: [] },
  { id: "ticket-1038", number: "#1038", studentId: "student-demo", studentName: "Valentina Cruz", teacherId: "teacher-luis", teacherName: "Luis Herrera", subject: "Repaso de movimiento parabólico", description: "Quisiera confirmar qué fórmula debo usar para calcular el alcance.", status: "Respondido", queuePosition: 0, attachments: [], createdAt, updatedAt: createdAt, messages: [] },
];
