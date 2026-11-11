import { useMSJs, type User, type UserRole } from "./UseMSJs";

export function useLogin() {
	const { currentUser, setCurrentUser, teachers } = useMSJs();

	const login = (role: UserRole, name: string, teacherId?: string) => {
		const teacher = role === "Docente"
			? teachers.find((item) => item.id === teacherId) ?? teachers[0]
			: undefined;
		const cleanName = name.trim();
		const studentName = cleanName || "Valentina Cruz";
		const studentId = cleanName
			? `student-${cleanName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`
			: "student-demo";
		const user: User = teacher
			? { ...teacher, name: cleanName || teacher.name }
			: {
					id: studentId,
					name: studentName,
					role: "Estudiante",
					email: "estudiante@campus.edu",
					  initials: studentName.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase(),
				};

		setCurrentUser(user);
	};

	return { currentUser, login, logout: () => setCurrentUser(null), teachers };
}
