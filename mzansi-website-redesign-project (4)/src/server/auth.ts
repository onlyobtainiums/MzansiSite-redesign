import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, type User } from "@/db/schema";
import { AuthError, verifyIdTokenFromRequest } from "@/lib/firebase/server";

/**
 * Resolves the platform user for an authed API request:
 * verifies the Firebase token, then upserts the user row.
 */
export async function getAuthedUser(request: Request): Promise<User> {
  const identity = await verifyIdTokenFromRequest(request);

  const [existing] = await db.select().from(users).where(eq(users.firebaseUid, identity.uid)).limit(1);
  if (existing) {
    if (identity.email && identity.email !== existing.email) {
      const [updated] = await db
        .update(users)
        .set({ email: identity.email })
        .where(eq(users.id, existing.id))
        .returning();
      return updated ?? existing;
    }
    return existing;
  }

  const [created] = await db
    .insert(users)
    .values({
      firebaseUid: identity.uid,
      email: identity.email || `user-${identity.uid.slice(0, 8)}@unknown.local`,
      displayName: identity.name ?? null,
    })
    .onConflictDoNothing()
    .returning();

  if (created) return created;
  const [race] = await db.select().from(users).where(eq(users.firebaseUid, identity.uid)).limit(1);
  if (!race) throw new AuthError("invalid-token", "Could not create your account record.");
  return race;
}
