/**
 * Marco principal con cabecera, contenido y navegación inferior.
 */
import type { PropsWithChildren } from "react";
import { Redirect } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import type { User } from "@/types/app";
import styles from "@/components/Lobby/Iniciolayout.styles";

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

export default function Iniciolayout(props?: IniciolayoutProps) {
	if (!props?.user) return <Redirect href="/" />;
	const { user, activeTab, pendingCount, onNavigate, onLogout, children } = props;
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

