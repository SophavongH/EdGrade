import { Router } from "express";
import { db } from "../database/drizzle";
import { classrooms as classroomsTable } from "../database/schema";
import { eq } from "drizzle-orm";

const router = Router();

// GET all active classrooms
router.get("/", async (req, res) => {
  const data = await db
    .select()
    .from(classroomsTable)
    .where(eq(classroomsTable.archived, false));
  res.json(data);
});

// POST create classroom
router.post("/", async (req, res) => {
  const { name, color } = req.body;
  const result = await db
    .insert(classroomsTable)
    .values({ name, color, totalStudents: 0, archived: false })
    .returning();
  res.status(201).json(result[0]);
});

// PATCH edit classroom
router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const result = await db
    .update(classroomsTable)
    .set({ name })
    .where(eq(classroomsTable.id, id))
    .returning();

  if (result.length === 0) return res.status(404).json({ message: "Not found" });
  res.json(result[0]);
});

// PATCH archive classroom
router.patch("/:id/archive", async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await db
    .update(classroomsTable)
    .set({ archived: true })
    .where(eq(classroomsTable.id, id))
    .returning();

  if (result.length === 0) return res.status(404).json({ message: "Not found" });
  res.json(result[0]);
});

// GET archived classrooms
router.get("/archived", async (req, res) => {
  const data = await db
    .select()
    .from(classroomsTable)
    .where(eq(classroomsTable.archived, true));
  res.json(data);
});

// PATCH unarchive classroom
router.patch("/:id/unarchive", async (req, res) => {
  const { id } = req.params;
  try {
    await db
      .update(classroomsTable)
      .set({ archived: false })
      .where(eq(classroomsTable.id, Number(id))); 
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to unarchive classroom" });
  }
});

export default router;
