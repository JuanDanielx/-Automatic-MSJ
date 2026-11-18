import { Redirect } from "expo-router";
import { Pressable, Switch, Text, View } from "react-native";
/**
 * Perfil del usuario y controles exclusivos para docentes.
 */
import type { User } from "@/types/app";
import styles from "@/components/Directory/Profile.styles";

interface ProfileProps {
	user: User;
	activeTicketCount: number;
	onToggleAvailability: () => void;
}

export default function Profile(props?: ProfileProps) {
	if (!props?.user) return <Redirect href="/" />;
	const { user, activeTicketCount, onToggleAvailability } = props;
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

