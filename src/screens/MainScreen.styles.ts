/**
 * Estilos de la composición principal y acciones de la bandeja.
 */

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  formSurface: { padding: 15, borderRadius: 7, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E9E3" },
  inboxAction: { marginBottom: 14, minHeight: 65, paddingHorizontal: 13, paddingVertical: 10, borderRadius: 6, backgroundColor: "#E8EFE5", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  inboxActionCopy: { flex: 1 },
  inboxActionTitle: { color: "#315448", fontSize: 11, fontWeight: "800" },
  inboxActionSubtitle: { marginTop: 4, color: "#78867A", fontSize: 9 },
  createButton: { minHeight: 34, paddingHorizontal: 11, borderRadius: 5, backgroundColor: "#173F38", alignItems: "center", justifyContent: "center" },
  createButtonText: { color: "#FFFFFF", fontSize: 9, fontWeight: "800" },
});
