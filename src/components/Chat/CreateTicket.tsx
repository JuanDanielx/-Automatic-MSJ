import { Redirect } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
/**
 * Formulario para crear una consulta y añadir adjuntos simulados.
 */
import { useAppContext } from "@/context/AppProvider";
import type { User } from "@/types/app";
import styles from "@/components/Chat/CreateTicket.styles";

interface TicketsProps {
	teachers: User[];
	initialTeacherId?: string;
	onCreated: (ticketId: string) => void;
	onCancel: () => void;
}

const simulatedFiles = ["apuntes-clase.pdf", "captura-ejercicio.png", "borrador.docx"];

export default function CreateTicket({ teachers, initialTeacherId, onCreated, onCancel }: TicketsProps = { teachers: [], onCreated: () => {}, onCancel: () => {} }) {
	const { currentUser, createTicket, tickets } = useAppContext();
	const [teacherId, setTeacherId] = useState(initialTeacherId ?? teachers.find((teacher) => teacher.isAvailable)?.id ?? teachers[0]?.id ?? "");
	const [subject, setSubject] = useState("");
	const [description, setDescription] = useState("");
	const [attachments, setAttachments] = useState<string[]>([]);
	const [error, setError] = useState("");
	if (!currentUser) return <Redirect href="/" />;
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

