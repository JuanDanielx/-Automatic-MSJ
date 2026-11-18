import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
/**
 * Pantalla de inicio de sesión de demostración.
 * Permite elegir entre estudiante y perfil docente.
 */
import type { User, UserRole } from "@/types/app";
import styles from "@/components/Lobby/Login.styles";

interface LoginProps {
	teachers: User[];
	onLogin: (role: UserRole, name: string, teacherId?: string) => void;
}

export default function Login({ teachers, onLogin }: LoginProps = { teachers: [], onLogin: () => {} }) {
	const [role, setRole] = useState<UserRole>("Estudiante");
	const [name, setName] = useState("");
	const [teacherId, setTeacherId] = useState(teachers[0]?.id ?? "");

	return (
		<KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === "ios" ? "padding" : undefined}>
			<ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
				<View style={styles.topline}><Text style={styles.kicker}>CAMPUS · ATENCIÓN ACADÉMICA</Text><Text style={styles.version}>01 / 24</Text></View>
				<View style={styles.brandMark}><Text style={styles.brandLetters}>AM</Text><View style={styles.brandDot} /></View>
				<Text style={styles.title}>Una conversación{ "\n" }puede destrabarlo todo.</Text>
				<Text style={styles.subtitle}>Conecta con tu equipo docente y sigue cada consulta desde un solo lugar.</Text>

				<View style={styles.form}>
					<Text style={styles.label}>INGRESA COMO</Text>
					<View style={styles.segment}>
						{(["Estudiante", "Docente"] as const).map((option) => (
							<Pressable key={option} onPress={() => setRole(option)} style={[styles.segmentOption, role === option && styles.segmentActive]} accessibilityRole="button" accessibilityState={{ selected: role === option }}>
								<Text style={[styles.segmentText, role === option && styles.segmentTextActive]}>{option}</Text>
							</Pressable>
						))}
					</View>

					{role === "Estudiante" ? (
						<>
							<Text style={styles.label}>TU NOMBRE</Text>
							<TextInput value={name} onChangeText={setName} placeholder="Ej. Valentina Cruz" placeholderTextColor="#8A9792" style={styles.input} autoCapitalize="words" returnKeyType="go" onSubmitEditing={() => onLogin(role, name)} />
						</>
					) : (
						<>
							<Text style={styles.label}>SELECCIONA TU PERFIL</Text>
							<View style={styles.teacherOptions}>
								{teachers.map((teacher) => (
									<Pressable key={teacher.id} onPress={() => setTeacherId(teacher.id)} style={[styles.teacherOption, teacherId === teacher.id && styles.teacherOptionActive]} accessibilityRole="button" accessibilityState={{ selected: teacherId === teacher.id }}>
										<View style={styles.teacherInitials}><Text style={styles.teacherInitialsText}>{teacher.initials}</Text></View>
										<View style={styles.teacherCopy}><Text style={styles.teacherName}>{teacher.name}</Text><Text style={styles.teacherSubject}>{teacher.subject}</Text></View>
										<View style={[styles.radio, teacherId === teacher.id && styles.radioActive]} />
									</Pressable>
								))}
							</View>
						</>
					)}

					<Pressable onPress={() => onLogin(role, name, teacherId)} style={styles.submit} accessibilityRole="button">
						<Text style={styles.submitText}>Entrar al campus</Text><Text style={styles.submitArrow}>↗</Text>
					</Pressable>
					<Text style={styles.helper}>Acceso de demostración · no necesitas contraseña</Text>
				</View>
				<Text style={styles.footer}>AUTOMATIC MSJ  /  MENSAJERÍA ACADÉMICA</Text>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

