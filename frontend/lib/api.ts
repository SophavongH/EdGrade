const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : "http://localhost:4000/api";

// Helper to get token from localStorage
function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}


// ---- CLASSROOMS ----

export const fetchClassrooms = async () => {
  const res = await fetch(`${BASE_URL}/classrooms`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch classrooms");
  return res.json();
};

export const createClassroom = async (data: { name: string; color: string }) => {
  const res = await fetch(`${BASE_URL}/classrooms`, {
    method: "POST",
    headers: Object.assign({ "Content-Type": "application/json" }, getAuthHeaders()),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create classroom");
  return res.json();
};

export const updateClassroom = async (id: number, name: string) => {
  const res = await fetch(`${BASE_URL}/classrooms/${id}`, {
    method: "PATCH",
    headers: Object.assign({ "Content-Type": "application/json" }, getAuthHeaders()),
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to update classroom");
  return res.json();
};

export const archiveClassroom = async (id: number) => {
  const res = await fetch(`${BASE_URL}/classrooms/${id}/archive`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to archive classroom");
  return res.json();
};

export const fetchArchivedClassrooms = async () => {
  const res = await fetch(`${BASE_URL}/classrooms/archived`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch archived classrooms");
  return res.json();
};

export const unarchiveClassroom = async (id: string | number) => {
  const res = await fetch(`${BASE_URL}/classrooms/${id}/unarchive`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to unarchive classroom");
  return res.json();
};

// ---- STUDENTS ----

export const fetchStudents = async () => {
  const res = await fetch(`${BASE_URL}/students`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStudent = async (data: any) => {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: Object.assign({ "Content-Type": "application/json" }, getAuthHeaders()),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create student");
  return res.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateStudent = async (id: string, data: any) => {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: Object.assign({ "Content-Type": "application/json" }, getAuthHeaders()),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update student");
  return res.json();
};

export const deleteStudent = async (id: string) => {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete student");
  return res.json();
};

export const fetchStudent = async (id: string) => {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch student");
  return res.json();
};

// ---- CLASSROOM BY ID For Detail ----
export const fetchClassroomById = async (id: string | number) => {
  const res = await fetch(`${BASE_URL}/classrooms/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch classroom");
  return res.json();
};
// ---- STUDENTS IN CLASSROOM ----
export const fetchClassroomStudents = async (classroomId: string | number) => {
  const res = await fetch(`${BASE_URL}/classrooms/${classroomId}/students`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch classroom students");
  return res.json();
};

export const addStudentsToClassroom = async (classroomId: string | number, studentIds: string[]) => {
  const res = await fetch(`${BASE_URL}/classrooms/${classroomId}/students`, {
    method: "POST",
    headers: Object.assign({ "Content-Type": "application/json" }, getAuthHeaders()),
    body: JSON.stringify({ studentIds }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const removeStudentFromClassroom = async (classroomId: string | number, studentId: string) => {
  const res = await fetch(`${BASE_URL}/classrooms/${classroomId}/students/${studentId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to remove student from classroom");
  return res.json();
};

