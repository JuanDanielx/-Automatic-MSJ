/**
 * Estilos de la pantalla de acceso.
 */

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  keyboard: { flex: 1, backgroundColor: "#F4F7F3" },
  scroll: { flexGrow: 1, width: "100%", maxWidth: 620, alignSelf: "center", paddingHorizontal: 26, paddingTop: 24, paddingBottom: 26 },
  topline: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  kicker: { color: "#60716B", fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  version: { color: "#8A9792", fontSize: 11, fontWeight: "700" },
  brandMark: { marginTop: 48, width: 54, height: 54, borderRadius: 18, backgroundColor: "#163D37", alignItems: "center", justifyContent: "center", position: "relative" },
  brandLetters: { color: "#F4F7F3", fontSize: 17, fontWeight: "900", letterSpacing: 0.5 },
  brandDot: { position: "absolute", right: 7, top: 7, width: 8, height: 8, borderRadius: 4, backgroundColor: "#D3E76B" },
  title: { marginTop: 22, color: "#17332E", fontSize: 36, lineHeight: 40, fontWeight: "800", letterSpacing: -0.5 },
  subtitle: { marginTop: 12, maxWidth: 410, color: "#60716B", fontSize: 15, lineHeight: 23 },
  form: { marginTop: 32, padding: 20, borderRadius: 8, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E1E9E3" },
  label: { marginTop: 10, marginBottom: 9, color: "#6E7D76", fontSize: 10, fontWeight: "800", letterSpacing: 1.2 },
  segment: { flexDirection: "row", padding: 4, borderRadius: 7, backgroundColor: "#F0F4EF", marginBottom: 16 },
  segmentOption: { flex: 1, minHeight: 42, borderRadius: 5, alignItems: "center", justifyContent: "center" },
  segmentActive: { backgroundColor: "#163D37" },
  segmentText: { color: "#64746D", fontSize: 13, fontWeight: "700" },
  segmentTextActive: { color: "#FFFFFF" },
  input: { height: 48, borderWidth: 1, borderColor: "#DCE5DE", borderRadius: 6, paddingHorizontal: 13, color: "#17332E", fontSize: 14 },
  teacherOptions: { gap: 7 },
  teacherOption: { minHeight: 58, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, borderWidth: 1, borderColor: "#E4EAE5", borderRadius: 6 },
  teacherOptionActive: { borderColor: "#27685C", backgroundColor: "#F5F9F4" },
  teacherInitials: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#E7EFE5", alignItems: "center", justifyContent: "center" },
  teacherInitialsText: { color: "#28594E", fontSize: 11, fontWeight: "800" },
  teacherCopy: { flex: 1, paddingHorizontal: 10 },
  teacherName: { color: "#213C35", fontSize: 13, fontWeight: "700" },
  teacherSubject: { marginTop: 2, color: "#7A8881", fontSize: 11 },
  radio: { width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: "#AFBBB3" },
  radioActive: { borderWidth: 5, borderColor: "#27685C" },
  submit: { marginTop: 18, minHeight: 50, paddingHorizontal: 16, borderRadius: 6, backgroundColor: "#173F38", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  submitText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  submitArrow: { color: "#D3E76B", fontSize: 20, fontWeight: "700" },
  helper: { marginTop: 11, color: "#89968F", fontSize: 11, textAlign: "center" },
  footer: { marginTop: "auto", paddingTop: 26, color: "#89968F", fontSize: 9, fontWeight: "800", letterSpacing: 1.4 },
});
