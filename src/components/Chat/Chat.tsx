import { useState } from "react";
import { Redirect } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
/**
 * Lista de mensajes y formulario de composición de una conversación.
 */
import { useAppContext } from "@/context/AppProvider";
import type { Ticket } from "@/types/app";
import styles from "@/components/Chat/Chat.styles";

export default function Chat({ ticket }: { ticket?: Ticket } = {}) {
	const { currentUser, addMessage } = useAppContext();
	const [draft, setDraft] = useState("");
	if (!ticket) return <Redirect href="/" />;
	const isClosed = ticket.status === "Cerrado";

	const send = () => {
		const body = draft.trim();
		if (!body || !currentUser || isClosed) return;
		addMessage(ticket.id, {
			senderId: currentUser.id,
			senderName: currentUser.name,
			senderRole: currentUser.role,
			body,
		});
		setDraft("");
	};

	return (
		<View style={styles.wrapper}>
			<ScrollView style={styles.messages} contentContainerStyle={styles.messageContent} keyboardShouldPersistTaps="handled">
				{ticket.messages.length === 0 && (
					<View style={styles.firstMessage}><Text style={styles.firstLabel}>CONSULTA ORIGINAL</Text><Text style={styles.firstBody}>{ticket.description}</Text></View>
				)}
				{ticket.messages.map((message) => {
					const mine = message.senderId === currentUser?.id;
					return (
						<View key={message.id} style={[styles.messageRow, mine && styles.messageRowMine]}>
							<View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleOther]}>
								<Text style={[styles.sender, mine && styles.senderMine]}>{mine ? "Tú" : message.senderName}</Text>
								<Text style={[styles.body, mine && styles.bodyMine]}>{message.body}</Text>
								<Text style={[styles.time, mine && styles.timeMine]}>{new Date(message.createdAt).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })}</Text>
							</View>
						</View>
					);
				})}
				{isClosed && <Text style={styles.closedNotice}>Esta conversación está cerrada.</Text>}
			</ScrollView>
			<View style={[styles.composer, isClosed && styles.composerDisabled]}>
				<TextInput value={draft} onChangeText={setDraft} placeholder={isClosed ? "Conversación cerrada" : "Escribe un mensaje…"} placeholderTextColor="#8C9991" style={styles.input} multiline maxLength={1200} editable={!isClosed} onSubmitEditing={send} accessibilityLabel="Mensaje" />
				<Pressable onPress={send} disabled={!draft.trim() || isClosed} style={[styles.sendButton, (!draft.trim() || isClosed) && styles.sendDisabled]} accessibilityRole="button" accessibilityLabel="Enviar mensaje"><Text style={styles.sendGlyph}>↑</Text></Pressable>
			</View>
		</View>
	);
}

