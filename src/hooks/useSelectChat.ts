/**
 * Gestiona únicamente qué ticket está abierto en la pantalla de chat.
 */

import { useState } from "react";
import { useAppContext } from "@/context/AppProvider";

export function useSelectChat() {
  const { tickets } = useAppContext();
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) ?? null;

  return {
    selectedTicket,
    selectTicket: setSelectedTicketId,
    clearSelection: () => setSelectedTicketId(null),
  };
}
