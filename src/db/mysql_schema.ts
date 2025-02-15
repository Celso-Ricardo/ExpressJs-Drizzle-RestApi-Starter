import{
    int, 
    mysqlEnum, 
    mysqlTable, 
    uniqueIndex, 
    varchar, 
    serial, 
    timestamp, 
    text,
    decimal
} from 'drizzle-orm/mysql-core'
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

export const users = mysqlTable("users", {
    id: int("id").autoincrement().primaryKey(),
    name:varchar("name", {length:255}).notNull(),
    email:varchar("email", {length:255}).notNull().unique(),//unique
    password: varchar("password", {length:255}).notNull(),
    createdAt: timestamp("create_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
})

export const usersRelations = relations(users, ({many}) => ({
    accounts: many(accounts),
    deposits:many(deposits),
    withdraws:many(withdraws),
    payments:many(payments)
}))

export const currencies = mysqlTable("currencies",{
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", {length:255}).unique().notNull(),
    symbol: varchar("symbol", {length:255}).notNull(),
    code: varchar("code", {length:255}).notNull(),
    createdAt: timestamp("create_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
})

export const accounts = mysqlTable("accounts",{
    id: int("id").autoincrement().primaryKey(),
    reference: varchar("reference", {length:255}).notNull(),
    userId: int("user_id").references(()=>users.id).notNull(),
    currencyId: int("currency_id").references(()=>currencies.id).notNull(),
    amount: int("amount").notNull(),
    createdAt: timestamp("create_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
})

export const accountsRelations = relations(accounts, ({one})=>({
    user:one(users,{
        fields:[accounts.userId],
        references:[users.id],
        relationName:"initiator",
    }),
    currency:one(currencies,{
        fields:[accounts.currencyId],
        references:[currencies.id],
    })
}))

export const transactions = mysqlTable("transactions",{
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").references(()=>users.id).notNull(),
    transactionId: int("transaction_id").notNull(),
    currencyId: int("currency_id").references(()=>currencies.id).notNull(),
    amount: decimal("amount",{ precision: 6, scale: 2}).notNull(),
    createdAt: timestamp("create_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
})

export const transactionsRelations = relations(transactions, ({one})=>({
    user:one(users,{
        fields:[transactions.userId],
        references:[users.id],
        relationName:"initiator",
    }),
    currency:one(currencies,{
        fields:[transactions.currencyId],
        references:[currencies.id],
    })
}))

export const deposits = mysqlTable("deposits",{
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").references(()=>users.id).notNull(),
    accountId: int("account_id").references(()=>accounts.id).notNull(),
    transactionId: int("transaction_id").references(()=>transactions.id).notNull(),
    currencyId: int("currency_id").references(()=>currencies.id).notNull(),
    amount:  decimal("amount",{ precision: 6, scale: 2}).notNull(),
    createdAt: timestamp("create_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
})

export const depositsRelations = relations(deposits, ({one})=>({
    user:one(users,{
        fields:[deposits.userId],
        references:[users.id],
        relationName:"initiator",
    }),
    currency:one(currencies,{
        fields:[deposits.currencyId],
        references:[currencies.id],
    }),
    account:one(accounts,{
        fields:[deposits.accountId],
        references:[accounts.id],
    }),
    transaction:one(transactions,{
        fields:[deposits.transactionId],
        references:[transactions.id],
    })
}))

export const withdraws = mysqlTable("withdraws",{
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").references(()=>users.id).notNull(),
    accountId: int("account_id").references(()=>accounts.id).notNull(),
    currencyId: int("currency_id").references(()=>currencies.id).notNull(),
    transactionId: int("transaction_id").references(()=>transactions.id).notNull(),
    amount:  decimal("amount",{ precision: 6, scale: 2}).notNull(),
    createdAt: timestamp("create_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
})

export const withdrawsRelations = relations(withdraws, ({one})=>({
    user:one(users,{
        fields:[withdraws.userId],
        references:[users.id],
        relationName:"initiator",
    }),
    currency:one(currencies,{
        fields:[withdraws.currencyId],
        references:[currencies.id],
    }),
    account:one(accounts,{
        fields:[withdraws.accountId],
        references:[accounts.id],
    }),
    transaction:one(transactions,{
        fields:[withdraws.transactionId],
        references:[transactions.id],
    })
}))

export const payments = mysqlTable("payments",{
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").references(()=>users.id).notNull(),
    transactionId: int("transaction_id").references(()=>transactions.id).notNull(),
    currencyId: int("currency_id").references(()=>currencies.id).notNull(),
    accountId: int("account_id").references(()=>accounts.id).notNull(),
    amount:  decimal("amount",{ precision: 6, scale: 2}).notNull(),
    ipn: text("amount").notNull(),
    reference: int("reference").notNull(),
    createdAt: timestamp("create_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
})

export const paymentsRelations = relations(payments, ({one})=>({
    user:one(users,{
        fields:[payments.userId],
        references:[users.id],
        relationName:"initiator",
    }),
    currency:one(currencies,{
        fields:[payments.currencyId],
        references:[currencies.id],
    }),
    account:one(accounts,{
        fields:[payments.accountId],
        references:[accounts.id],
    }),
    transaction:one(transactions,{
        fields:[payments.transactionId],
        references:[transactions.id],
    })
}))


export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>