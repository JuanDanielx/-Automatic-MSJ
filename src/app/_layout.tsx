import { Stack } from "expo-router";
import { AppProvider } from "./hooks/UseMSJs";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppProvider>
  );
}
