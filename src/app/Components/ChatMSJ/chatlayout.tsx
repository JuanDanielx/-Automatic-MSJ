import { Redirect } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useMSJs } from "../../hooks/UseMSJs";
import { StatusBadge } from "../Directorio/bandeja";
import Chat from "./chat";

interface ChatLayoutProps {
	ticketId: string;
	onBack: () => void;
	onClosed: () => void;
}

export default function ChatLayout({ ticketId, onBack, onClosed }: ChatLayoutProps = { ticketId: "", onBack: () => {}, onClosed: () => {} }) {
	const { currentUser, tickets, setTicketStatus } = useMSJs();
	const ticket = tickets.find((item) => item.id === ticketId);
	if (!ticket || !currentUser) return <Redirect href="/" />;

	const isTeacher = currentUser.role === "Docente";
	const counterpart = isTeacher ? ticket.studentName : ticket.teacherName;
	const startReview = () => setTicketStatus(ticket.id, "En revisión");
	const closeTicket = () => {
		setTicketStatus(ticket.id, "Cerrado");
		onClosed();
	};

	return (
		<View style={styles.screen}>
			<View style={styles.header}><Pressable onPress={onBack} style={styles.back} accessibilityRole="button" accessibilityLabel="Volver"><Text style={styles.backGlyph}>‹</Text></Pressable><View style={styles.headerCopy}><Text style={styles.headerTitle} numberOfLines={1}>{counterpart}</Text><Text style={styles.headerSub}>{ticket.number} · {isTeacher ? "Estudiante" : "Docente"}</Text></View><StatusBadge status={ticket.status} /></View>
			<View style={styles.details}><View style={styles.detailsText}><Text style={styles.subject}>{ticket.subject}</Text><Text style={styles.meta}>{ticket.attachments.length ? `${ticket.attachments.length} archivo${ticket.attachments.length === 1 ? "" : "s"} adjunto${ticket.attachments.length === 1 ? "" : "s"}` : "Consulta académica"} · {new Date(ticket.createdAt).toLocaleDateString("es", { day: "numeric", month: "short" })}</Text></View>
				{ticket.attachments.length > 0 && <View style={styles.attachmentRow}>{ticket.attachments.map((file) => <View key={file} style={styles.fileChip}><Text style={styles.fileGlyph}>▧</Text><Text style={styles.fileText} numberOfLines={1}>{file}</Text></View>)}</View>}
			</View>
			{isTeacher && ticket.status === "En espera" && <Pressable onPress={startReview} style={styles.reviewButton} accessibilityRole="button"><Text style={styles.reviewText}>Tomar consulta y comenzar revisión</Text><Text style={styles.reviewArrow}>→</Text></Pressable>}
			<View style={styles.chat}><Chat ticket={ticket} /></View>
			{ticket.status !== "Cerrado" && (isTeacher || ticket.status === "Respondido") && <Pressable onPress={closeTicket} style={styles.closeButton} accessibilityRole="button"><Text style={styles.closeText}>Cerrar ticket</Text></Pressable>}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, minHeight: 480, backgroundColor: "#FFFFFF", borderRadius: 7, borderWidth: 1, borderColor: "#E2E9E3", overflow: "hidden" },
	header: { minHeight: 62, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: "#E9EEEA", flexDirection: "row", alignItems: "center", gap: 9 },
	back: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#F1F4F0", alignItems: "center", justifyContent: "center" },
	backGlyph: { marginTop: -4, color: "#315D50", fontSize: 28 },
	headerCopy: { flex: 1 },
	headerTitle: { color: "#233E36", fontSize: 12, fontWeight: "800" },
	headerSub: { marginTop: 3, color: "#859189", fontSize: 9 },
	details: { paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#EDF1ED", backgroundColor: "#FBFCFA" },
	detailsText: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
	subject: { flex: 1, color: "#304A40", fontSize: 12, fontWeight: "800" },
	meta: { color: "#8A9690", fontSize: 8 },
	attachmentRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
	fileChip: { maxWidth: "100%", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 4, backgroundColor: "#E9F0E7", flexDirection: "row", alignItems: "center", gap: 5 },
	fileGlyph: { color: "#567965", fontSize: 10 },
	fileText: { maxWidth: 180, color: "#547064", fontSize: 9, fontWeight: "700" },
	reviewButton: { minHeight: 38, margin: 10, paddingHorizontal: 11, borderRadius: 5, backgroundColor: "#EAF1E8", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
	reviewText: { color: "#315D50", fontSize: 10, fontWeight: "800" },
	reviewArrow: { color: "#315D50", fontSize: 16 },
	chat: { flex: 1, padding: 10 },
	closeButton: { minHeight: 38, marginHorizontal: 10, marginBottom: 10, borderWidth: 1, borderColor: "#DCE5DE", borderRadius: 5, alignItems: "center", justifyContent: "center" },
	closeText: { color: "#65766D", fontSize: 10, fontWeight: "800" },
});
