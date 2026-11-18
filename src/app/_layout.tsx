/**
 * Configuración raíz de Expo Router y proveedor de estado global.
 */
import { Stack } from "expo-router";
import { AppProvider } from "@/context/AppProvider";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppProvider>
  );
}
