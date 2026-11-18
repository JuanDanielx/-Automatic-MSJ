/**
 * Encapsula las operaciones de inicio y cierre de sesión.
 */

import { useAppContext } from "@/context/AppProvider";
import type { User, UserRole } from "@/types/app";

export function useLogin() {
  const { currentUser, setCurrentUser, teachers } = useAppContext();

  const login = (role: UserRole, name: string, teacherId?: string) => {
    const teacher = role === "Docente"
      ? teachers.find((item) => item.id === teacherId) ?? teachers[0]
      : undefined;
    const cleanName = name.trim();
    const studentName = cleanName || "Valentina Cruz";
    const normalizedName = studentName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const studentId = normalizedName === "valentina cruz"
      ? "student-demo"
      : `student-${normalizedName.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
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
