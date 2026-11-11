import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useMSJs, type User } from "../../hooks/UseMSJs";

interface TicketsProps {
	teachers: User[];
	initialTeacherId?: string;
	onCreated: (ticketId: string) => void;
	onCancel: () => void;
}

const simulatedFiles = ["apuntes-clase.pdf", "captura-ejercicio.png", "borrador.docx"];

export default function Tickets({ teachers, initialTeacherId, onCreated, onCancel }: TicketsProps) {
	const { currentUser, createTicket, tickets } = useMSJs();
	const [teacherId, setTeacherId] = useState(initialTeacherId ?? teachers.find((teacher) => teacher.isAvailable)?.id ?? teachers[0]?.id ?? "");
	const [subject, setSubject] = useState("");
	const [description, setDescription] = useState("");
	const [attachments, setAttachments] = useState<string[]>([]);
	const [error, setError] = useState("");
	const teacher = teachers.find((item) => item.id === teacherId);
	const queueLength = tickets.filter((ticket) => ticket.teacherId === teacherId && ticket.status === "En espera").length;

	const addAttachment = () => {
		const next = simulatedFiles.find((file) => !attachments.includes(file));
		if (next) setAttachments((current) => [...current, next]);
	};

	const submit = () => {
		if (!currentUser || !teacher) return;
		if (subject.trim().length < 4 || description.trim().length < 12) {
			setError("Agrega un asunto y una descripción de al menos 12 caracteres.");
			return;
		}
		const ticket = createTicket({ student: currentUser, teacher, subject, description, attachments });
		onCreated(ticket.id);
	};

	return (
		<View>
			<View style={styles.topRow}><Pressable onPress={onCancel} style={styles.back}><Text style={styles.backGlyph}>‹</Text></Pressable><View style={styles.topCopy}><Text style={styles.kicker}>NUEVA SOLICITUD</Text><Text style={styles.title}>Cuéntanos qué necesitas</Text></View></View>
			<Text style={styles.label}>ÁREA DOCENTE</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.teachers}>
				{teachers.map((item) => <Pressable key={item.id} onPress={() => setTeacherId(item.id)} style={[styles.teacherChoice, teacherId === item.id && styles.teacherChoiceActive]} accessibilityRole="button" accessibilityState={{ selected: teacherId === item.id }}><View style={styles.teacherLine}><Text style={styles.teacherInitials}>{item.initials}</Text><View style={[styles.dot, item.isAvailable ? styles.dotOn : styles.dotOff]} /></View><Text style={styles.teacherName} numberOfLines={1}>{item.name.split(" ")[0]}</Text><Text style={styles.teacherSubject} numberOfLines={1}>{item.subject}</Text></Pressable>)}
			</ScrollView>
			<View style={styles.queueHint}><Text style={styles.queueGlyph}>↗</Text><Text style={styles.queueText}>{teacher?.isAvailable ? `${queueLength} consulta${queueLength === 1 ? "" : "s"} antes en la cola` : "Docente inactivo · tu consulta quedará en cola"}</Text><Text style={styles.queueOrder}># {queueLength + 1}</Text></View>

			<Text style={styles.label}>ASUNTO</Text>
			<TextInput value={subject} onChangeText={(value) => { setSubject(value); setError(""); }} placeholder="Ej. Duda con la práctica 3" placeholderTextColor="#929D96" style={styles.input} maxLength={90} />
			<Text style={styles.label}>DESCRIPCIÓN</Text>
			<TextInput value={description} onChangeText={(value) => { setDescription(value); setError(""); }} placeholder="Explica qué has intentado y en qué punto te atascaste…" placeholderTextColor="#929D96" style={[styles.input, styles.descriptionInput]} multiline textAlignVertical="top" maxLength={900} />
			<View style={styles.fieldFoot}><Text style={styles.helper}>Incluye el contexto necesario para que puedan ayudarte.</Text><Text style={styles.charCount}>{description.length}/900</Text></View>

			<Text style={styles.label}>ARCHIVOS DE APOYO <Text style={styles.optional}>(OPCIONAL)</Text></Text>
			<View style={styles.attachments}>
				{attachments.map((file) => <View key={file} style={styles.attachment}><Text style={styles.fileGlyph}>▧</Text><Text style={styles.fileName} numberOfLines={1}>{file}</Text><Pressable onPress={() => setAttachments((current) => current.filter((item) => item !== file))} accessibilityRole="button" accessibilityLabel={`Quitar ${file}`}><Text style={styles.removeFile}>×</Text></Pressable></View>)}
				{attachments.length < simulatedFiles.length && <Pressable onPress={addAttachment} style={styles.attachButton} accessibilityRole="button"><Text style={styles.attachGlyph}>＋</Text><Text style={styles.attachText}>Adjuntar archivo</Text></Pressable>}
			</View>
			<Text style={styles.simulatedNote}>Adjuntos de muestra para esta demostración.</Text>
			{error ? <Text style={styles.error}>{error}</Text> : null}
			<View style={styles.actions}><Pressable onPress={onCancel} style={styles.cancel}><Text style={styles.cancelText}>Cancelar</Text></Pressable><Pressable onPress={submit} style={styles.submit} accessibilityRole="button"><Text style={styles.submitText}>Crear ticket</Text><Text style={styles.submitArrow}>→</Text></Pressable></View>
		</View>
	);
}

