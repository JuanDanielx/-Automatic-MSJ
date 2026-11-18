import { Redirect } from "expo-router";
import { Pressable, Text, View } from "react-native";
/**
 * Contenedor de una conversación: cabecera, detalles y acciones del ticket.
 */
import { useAppContext } from "@/context/AppProvider";
import { StatusBadge } from "@/components/Directory/Inbox";
import Chat from "@/components/Chat/Chat";
import styles from "@/components/Chat/ChatLayout.styles";

interface ChatLayoutProps {
	ticketId: string;
	onBack: () => void;
	onClosed: () => void;
}

export default function ChatLayout({ ticketId, onBack, onClosed }: ChatLayoutProps = { ticketId: "", onBack: () => {}, onClosed: () => {} }) {
	const { currentUser, tickets, setTicketStatus } = useAppContext();
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

