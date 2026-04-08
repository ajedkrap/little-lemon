import menuJson from "@/data/menu.json";
import { NotificationData, UserFormData } from "@/utils/types";
import * as SQLite from "expo-sqlite";

const DB_NAME = "littlelemon.db";

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync(DB_NAME);
  await initTables(db);
  return db;
}

async function initTables(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL DEFAULT 1,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      phone TEXT,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY NOT NULL DEFAULT 1,
      userId INTEGER NOT NULL DEFAULT 1,
      orderStatuses INTEGER NOT NULL DEFAULT 0,
      passwordChanges INTEGER NOT NULL DEFAULT 0,
      specialOffers INTEGER NOT NULL DEFAULT 0,
      newsletter INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      type TEXT,
      price TEXT,
      image TEXT
    );
  `);
}

// ─── User ────────────────────────────────────────────────────────────────────

export async function getUser(): Promise<UserFormData | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    image: string | null;
  }>("SELECT * FROM users WHERE id = 1");
  if (!row) return null;
  return {
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone,
    image: row.image ? JSON.parse(row.image) : null,
  };
}

export async function saveUser(user: UserFormData): Promise<void> {
  const db = await getDatabase();
  const imageStr = user.image ? JSON.stringify(user.image) : null;
  await db.runAsync(
    `INSERT INTO users (id, firstName, lastName, email, phone, image)
     VALUES (1, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       firstName = excluded.firstName,
       lastName = excluded.lastName,
       email = excluded.email,
       phone = excluded.phone,
       image = excluded.image`,
    [
      user.firstName ?? null,
      user.lastName ?? null,
      user.email ?? null,
      user.phone ?? null,
      imageStr,
    ],
  );
}

export async function deleteUser(): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM users WHERE id = 1");
  await db.runAsync("DELETE FROM notifications WHERE id = 1");
}

// ─── Notifications ───────────────────────────────────────────────────────────

export async function getNotifications(): Promise<NotificationData> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{
    orderStatuses: number;
    passwordChanges: number;
    specialOffers: number;
    newsletter: number;
  }>("SELECT * FROM notifications WHERE userId = 1");
  if (!row) {
    return {
      orderStatuses: false,
      passwordChanges: false,
      specialOffers: false,
      newsletter: false,
    };
  }
  return {
    orderStatuses: !!row.orderStatuses,
    passwordChanges: !!row.passwordChanges,
    specialOffers: !!row.specialOffers,
    newsletter: !!row.newsletter,
  };
}

export async function saveNotifications(
  notif: NotificationData,
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO notifications (id, userId, orderStatuses, passwordChanges, specialOffers, newsletter)
     VALUES (1, 1, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       orderStatuses = excluded.orderStatuses,
       passwordChanges = excluded.passwordChanges,
       specialOffers = excluded.specialOffers,
       newsletter = excluded.newsletter`,
    [
      notif.orderStatuses ? 1 : 0,
      notif.passwordChanges ? 1 : 0,
      notif.specialOffers ? 1 : 0,
      notif.newsletter ? 1 : 0,
    ],
  );
}

// ─── Menu ────────────────────────────────────────────────────────────────────

export async function seedMenu(): Promise<void> {
  const db = await getDatabase();
  const count = await db.getFirstAsync<{ cnt: number }>(
    "SELECT COUNT(*) as cnt FROM menu",
  );
  if (count && count.cnt > 0) return;

  for (const [index, item] of menuJson.menu.entries()) {
    await db.runAsync(
      "INSERT INTO menu (id, name, description, type, price, image) VALUES (?, ?, ?, ?, ?, ?)",
      [
        index + 1,
        item.name,
        item.description,
        item.category,
        String(item.price),
        item.image,
      ],
    );
  }
}

export type MenuRow = {
  id: number;
  name: string;
  description: string;
  type: string;
  price: string;
  image: string;
};

export async function getMenuItems(
  categories: string[] = [],
  searchText: string = "",
): Promise<MenuRow[]> {
  const db = await getDatabase();
  const conditions: string[] = [];
  const params: string[] = [];

  if (categories.length > 0) {
    const placeholders = categories.map(() => "?").join(", ");
    conditions.push(`type IN (${placeholders})`);
    params.push(...categories);
  }

  if (searchText.trim()) {
    conditions.push("name LIKE ?");
    params.push(`%${searchText.trim()}%`);
  }

  const where = conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "";
  return db.getAllAsync<MenuRow>(`SELECT * FROM menu${where}`, params);
}
