import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { Ticket, TicketStatus, UserRole } from "../../hooks/UseMSJs";

interface InboxProps {
	role: UserRole;
	tickets: Ticket[];
	queuePosition: (ticket: Ticket) => number;
	onSelectTicket: (ticketId: string) => void;
}

const filters: (TicketStatus | "Todas")[] = ["Todas", "En espera", "En revisión", "Respondido", "Cerrado"];

export default function Bandeja({ role, tickets, queuePosition, onSelectTicket }: InboxProps = { role: "Estudiante", tickets: [], queuePosition: () => 0, onSelectTicket: () => {} }) {
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

const styles = StyleSheet.create({
	kicker: { color: "#819088", fontSize: 9, fontWeight: "800", letterSpacing: 1.4 },
	headingRow: { marginTop: 5, marginBottom: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
	title: { color: "#17332E", fontSize: 23, fontWeight: "800" },
	subtitle: { marginTop: 4, color: "#738179", fontSize: 11 },
	total: { width: 52, height: 49, borderRadius: 6, backgroundColor: "#E7EFE5", alignItems: "center", justifyContent: "center" },
	totalNumber: { color: "#315D50", fontSize: 16, fontWeight: "800" },
	totalLabel: { color: "#87948C", fontSize: 7, fontWeight: "800", letterSpacing: 0.7 },
	filters: { gap: 7, paddingBottom: 13 },
	filter: { minHeight: 31, paddingHorizontal: 11, borderWidth: 1, borderColor: "#E0E7E1", borderRadius: 16, backgroundColor: "#FFFFFF", justifyContent: "center" },
	filterActive: { backgroundColor: "#173F38", borderColor: "#173F38" },
	filterText: { color: "#718078", fontSize: 9, fontWeight: "700" },
	filterTextActive: { color: "#FFFFFF" },
	ticketList: { gap: 9 },
	ticketCard: { padding: 14, borderRadius: 7, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E9E3" },
	ticketTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
	ticketNumber: { color: "#87948C", fontSize: 10, fontWeight: "800", letterSpacing: 0.7 },
	badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
	badgeText: { fontSize: 9, fontWeight: "800" },
	waiting: { backgroundColor: "#F4EEDB" },
	review: { backgroundColor: "#E2EEF0" },
	answered: { backgroundColor: "#E6F0E2" },
	closed: { backgroundColor: "#ECEFED" },
	subject: { marginTop: 10, color: "#233E36", fontSize: 14, lineHeight: 19, fontWeight: "800" },
	description: { marginTop: 4, color: "#79867F", fontSize: 10, lineHeight: 15 },
	cardBottom: { marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#EDF1ED", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
	counterpartLabel: { color: "#98A39C", fontSize: 7, fontWeight: "800", letterSpacing: 0.8 },
	counterpart: { marginTop: 3, color: "#53665D", fontSize: 10, fontWeight: "700" },
	cardMeta: { alignItems: "flex-end", gap: 3 },
	queue: { color: "#9A792C", fontSize: 9, fontWeight: "800" },
	updated: { color: "#55786B", fontSize: 9, fontWeight: "700" },
	empty: { padding: 30, marginTop: 8, borderRadius: 7, backgroundColor: "#FFFFFF", alignItems: "center", borderWidth: 1, borderColor: "#E2E9E3" },
	emptyMark: { color: "#8FA68A", fontSize: 28 },
	emptyTitle: { marginTop: 8, color: "#34564A", fontSize: 14, fontWeight: "800" },
	emptyCopy: { marginTop: 5, color: "#829087", fontSize: 10, textAlign: "center" },
});
