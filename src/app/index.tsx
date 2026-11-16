import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ChatLayout from "./Components/ChatMSJ/chatlayout";
import Tickets from "./Components/ChatMSJ/tickets";
import Bandeja from "./Components/Directorio/bandeja";
import Profile from "./Components/Directorio/profile";
import Directory from "./Components/Directorio/Screen";
import Iniciolayout, { type MainTab } from "./Components/Lobby/Iniciolayout";
import Login from "./Components/Lobby/Login";
import { useSelectChat } from "./hooks/SelectChat";
import { useLogin } from "./hooks/Uselogin";
import { useTickets } from "./hooks/UseTickets";

export default function Index() {
  const { currentUser: sessionUser, login, logout, teachers } = useLogin();
  const { myTickets, getQueuePosition, setAvailability } = useTickets();
  const { selectedTicket, selectTicket, clearSelection } = useSelectChat();
  const [activeTab, setActiveTab] = useState<MainTab>("directorio");
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [preferredTeacherId, setPreferredTeacherId] = useState<string | undefined>();

  const currentUser = sessionUser?.role === "Docente"
    ? teachers.find((teacher) => teacher.id === sessionUser.id) ?? sessionUser
    : sessionUser;

  if (!currentUser) {
    return <Login teachers={teachers} onLogin={(role, name, teacherId) => {
      login(role, name, teacherId);
      setActiveTab(role === "Docente" ? "bandeja" : "directorio");
    }} />;
  }

  const handleCreateTicket = (teacherId?: string) => {
    setPreferredTeacherId(teacherId);
    setIsCreatingTicket(true);
  };

  const openTicket = (ticketId: string) => {
    selectTicket(ticketId);
    setIsCreatingTicket(false);
  };

  const navigate = (tab: MainTab) => {
    clearSelection();
    setIsCreatingTicket(false);
    setActiveTab(tab);
  };

  const pendingCount = myTickets.filter((ticket) => ticket.status === "En espera").length;

  return (
    <Iniciolayout user={currentUser} activeTab={activeTab} pendingCount={pendingCount} onNavigate={navigate} onLogout={() => {
      logout();
      clearSelection();
      setIsCreatingTicket(false);
      setPreferredTeacherId(undefined);
      setActiveTab("directorio");
    }}>
      {selectedTicket ? (
        <ChatLayout ticketId={selectedTicket.id} onBack={() => clearSelection()} onClosed={() => clearSelection()} />
      ) : isCreatingTicket ? (
        <View style={styles.formSurface}><Tickets teachers={teachers} initialTeacherId={preferredTeacherId} onCancel={() => setIsCreatingTicket(false)} onCreated={openTicket} /></View>
      ) : activeTab === "directorio" && currentUser.role === "Estudiante" ? (
        <>
          <Directory teachers={teachers} onCreateTicket={handleCreateTicket} />
        </>
      ) : activeTab === "perfil" ? (
        <Profile user={currentUser} activeTicketCount={myTickets.filter((ticket) => ticket.status !== "Cerrado").length} onToggleAvailability={() => setAvailability(currentUser.id)} />
      ) : (
        <>
          {currentUser.role === "Estudiante" && (
            <View style={styles.inboxAction}>
              <View style={styles.inboxActionCopy}><Text style={styles.inboxActionTitle}>¿Tienes una nueva duda?</Text><Text style={styles.inboxActionSubtitle}>Inicia una consulta con tu equipo docente.</Text></View>
              <Pressable onPress={() => handleCreateTicket()} style={styles.createButton} accessibilityRole="button"><Text style={styles.createButtonText}>＋ Nueva</Text></Pressable>
            </View>
          )}
          <Bandeja role={currentUser.role} tickets={myTickets} queuePosition={getQueuePosition} onSelectTicket={openTicket} />
        </>
      )}
    </Iniciolayout>
  );
}

const styles = StyleSheet.create({
  formSurface: { padding: 15, borderRadius: 7, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E9E3" },
  inboxAction: { marginBottom: 14, minHeight: 65, paddingHorizontal: 13, paddingVertical: 10, borderRadius: 6, backgroundColor: "#E8EFE5", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  inboxActionCopy: { flex: 1 },
  inboxActionTitle: { color: "#315448", fontSize: 11, fontWeight: "800" },
  inboxActionSubtitle: { marginTop: 4, color: "#78867A", fontSize: 9 },
  createButton: { minHeight: 34, paddingHorizontal: 11, borderRadius: 5, backgroundColor: "#173F38", alignItems: "center", justifyContent: "center" },
  createButtonText: { color: "#FFFFFF", fontSize: 9, fontWeight: "800" },
});
