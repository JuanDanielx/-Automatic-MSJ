import { useState } from "react";
import { Redirect } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useMSJs, type Ticket } from "../../hooks/UseMSJs";

export default function Chat({ ticket }: { ticket?: Ticket } = {}) {
	const { currentUser, addMessage } = useMSJs();
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

const styles = StyleSheet.create({
	wrapper: { flex: 1, minHeight: 280 },
	messages: { flex: 1 },
	messageContent: { padding: 14, gap: 10 },
	firstMessage: { alignSelf: "flex-start", maxWidth: "90%", padding: 12, borderRadius: 7, backgroundColor: "#EEF3EC", borderLeftWidth: 2, borderLeftColor: "#B1C35B" },
	firstLabel: { color: "#75846E", fontSize: 8, fontWeight: "800", letterSpacing: 0.9 },
	firstBody: { marginTop: 5, color: "#4E6257", fontSize: 11, lineHeight: 17 },
	messageRow: { flexDirection: "row", justifyContent: "flex-start" },
	messageRowMine: { justifyContent: "flex-end" },
	bubble: { maxWidth: "86%", paddingHorizontal: 12, paddingTop: 9, paddingBottom: 7, borderRadius: 8 },
	bubbleMine: { backgroundColor: "#1F594D", borderBottomRightRadius: 2 },
	bubbleOther: { backgroundColor: "#F0F3EF", borderBottomLeftRadius: 2 },
	sender: { color: "#60746A", fontSize: 9, fontWeight: "800" },
	senderMine: { color: "#D3E76B" },
	body: { marginTop: 4, color: "#30483D", fontSize: 12, lineHeight: 18 },
	bodyMine: { color: "#FFFFFF" },
	time: { marginTop: 4, color: "#8B9990", fontSize: 8, textAlign: "right" },
	timeMine: { color: "#BDD1C6" },
	closedNotice: { padding: 9, color: "#89958E", fontSize: 10, textAlign: "center" },
	composer: { minHeight: 54, padding: 7, borderWidth: 1, borderColor: "#DEE6DF", borderRadius: 7, backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", gap: 8 },
	composerDisabled: { backgroundColor: "#F0F3EF" },
	input: { flex: 1, maxHeight: 88, paddingHorizontal: 7, paddingVertical: 8, color: "#263F36", fontSize: 12 },
	sendButton: { width: 36, height: 36, borderRadius: 6, backgroundColor: "#1F594D", alignItems: "center", justifyContent: "center" },
	sendDisabled: { backgroundColor: "#AEBBB2" },
	sendGlyph: { color: "#FFFFFF", fontSize: 21, fontWeight: "700" },
});
