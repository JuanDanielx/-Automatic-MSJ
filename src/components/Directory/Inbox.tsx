import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
/**
 * Bandeja de tickets y filtros por estado.
 */
import type { Ticket, TicketStatus, UserRole } from "@/types/app";
import styles from "@/components/Directory/Inbox.styles";

interface InboxProps {
	role: UserRole;
	tickets: Ticket[];
	queuePosition: (ticket: Ticket) => number;
	onSelectTicket: (ticketId: string) => void;
}

const filters: (TicketStatus | "Todas")[] = ["Todas", "En espera", "En revisión", "Respondido", "Cerrado"];

export default function Inbox({ role, tickets, queuePosition, onSelectTicket }: InboxProps = { role: "Estudiante", tickets: [], queuePosition: () => 0, onSelectTicket: () => {} }) {
	const [filter, setFilter] = useState<TicketStatus | "Todas">("Todas");
	const visibleTickets = tickets.filter((ticket) => filter === "Todas" || ticket.status === filter)
		.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

	return (
		<View>
			<Text style={styles.kicker}>{role === "Docente" ? "CONSULTAS RECIBIDAS" : "TUS CONVERSACIONES"}</Text>
			<View style={styles.headingRow}><View><Text style={styles.title}>Bandeja</Text><Text style={styles.subtitle}>{role === "Docente" ? "Gestiona tu cola de atención." : "Sigue el estado de cada consulta."}</Text></View><View style={styles.total}><Text style={styles.totalNumber}>{tickets.length.toString().padStart(2, "0")}</Text><Text style={styles.totalLabel}>TICKETS</Text></View></View>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
				{filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.filterActive]}><Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text></Pressable>)}
			</ScrollView>
			{visibleTickets.length ? (
				<View style={styles.ticketList}>
					{visibleTickets.map((ticket) => (
						<Pressable key={ticket.id} onPress={() => onSelectTicket(ticket.id)} style={styles.ticketCard} accessibilityRole="button">
							<View style={styles.ticketTop}><Text style={styles.ticketNumber}>{ticket.number}</Text><StatusBadge status={ticket.status} /></View>
							<Text style={styles.subject} numberOfLines={2}>{ticket.subject}</Text>
							<Text style={styles.description} numberOfLines={2}>{ticket.description}</Text>
							<View style={styles.cardBottom}><View><Text style={styles.counterpartLabel}>{role === "Docente" ? "ESTUDIANTE" : "DOCENTE"}</Text><Text style={styles.counterpart}>{role === "Docente" ? ticket.studentName : ticket.teacherName}</Text></View><View style={styles.cardMeta}>{ticket.status === "En espera" && <Text style={styles.queue}>Cola {queuePosition(ticket)}</Text>}<Text style={styles.updated}>{ticket.messages.length} {ticket.messages.length === 1 ? "mensaje" : "mensajes"}  ›</Text></View></View>
						</Pressable>
					))}
				</View>
			) : (
				<View style={styles.empty}><Text style={styles.emptyMark}>○</Text><Text style={styles.emptyTitle}>Todo al día</Text><Text style={styles.emptyCopy}>No hay consultas que coincidan con este filtro.</Text></View>
			)}
		</View>
	);
}

export function StatusBadge({ status }: { status: TicketStatus }) {
	const statusStyle = status === "En espera" ? styles.waiting : status === "En revisión" ? styles.review : status === "Respondido" ? styles.answered : styles.closed;
	return <View style={[styles.badge, statusStyle]}><Text style={styles.badgeText}>{status}</Text></View>;
}

