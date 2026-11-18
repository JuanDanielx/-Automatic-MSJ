/**
 * Estilos del directorio docente.
 */

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  introRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  sectionTitle: { color: "#17332E", fontSize: 21, fontWeight: "800" },
  sectionSub: { marginTop: 4, color: "#738179", fontSize: 12, lineHeight: 18 },
  counter: { minWidth: 75, height: 55, borderRadius: 6, backgroundColor: "#E7EFE5", alignItems: "center", justifyContent: "center" },
  counterNumber: { color: "#235347", fontSize: 19, fontWeight: "800" },
  counterLabel: { marginTop: 1, color: "#718278", fontSize: 7, fontWeight: "800", letterSpacing: 0.8 },
  subjectStrip: { marginTop: 16, marginBottom: 12, minHeight: 38, paddingHorizontal: 11, backgroundColor: "#EDF2EC", flexDirection: "row", alignItems: "center", gap: 8 },
  subjectGlyph: { color: "#738C38", fontSize: 15 },
  subjectText: { color: "#68776F", fontSize: 11, fontWeight: "600" },
  teacherList: { gap: 10 },
  card: { padding: 14, borderRadius: 7, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E9E3" },
  cardTop: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 42, height: 42, borderRadius: 14, backgroundColor: "#DDE9DF", alignItems: "center", justifyContent: "center" },
  avatarAlt: { backgroundColor: "#EAE6D4" },
  avatarText: { color: "#31594D", fontSize: 12, fontWeight: "900" },
  identity: { flex: 1, paddingLeft: 11 },
  name: { color: "#213C35", fontSize: 14, fontWeight: "800" },
  subject: { marginTop: 3, color: "#7A8881", fontSize: 11 },
  availabilityDot: { width: 9, height: 9, borderRadius: 5, marginRight: 2 },
  online: { backgroundColor: "#80A342" },
  offline: { backgroundColor: "#C2CBC4" },
  rule: { height: 1, backgroundColor: "#EDF1ED", marginVertical: 11 },
  scheduleRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  scheduleIcon: { color: "#85938B", fontSize: 16 },
  schedule: { flex: 1, color: "#60716A", fontSize: 11 },
  status: { fontSize: 10, fontWeight: "800" },
  statusOn: { color: "#4E793E" },
  statusOff: { color: "#9AA59E" },
  action: { marginTop: 12, minHeight: 38, paddingHorizontal: 11, borderRadius: 5, backgroundColor: "#F3F7F1", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  actionText: { color: "#315D50", fontSize: 11, fontWeight: "800" },
  actionArrow: { color: "#315D50", fontSize: 16 },
  note: { marginTop: 14, padding: 11, borderLeftWidth: 2, borderLeftColor: "#B8C85A", backgroundColor: "#F0F4E9", flexDirection: "row", gap: 9 },
  noteMark: { color: "#74833C", fontSize: 12, fontWeight: "900" },
  noteText: { flex: 1, color: "#6E796B", fontSize: 10, lineHeight: 15 },
});
