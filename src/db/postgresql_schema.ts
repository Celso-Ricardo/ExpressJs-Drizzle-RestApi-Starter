import {
  integer,
  pgTable,
  uniqueIndex,
  varchar,
  serial,
  timestamp,
  text,
  decimal,
  time,
  json,
  boolean,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

export const tasks = pgTable("tasks", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  name: text("name").notNull(),
  done: boolean("done").notNull().default(false),
  json: json("json"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const users = pgTable("users", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(), //unique
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  deposits: many(deposits),
  withdraws: many(withdraws),
  payments: many(payments),
}));

export const currencies = pgTable("currencies", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  symbol: varchar("symbol", { length: 255 }).notNull().unique(),
  code: varchar("code", { length: 255 }).notNull().unique(),
  createdAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export const accounts = pgTable("accounts", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  reference: varchar("reference", { length: 255 }).notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  currencyId: integer("currency_id")
    .references(() => currencies.id)
    .notNull(),
  amount: integer("amount").notNull(),
  createdAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
    relationName: "initiator",
  }),
  currency: one(currencies, {
    fields: [accounts.currencyId],
    references: [currencies.id],
  }),
}));

export const transactions = pgTable("transactions", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  transactionId: integer("transaction_id").notNull(),
  currencyId: integer("currency_id")
    .references(() => currencies.id)
    .notNull(),
  amount: decimal("amount", { precision: 6, scale: 2 }).notNull(),
  createdAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
    relationName: "initiator",
  }),
  currency: one(currencies, {
    fields: [transactions.currencyId],
    references: [currencies.id],
  }),
}));

export const deposits = pgTable("deposits", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  accountId: integer("account_id")
    .references(() => accounts.id)
    .notNull(),
  transactionId: integer("transaction_id")
    .references(() => transactions.id)
    .notNull(),
  currencyId: integer("currency_id")
    .references(() => currencies.id)
    .notNull(),
  amount: decimal("amount", { precision: 6, scale: 2 }).notNull(),
  createdAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export const depositsRelations = relations(deposits, ({ one }) => ({
  user: one(users, {
    fields: [deposits.userId],
    references: [users.id],
    relationName: "initiator",
  }),
  currency: one(currencies, {
    fields: [deposits.currencyId],
    references: [currencies.id],
  }),
  account: one(accounts, {
    fields: [deposits.accountId],
    references: [accounts.id],
  }),
  transaction: one(transactions, {
    fields: [deposits.transactionId],
    references: [transactions.id],
  }),
}));

export const withdraws = pgTable("withdraws", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  accountId: integer("account_id")
    .references(() => accounts.id)
    .notNull(),
  currencyId: integer("currency_id")
    .references(() => currencies.id)
    .notNull(),
  transactionId: integer("transaction_id")
    .references(() => transactions.id)
    .notNull(),
  amount: decimal("amount", { precision: 6, scale: 2 }).notNull(),
  createdAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export const withdrawsRelations = relations(withdraws, ({ one }) => ({
  user: one(users, {
    fields: [withdraws.userId],
    references: [users.id],
    relationName: "initiator",
  }),
  currency: one(currencies, {
    fields: [withdraws.currencyId],
    references: [currencies.id],
  }),
  account: one(accounts, {
    fields: [withdraws.accountId],
    references: [accounts.id],
  }),
  transaction: one(transactions, {
    fields: [withdraws.transactionId],
    references: [transactions.id],
  }),
}));

export const payments = pgTable("payments", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  transactionId: integer("transaction_id")
    .references(() => transactions.id)
    .notNull(),
  currencyId: integer("currency_id")
    .references(() => currencies.id)
    .notNull(),
  accountId: integer("account_id")
    .references(() => accounts.id)
    .notNull(),
  amount: decimal("amount", { precision: 6, scale: 2 }).notNull(),
  ipn: text("amount").notNull(),
  reference: integer("reference").notNull(),
  createdAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
    relationName: "initiator",
  }),
  currency: one(currencies, {
    fields: [payments.currencyId],
    references: [currencies.id],
  }),
  account: one(accounts, {
    fields: [payments.accountId],
    references: [accounts.id],
  }),
  transaction: one(transactions, {
    fields: [payments.transactionId],
    references: [transactions.id],
  }),
}));

export type User = InferSelectModel<typeof users>;
export type Currency = InferSelectModel<typeof currencies>;
export type NewUser = typeof users.$inferInsert;
