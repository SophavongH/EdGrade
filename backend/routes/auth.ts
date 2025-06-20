import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../database/drizzle';
import { usersTable } from '../database/schema';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Query the correct table 'users_table' via usersTable schema
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ success: false, error: "User not found" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log("Invalid password for email:", email);
      return res
        .status(401)
        .json({ success: false, error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role,  },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    return res.json({ success: true, token, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, decoded.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
