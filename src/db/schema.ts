import{int, mysqlEnum, mysqlTable, uniqueIndex, varchar, serial, timestamp} from 'drizzle-orm/mysql-core'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const users = mysqlTable("users", {
    id: int("id").autoincrement().primaryKey(),
    name:varchar("name", {length:255}).notNull(),
    email:varchar("email", {length:255}).notNull().unique(),//unique
    password: varchar("password", {length:255}).notNull(),
    createdAt: timestamp("create_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
})

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>