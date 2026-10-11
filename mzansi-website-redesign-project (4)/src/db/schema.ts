import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/** Shared JSON shapes */
export interface ServiceItem {
  name: string;
  price: string;
  description?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
}

/**
 * Leads captured by the interactive "Build my site" demo (stage 0 funnel).
 */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  trade: text("trade").notNull(),
  location: text("location").notNull(),
  whatsapp: text("whatsapp").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * Accounts. Identity lives in Firebase Auth (stage 4) — we mirror the
 * firebase uid here so billing & sites have a relational home.
 */
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    firebaseUid: text("firebase_uid").notNull(),
    email: text("email").notNull(),
    displayName: text("display_name"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [uniqueIndex("users_firebase_uid_idx").on(t.firebaseUid)],
);

/**
 * A customer's website. Created as a draft, published once Paystack
 * billing activates (stage 6). Images point at Cloudinary URLs (stage 5).
 */
export const sites = pgTable(
  "sites",
  {
    id: serial("id").primaryKey(),
    /** Nullable until auth ships — anonymous drafts can be claimed later. */
    userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    templateId: text("template_id").notNull(),
    status: text("status").notNull().default("draft"), // draft | active | suspended | deleted

    businessName: text("business_name").notNull(),
    tagline: text("tagline"),
    industry: text("industry").notNull(),
    area: text("area"),
    hours: text("hours"),

    whatsapp: text("whatsapp"),
    phone: text("phone"),
    email: text("email"),

    logoUrl: text("logo_url"),
    heroImageUrl: text("hero_image_url"),
    galleryUrls: jsonb("gallery_urls")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    services: jsonb("services")
      .$type<ServiceItem[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    socials: jsonb("socials")
      .$type<SocialLinks>()
      .notNull()
      .default(sql`'{}'::jsonb`),

    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    uniqueIndex("sites_slug_idx").on(t.slug),
    index("sites_user_idx").on(t.userId),
    index("sites_status_idx").on(t.status),
  ],
);

/**
 * Monthly Paystack subscription (R149.99) attached to a site.
 */
export const subscriptions = pgTable(
  "subscriptions",
  {
    id: serial("id").primaryKey(),
    siteId: integer("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),
    planCode: text("plan_code").notNull().default("mzansisite-monthly"),
    amountCents: integer("amount_cents").notNull().default(14999),
    currency: text("currency").notNull().default("ZAR"),
    status: text("status").notNull().default("pending"), // pending | active | past_due | cancelled
    paystackCustomerCode: text("paystack_customer_code"),
    paystackSubscriptionCode: text("paystack_subscription_code"),
    paystackEmailToken: text("paystack_email_token"),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    nextPaymentDate: timestamp("next_payment_date", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [index("subscriptions_site_idx").on(t.siteId), index("subscriptions_status_idx").on(t.status)],
);

/**
 * Every Paystack transaction we see (initial charge + recurring invoices).
 */
export const payments = pgTable(
  "payments",
  {
    id: serial("id").primaryKey(),
    siteId: integer("site_id").references(() => sites.id, { onDelete: "set null" }),
    subscriptionId: integer("subscription_id").references(() => subscriptions.id, {
      onDelete: "set null",
    }),
    paystackReference: text("paystack_reference").notNull(),
    amountCents: integer("amount_cents").notNull(),
    currency: text("currency").notNull().default("ZAR"),
    status: text("status").notNull().default("pending"), // pending | success | failed
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [uniqueIndex("payments_reference_idx").on(t.paystackReference)],
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type User = typeof users.$inferSelect;
export type Site = typeof sites.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Payment = typeof payments.$inferSelect;
