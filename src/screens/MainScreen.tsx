/**
 * Coordina sesión, navegación interna y pantalla activa del usuario.
 */

import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ChatLayout from "@/components/Chat/ChatLayout";
import CreateTicket from "@/components/Chat/CreateTicket";
import Inbox from "@/components/Directory/Inbox";
import Profile from "@/components/Directory/Profile";
import Directory from "@/components/Directory/Directory";
import Iniciolayout, { type MainTab } from "@/components/Lobby/Iniciolayout";
import Login from "@/components/Lobby/Login";
import { useSelectChat } from "@/hooks/useSelectChat";
import { useLogin } from "@/hooks/useLogin";
import { useTickets } from "@/hooks/useTickets";
import styles from "@/screens/MainScreen.styles";

export default function MainScreen() {
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
        <View style={styles.formSurface}><CreateTicket teachers={teachers} initialTeacherId={preferredTeacherId} onCancel={() => setIsCreatingTicket(false)} onCreated={openTicket} /></View>
      ) : activeTab === "directorio" && currentUser.role === "Estudiante" ? (
        <Directory teachers={teachers} onCreateTicket={handleCreateTicket} />
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
          <Inbox role={currentUser.role} tickets={myTickets} queuePosition={getQueuePosition} onSelectTicket={openTicket} />
        </>
      )}
    </Iniciolayout>
  );
}
