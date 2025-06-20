const BASE_URL = "http://localhost:4000/api"; // ✅ make sure this matches server

export const fetchClassrooms = async () => {
  const res = await fetch(`${BASE_URL}/classrooms`);
  return res.json();
};

export const createClassroom = async (data: { name: string; color: string }) => {
  const res = await fetch(`${BASE_URL}/classrooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateClassroom = async (id: number, name: string) => {
  const res = await fetch(`${BASE_URL}/classrooms/${id}`, {
    method: "PATCH", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
};

export const archiveClassroom = async (id: number) => {
  const res = await fetch(`${BASE_URL}/classrooms/${id}/archive`, {
    method: "PATCH", 
  });
  return res.json();
};

export const fetchArchivedClassrooms = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classrooms/archived`);
  if (!res.ok) throw new Error("Failed to fetch archived classrooms");
  return res.json();
};


export const unarchiveClassroom = async (id: string | number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classrooms/${id}/unarchive`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to unarchive classroom");
  return res.json();
};