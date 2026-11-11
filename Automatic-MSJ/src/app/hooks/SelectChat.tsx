import { useState } from "react";
import { useMSJs } from "./UseMSJs";

export function useSelectChat() {
	const { tickets } = useMSJs();
	const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
	const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) ?? null;

	return { selectedTicket, selectTicket: setSelectedTicketId, clearSelection: () => setSelectedTicketId(null) };
}
