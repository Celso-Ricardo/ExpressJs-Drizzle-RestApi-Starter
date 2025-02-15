import { currencies } from "../db/postgresql_schema";
import type { Currency } from "../db/postgresql_schema";
import { db } from "../db/postgresql_db";
import { eq } from "drizzle-orm";

export const insertNewCurrencie = async (
  name: string,
  symbol: string,
  code: string,
) => {
  //TODO INSERT AND RETURN THE INSERTED USER WITH ONLY ONE QUERY
  try {
    const result = await db
      .insert(currencies)
      .values({
        name: name,
        symbol: symbol,
        code: code,
      })
      .returning();

    return result[0];
  } catch (error: any) {
    ///const Strings = require( 'strings.js' );
    //let s = new Strings(error.message);

    //var dupliacteName = s.contains('for key \'currencies_name_unique\'')
    //if( dupliacteName  ) {
    throw { message: "Currency name already exists" };
    //}
    //throw(error);
  }
};

export const getAllCurrencies = async () => {
  try {
    const allCurrencies = await db.select().from(currencies);
    if (allCurrencies) return allCurrencies;
    return false;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrencyById = async (
  id: number,
): Promise<Currency | false> => {
  try {
    const data = await db.query.currencies.findFirst({
      where: eq(currencies.id, id),
    });
    if (data != undefined) return data;
  } catch (error) {
    throw error;
  }
  return false;
};

export const getCurrencyByName = async (
  name: string,
): Promise<Currency | false> => {
  try {
    const data = await db.query.currencies.findFirst({
      where: eq(currencies.name, name),
      // limit: 5,
      // offset: 5,
      // with: {
      //     comments: true,
      // },
      // where: (posts, { eq }) => (eq(posts.id, 1)),
      // with: {
      //     comments: {
      //         where: (comments, { lt }) => lt(comments.createdAt, new Date()),
      //         orderBy: (comments, { desc }) => [desc(comments.id)],
      // },
      // },
      // orderBy: [asc(posts.id)],
      // orderBy: (posts, { asc }) => [asc(posts.id)],
    });
    if (data != undefined) return data;
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const removeCurrency = async (id: number) => {
  try {
    const removedCurrency = await db
      .delete(currencies)
      .where(eq(currencies.id, id))
      .returning();
    if (!removedCurrency /* !! editedCurrency.length < 1 */) {
      return false;
    }
    return removedCurrency;
  } catch (e) {
    throw e;
  }
};

export const editCurrency = async (cur: Currency) => {
  try {
    const { symbol, name, code } = cur;
    const editedCurrency = await db
      .update(currencies)
      .set({ symbol, name, code })
      .where(eq(currencies.id, cur.id))
      .returning();
    if (!editedCurrency[0]) {
      return false;
    }
    console.log(editedCurrency[0]);
    return editedCurrency[0];
  } catch (e) {
    throw e;
  }
};
