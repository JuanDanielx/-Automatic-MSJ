/**
 * Estilos de la bandeja, filtros y etiquetas de estado.
 */

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  kicker: { color: "#819088", fontSize: 9, fontWeight: "800", letterSpacing: 1.4 },
  headingRow: { marginTop: 5, marginBottom: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { color: "#17332E", fontSize: 23, fontWeight: "800" },
  subtitle: { marginTop: 4, color: "#738179", fontSize: 11 },
  total: { width: 52, height: 49, borderRadius: 6, backgroundColor: "#E7EFE5", alignItems: "center", justifyContent: "center" },
  totalNumber: { color: "#315D50", fontSize: 16, fontWeight: "800" },
  totalLabel: { color: "#87948C", fontSize: 7, fontWeight: "800", letterSpacing: 0.7 },
  filters: { gap: 7, paddingBottom: 13 },
  filter: { minHeight: 31, paddingHorizontal: 11, borderWidth: 1, borderColor: "#E0E7E1", borderRadius: 16, backgroundColor: "#FFFFFF", justifyContent: "center" },
  filterActive: { backgroundColor: "#173F38", borderColor: "#173F38" },
  filterText: { color: "#718078", fontSize: 9, fontWeight: "700" },
  filterTextActive: { color: "#FFFFFF" },
  ticketList: { gap: 9 },
  ticketCard: { padding: 14, borderRadius: 7, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E9E3" },
  ticketTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  ticketNumber: { color: "#87948C", fontSize: 10, fontWeight: "800", letterSpacing: 0.7 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { fontSize: 9, fontWeight: "800" },
  waiting: { backgroundColor: "#F4EEDB" },
  review: { backgroundColor: "#E2EEF0" },
  answered: { backgroundColor: "#E6F0E2" },
  closed: { backgroundColor: "#ECEFED" },
  subject: { marginTop: 10, color: "#233E36", fontSize: 14, lineHeight: 19, fontWeight: "800" },
  description: { marginTop: 4, color: "#79867F", fontSize: 10, lineHeight: 15 },
  cardBottom: { marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#EDF1ED", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  counterpartLabel: { color: "#98A39C", fontSize: 7, fontWeight: "800", letterSpacing: 0.8 },
  counterpart: { marginTop: 3, color: "#53665D", fontSize: 10, fontWeight: "700" },
  cardMeta: { alignItems: "flex-end", gap: 3 },
  queue: { color: "#9A792C", fontSize: 9, fontWeight: "800" },
  updated: { color: "#55786B", fontSize: 9, fontWeight: "700" },
  empty: { padding: 30, marginTop: 8, borderRadius: 7, backgroundColor: "#FFFFFF", alignItems: "center", borderWidth: 1, borderColor: "#E2E9E3" },
  emptyMark: { color: "#8FA68A", fontSize: 28 },
  emptyTitle: { marginTop: 8, color: "#34564A", fontSize: 14, fontWeight: "800" },
  emptyCopy: { marginTop: 5, color: "#829087", fontSize: 10, textAlign: "center" },
});
