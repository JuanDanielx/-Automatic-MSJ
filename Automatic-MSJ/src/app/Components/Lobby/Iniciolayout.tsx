import type { PropsWithChildren } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { User } from "../../hooks/UseMSJs";

export type MainTab = "directorio" | "bandeja" | "perfil";

interface IniciolayoutProps extends PropsWithChildren {
	user: User;
	activeTab: MainTab;
	pendingCount: number;
	onNavigate: (tab: MainTab) => void;
	onLogout: () => void;
}

const tabs: { id: MainTab; label: string; glyph: string }[] = [
	{ id: "directorio", label: "Directorio", glyph: "⌕" },
	{ id: "bandeja", label: "Bandeja", glyph: "▤" },
	{ id: "perfil", label: "Perfil", glyph: "◉" },
];

export default function Iniciolayout({ user, activeTab, pendingCount, onNavigate, onLogout, children }: IniciolayoutProps) {
	const visibleTabs = user.role === "Docente"
		? [{ id: "bandeja" as const, label: "Atención", glyph: "▤" }, { id: "perfil" as const, label: "Perfil", glyph: "◉" }]
		: tabs;

	return (
		<View style={styles.screen}>
			<View style={styles.topbar}>
				<View style={styles.brand}><View style={styles.brandMark}><Text style={styles.brandLetters}>AM</Text></View><View><Text style={styles.brandName}>automatic msj</Text><Text style={styles.brandCaption}>CAMPUS CONNECT</Text></View></View>
				<View style={styles.topActions}><View style={styles.roleBadge}><View style={styles.roleDot} /><Text style={styles.roleText}>{user.role.toUpperCase()}</Text></View><Pressable onPress={onLogout} style={styles.logout} accessibilityRole="button" accessibilityLabel="Cerrar sesión"><Text style={styles.logoutGlyph}>↗</Text></Pressable></View>
			</View>
			<ScrollView style={styles.content} contentContainerStyle={styles.contentInner} keyboardShouldPersistTaps="handled">
				<View style={styles.welcomeRow}><View><Text style={styles.welcomeKicker}>ESPACIO DE TRABAJO</Text><Text style={styles.welcomeName}>Hola, {user.name.split(" ")[0]}</Text></View><View style={styles.dayStamp}><Text style={styles.dayNumber}>{new Date().getDate().toString().padStart(2, "0")}</Text><Text style={styles.dayMonth}>{new Date().toLocaleDateString("es", { month: "short" }).toUpperCase()}</Text></View></View>
				{children}
			</ScrollView>
			<View style={styles.nav}>
				{visibleTabs.map((tab) => (
					<Pressable key={tab.id} onPress={() => onNavigate(tab.id)} style={styles.navItem} accessibilityRole="button" accessibilityState={{ selected: activeTab === tab.id }}>
						<View style={[styles.navIconWrap, activeTab === tab.id && styles.navIconActive]}><Text style={[styles.navGlyph, activeTab === tab.id && styles.navGlyphActive]}>{tab.glyph}</Text>{tab.id === "bandeja" && pendingCount > 0 && <View style={styles.countDot}><Text style={styles.countText}>{pendingCount > 9 ? "9+" : pendingCount}</Text></View>}</View>
						<Text style={[styles.navLabel, activeTab === tab.id && styles.navLabelActive]}>{tab.label}</Text>
					</Pressable>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: "#F4F7F3" },
	topbar: { minHeight: 66, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "#E1E9E3", backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
	brand: { flexDirection: "row", alignItems: "center", gap: 10 },
	brandMark: { width: 34, height: 34, borderRadius: 11, backgroundColor: "#173F38", alignItems: "center", justifyContent: "center" },
	brandLetters: { color: "#FFFFFF", fontSize: 11, fontWeight: "900" },
	brandName: { color: "#17332E", fontSize: 14, fontWeight: "800" },
	brandCaption: { marginTop: 2, color: "#87948D", fontSize: 8, fontWeight: "800", letterSpacing: 1.1 },
	topActions: { flexDirection: "row", alignItems: "center", gap: 11 },
	roleBadge: { height: 28, paddingHorizontal: 9, borderRadius: 14, backgroundColor: "#EDF3E9", flexDirection: "row", alignItems: "center", gap: 6 },
	roleDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#9AAE36" },
	roleText: { color: "#53665D", fontSize: 9, fontWeight: "800", letterSpacing: 0.7 },
	logout: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#F3F6F2", alignItems: "center", justifyContent: "center" },
	logoutGlyph: { color: "#496159", fontSize: 18, transform: [{ rotate: "45deg" }] },
	content: { flex: 1 },
	contentInner: { width: "100%", maxWidth: 760, alignSelf: "center", padding: 20, paddingBottom: 32 },
	welcomeRow: { marginBottom: 22, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
	welcomeKicker: { color: "#819088", fontSize: 9, fontWeight: "800", letterSpacing: 1.4 },
	welcomeName: { marginTop: 5, color: "#17332E", fontSize: 26, fontWeight: "800", letterSpacing: -0.4 },
	dayStamp: { width: 45, height: 45, borderRadius: 7, backgroundColor: "#E8EFE5", alignItems: "center", justifyContent: "center" },
	dayNumber: { color: "#244D43", fontSize: 16, fontWeight: "800" },
	dayMonth: { marginTop: 1, color: "#718279", fontSize: 8, fontWeight: "800" },
	nav: { minHeight: 68, paddingBottom: 4, paddingHorizontal: 18, backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: "#E1E9E3", flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	navItem: { width: 88, alignItems: "center", justifyContent: "center", gap: 3 },
	navIconWrap: { minWidth: 46, height: 30, paddingHorizontal: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", position: "relative" },
	navIconActive: { backgroundColor: "#E7EFE5" },
	navGlyph: { color: "#839088", fontSize: 20, lineHeight: 24 },
	navGlyphActive: { color: "#1F594D" },
	countDot: { position: "absolute", top: -3, right: 2, minWidth: 15, height: 15, paddingHorizontal: 3, borderRadius: 8, backgroundColor: "#C95C3E", alignItems: "center", justifyContent: "center" },
	countText: { color: "#FFFFFF", fontSize: 8, fontWeight: "800" },
	navLabel: { color: "#89958E", fontSize: 10, fontWeight: "600" },
	navLabelActive: { color: "#244D43", fontWeight: "800" },
});
