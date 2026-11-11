import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";

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

interface AppContextValue {
	currentUser: User | null;
	teachers: User[];
	tickets: Ticket[];
	setCurrentUser: (user: User | null) => void;
	toggleAvailability: (teacherId: string) => void;
	createTicket: (input: CreateTicketInput) => Ticket;
	setTicketStatus: (ticketId: string, status: TicketStatus) => void;
	addMessage: (ticketId: string, message: Omit<Message, "id" | "ticketId" | "createdAt">) => void;
}

export interface CreateTicketInput {
	student: User;
	teacher: User;
	subject: string;
	description: string;
	attachments: string[];
}

const initialTeachers: User[] = [
	{ id: "teacher-ana", name: "Ana Martínez", role: "Docente", email: "ana.martinez@campus.edu", subject: "Matemáticas", officeHours: "Lun y mié · 10:00–12:00", isAvailable: true, initials: "AM" },
	{ id: "teacher-luis", name: "Luis Herrera", role: "Docente", email: "luis.herrera@campus.edu", subject: "Física", officeHours: "Mar y jue · 14:00–16:00", isAvailable: false, initials: "LH" },
	{ id: "teacher-sofia", name: "Sofía Ramírez", role: "Docente", email: "sofia.ramirez@campus.edu", subject: "Programación", officeHours: "Lun a vie · 09:00–11:00", isAvailable: true, initials: "SR" },
	{ id: "teacher-diego", name: "Diego Flores", role: "Docente", email: "diego.flores@campus.edu", subject: "Historia", officeHours: "Mié y vie · 12:00–14:00", isAvailable: true, initials: "DF" },
];

const createdAt = new Date().toISOString();
const sampleMessages: Message[] = [
	{ id: "message-welcome", ticketId: "ticket-1042", senderId: "student-demo", senderName: "Valentina Cruz", senderRole: "Estudiante", body: "Hola, ¿podría ayudarme a entender cómo empezar este ejercicio?", createdAt },
	{ id: "message-answer", ticketId: "ticket-1042", senderId: "teacher-ana", senderName: "Ana Martínez", senderRole: "Docente", body: "Claro. Empecemos identificando las variables y luego revisamos la primera ecuación.", createdAt },
];

const initialTickets: Ticket[] = [
	{ id: "ticket-1042", number: "#1042", studentId: "student-demo", studentName: "Valentina Cruz", teacherId: "teacher-ana", teacherName: "Ana Martínez", subject: "Duda con ecuaciones lineales", description: "No sé cómo plantear el sistema para resolver el ejercicio 4.", status: "En revisión", queuePosition: 1, attachments: ["ejercicio-4.pdf"], createdAt, updatedAt: createdAt, messages: sampleMessages },
	{ id: "ticket-1041", number: "#1041", studentId: "student-demo", studentName: "Valentina Cruz", teacherId: "teacher-sofia", teacherName: "Sofía Ramírez", subject: "Error en mi programa", description: "Me aparece un error al recorrer una lista en TypeScript.", status: "En espera", queuePosition: 1, attachments: [], createdAt, updatedAt: createdAt, messages: [] },
	{ id: "ticket-1038", number: "#1038", studentId: "student-demo", studentName: "Valentina Cruz", teacherId: "teacher-luis", teacherName: "Luis Herrera", subject: "Repaso de movimiento parabólico", description: "Quisiera confirmar qué fórmula debo usar para calcular el alcance.", status: "Respondido", queuePosition: 0, attachments: [], createdAt, updatedAt: createdAt, messages: [] },
];

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
						messages: [...ticket.messages, { ...message, id: `message-${Date.now()}`, ticketId, createdAt: timestamp }],
						updatedAt: timestamp,
						status: message.senderRole === "Docente" ? "Respondido" : ticket.status,
					}
				: ticket));
		},
	}), [currentUser, teachers, tickets]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useMSJs() {
	const context = useContext(AppContext);
	if (!context) throw new Error("useMSJs debe usarse dentro de AppProvider.");
	return context;
}
