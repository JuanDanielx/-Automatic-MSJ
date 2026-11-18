import { Pressable, Text, View } from "react-native";
/**
 * Directorio de docentes disponibles para iniciar una consulta.
 */
import type { User } from "@/types/app";
import styles from "@/components/Directory/Directory.styles";

interface DirectoryProps {
	teachers: User[];
	onCreateTicket: (teacherId: string) => void;
}

export default function Screen({ teachers, onCreateTicket }: DirectoryProps = { teachers: [], onCreateTicket: () => {} }) {
	const availableCount = teachers.filter((teacher) => teacher.isAvailable).length;

	return (
		<View>
			<View style={styles.introRow}><View><Text style={styles.sectionTitle}>Directorio docente</Text><Text style={styles.sectionSub}>Encuentra a la persona indicada para tu consulta.</Text></View><View style={styles.counter}><Text style={styles.counterNumber}>{availableCount}</Text><Text style={styles.counterLabel}>DISPONIBLES</Text></View></View>
			<View style={styles.subjectStrip}><Text style={styles.subjectGlyph}>✳</Text><Text style={styles.subjectText}>{teachers.length} áreas académicas · atención directa</Text></View>
			<View style={styles.teacherList}>
				{teachers.map((teacher, index) => (
					<View key={teacher.id} style={styles.card}>
						<View style={styles.cardTop}><View style={[styles.avatar, index % 2 === 1 && styles.avatarAlt]}><Text style={styles.avatarText}>{teacher.initials}</Text></View><View style={styles.identity}><Text style={styles.name}>{teacher.name}</Text><Text style={styles.subject}>{teacher.subject}</Text></View><View style={[styles.availabilityDot, teacher.isAvailable ? styles.online : styles.offline]} /></View>
						<View style={styles.rule} />
						<View style={styles.scheduleRow}><Text style={styles.scheduleIcon}>◷</Text><Text style={styles.schedule}>{teacher.officeHours}</Text><Text style={[styles.status, teacher.isAvailable ? styles.statusOn : styles.statusOff]}>{teacher.isAvailable ? "Activo" : "Inactivo"}</Text></View>
						<Pressable onPress={() => onCreateTicket(teacher.id)} style={styles.action} accessibilityRole="button"><Text style={styles.actionText}>{teacher.isAvailable ? "Hacer una consulta" : "Dejar en la cola"}</Text><Text style={styles.actionArrow}>→</Text></Pressable>
					</View>
				))}
			</View>
			<View style={styles.note}><Text style={styles.noteMark}>i</Text><Text style={styles.noteText}>Puedes enviar tu consulta en cualquier momento. La posición se calcula según el orden de llegada.</Text></View>
		</View>
	);
}