const styles = StyleSheet.create({
	topRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 17 },
	back: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#E9F0E7", alignItems: "center", justifyContent: "center" },
	backGlyph: { marginTop: -4, color: "#315D50", fontSize: 27 },
	topCopy: { flex: 1 },
	kicker: { color: "#819088", fontSize: 8, fontWeight: "800", letterSpacing: 1.3 },
	title: { marginTop: 3, color: "#17332E", fontSize: 20, fontWeight: "800" },
	label: { marginTop: 14, marginBottom: 7, color: "#74837A", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
	teachers: { gap: 7, paddingBottom: 3 },
	teacherChoice: { width: 90, height: 78, padding: 8, borderRadius: 6, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E1E8E2" },
	teacherChoiceActive: { borderColor: "#568071", backgroundColor: "#F0F5EF" },
	teacherLine: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	teacherInitials: { color: "#315D50", fontSize: 11, fontWeight: "900" },
	dot: { width: 7, height: 7, borderRadius: 4 },
	dotOn: { backgroundColor: "#87A448" },
	dotOff: { backgroundColor: "#C2CBC4" },
	teacherName: { marginTop: 8, color: "#344B40", fontSize: 10, fontWeight: "800" },
	teacherSubject: { marginTop: 2, color: "#829087", fontSize: 8 },
	queueHint: { minHeight: 35, marginTop: 8, paddingHorizontal: 10, borderRadius: 5, backgroundColor: "#F0F4E9", flexDirection: "row", alignItems: "center", gap: 7 },
	queueGlyph: { color: "#76883D", fontSize: 13 },
	queueText: { flex: 1, color: "#68776B", fontSize: 9 },
	queueOrder: { color: "#536A50", fontSize: 10, fontWeight: "800" },
	input: { minHeight: 43, paddingHorizontal: 11, borderRadius: 5, borderWidth: 1, borderColor: "#DCE5DE", backgroundColor: "#FFFFFF", color: "#30483D", fontSize: 11 },
	descriptionInput: { minHeight: 106, paddingTop: 10 },
	fieldFoot: { flexDirection: "row", justifyContent: "space-between", gap: 8, marginTop: 5 },
	helper: { flex: 1, color: "#8A9690", fontSize: 9 },
	charCount: { color: "#929D96", fontSize: 8 },
	optional: { color: "#A2ACA5", fontSize: 8, fontWeight: "600" },
	attachments: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
	attachment: { maxWidth: "100%", minHeight: 32, paddingHorizontal: 8, borderRadius: 5, backgroundColor: "#E8F0E7", flexDirection: "row", alignItems: "center", gap: 6 },
	fileGlyph: { color: "#5E7D67", fontSize: 12 },
	fileName: { maxWidth: 180, color: "#526F5F", fontSize: 9, fontWeight: "700" },
	removeFile: { color: "#7F8F84", fontSize: 17 },
	attachButton: { minHeight: 32, paddingHorizontal: 9, borderRadius: 5, borderWidth: 1, borderStyle: "dashed", borderColor: "#C4D0C6", flexDirection: "row", alignItems: "center", gap: 5 },
	attachGlyph: { color: "#557765", fontSize: 15 },
	attachText: { color: "#657B6C", fontSize: 9, fontWeight: "700" },
	simulatedNote: { marginTop: 5, color: "#98A39C", fontSize: 8 },
	error: { marginTop: 10, color: "#A33E35", fontSize: 10, fontWeight: "700" },
	actions: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 8, marginTop: 18 },
	cancel: { minHeight: 42, paddingHorizontal: 14, borderRadius: 5, alignItems: "center", justifyContent: "center" },
	cancelText: { color: "#75837B", fontSize: 10, fontWeight: "700" },
	submit: { minHeight: 42, minWidth: 132, paddingHorizontal: 12, borderRadius: 5, backgroundColor: "#173F38", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
	submitText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" },
	submitArrow: { color: "#D3E76B", fontSize: 17 },
});
