import { useState } from "react";
import { Redirect } from "expo-router";
import { useMSJs } from "./UseMSJs";

export function useSelectChat() {
	const { tickets } = useMSJs();
	const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
	const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) ?? null;

	return { selectedTicket, selectTicket: setSelectedTicketId, clearSelection: () => setSelectedTicketId(null) };
}

export default function SelectChatRoute() {
	return <Redirect href="/" />;
}
