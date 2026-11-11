import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import type { User } from "../../hooks/UseMSJs";

interface ProfileProps {
	user: User;
	activeTicketCount: number;
	onToggleAvailability: () => void;
}

export default function Profile({ user, activeTicketCount, onToggleAvailability }: ProfileProps) {
	const isTeacher = user.role === "Docente";
	const available = Boolean(user.isAvailable);

	return (
		<View>
			<Text style={styles.kicker}>TU ESPACIO</Text>
			<Text style={styles.title}>Perfil</Text>
			<View style={styles.profileCard}>
				<View style={styles.avatar}><Text style={styles.avatarText}>{user.initials}</Text></View>
				<Text style={styles.name}>{user.name}</Text>
				<Text style={styles.role}>{isTeacher ? user.subject : "Estudiante · Campus"}</Text>
				<Text style={styles.email}>{user.email}</Text>
				<View style={styles.divider} />
				<View style={styles.metricRow}><View style={styles.metric}><Text style={styles.metricNumber}>{activeTicketCount}</Text><Text style={styles.metricLabel}>{isTeacher ? "EN TU COLA" : "CONSULTAS"}</Text></View><View style={styles.metricDivider} /><View style={styles.metric}><Text style={styles.metricNumber}>{isTeacher ? (available ? "Sí" : "No") : "24/7"}</Text><Text style={styles.metricLabel}>{isTeacher ? "DISPONIBLE" : "ACCESO"}</Text></View></View>
			</View>

			{isTeacher ? (
				<View style={styles.availabilityCard}>
					<View style={styles.availabilityCopy}><Text style={styles.cardTitle}>Disponibilidad</Text><Text style={styles.availabilityText}>{available ? "Estás visible en el directorio." : "Tu perfil aparece como inactivo."}</Text></View>
					<Switch value={available} onValueChange={onToggleAvailability} trackColor={{ false: "#CDD5CE", true: "#AFC45C" }} thumbColor={available ? "#315D50" : "#FFFFFF"} accessibilityLabel="Cambiar disponibilidad" />
					<View style={styles.scheduleBlock}><Text style={styles.scheduleLabel}>HORARIO DE ATENCIÓN</Text><Text style={styles.scheduleText}>{user.officeHours}</Text></View>
				</View>
			) : (
				<View style={styles.studentPanel}><Text style={styles.cardTitle}>Tu acompañamiento</Text><Text style={styles.studentCopy}>Tus consultas, archivos y respuestas quedan reunidos en la bandeja para que retomes cada conversación cuando quieras.</Text></View>
			)}

			<Pressable style={styles.infoRow} accessibilityRole="button"><Text style={styles.infoLabel}>Preferencias de notificación</Text><Text style={styles.infoArrow}>›</Text></Pressable>
			<Text style={styles.disclaimer}>CUENTA DE DEMOSTRACIÓN · LOS DATOS SE CONSERVAN DURANTE ESTA SESIÓN</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	kicker: { color: "#819088", fontSize: 9, fontWeight: "800", letterSpacing: 1.4 },
	title: { marginTop: 5, marginBottom: 17, color: "#17332E", fontSize: 23, fontWeight: "800" },
	profileCard: { padding: 20, borderRadius: 7, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E9E3", alignItems: "center" },
	avatar: { width: 68, height: 68, borderRadius: 23, backgroundColor: "#DDE9DF", alignItems: "center", justifyContent: "center" },
	avatarText: { color: "#31594D", fontSize: 20, fontWeight: "900" },
	name: { marginTop: 12, color: "#213C35", fontSize: 18, fontWeight: "800" },
	role: { marginTop: 4, color: "#63756C", fontSize: 12, fontWeight: "600" },
	email: { marginTop: 5, color: "#8A9690", fontSize: 11 },
	divider: { height: 1, width: "100%", backgroundColor: "#EDF1ED", marginVertical: 17 },
	metricRow: { width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" },
	metric: { flex: 1, alignItems: "center" },
	metricNumber: { color: "#315D50", fontSize: 18, fontWeight: "800" },
	metricLabel: { marginTop: 3, color: "#87948C", fontSize: 8, fontWeight: "800", letterSpacing: 0.8 },
	metricDivider: { width: 1, height: 30, backgroundColor: "#E5EBE5" },
	availabilityCard: { marginTop: 12, padding: 15, borderRadius: 7, backgroundColor: "#EAF1E8", flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
	availabilityCopy: { flex: 1, paddingRight: 10 },
	cardTitle: { color: "#294A40", fontSize: 13, fontWeight: "800" },
	availabilityText: { marginTop: 4, color: "#718077", fontSize: 10, lineHeight: 15 },
	scheduleBlock: { width: "100%", marginTop: 13, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#D9E4D6" },
	scheduleLabel: { color: "#819088", fontSize: 8, fontWeight: "800", letterSpacing: 1 },
	scheduleText: { marginTop: 5, color: "#425C50", fontSize: 12, fontWeight: "700" },
	studentPanel: { marginTop: 12, padding: 16, borderRadius: 7, backgroundColor: "#EAF1E8" },
	studentCopy: { marginTop: 6, color: "#6D7D73", fontSize: 11, lineHeight: 17 },
	infoRow: { marginTop: 12, minHeight: 48, paddingHorizontal: 14, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E9E3", borderRadius: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
	infoLabel: { color: "#52655B", fontSize: 11, fontWeight: "700" },
	infoArrow: { color: "#87948C", fontSize: 22 },
	disclaimer: { marginTop: 17, color: "#98A39C", fontSize: 8, lineHeight: 13, letterSpacing: 0.8, textAlign: "center" },
});
