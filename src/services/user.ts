import { users, User , NewUser} from "../db/postgresql_schema";
import { db } from "../db/postgresql_db";
import { eq } from "drizzle-orm";

export const insertNewUser = async (name:string , email:string, password:string) => {
    
    //TODO INSERT AND RETURN THE INSERTED USER WITH ONLY ONE QUERY
    try {
        const result = await db.insert(users).values({
            name: name,
            email : email,
            password: password,
        }).returning();
       
        return result;
    } catch (error:any) {
        const Strings = require( 'strings.js' );
        let s = new Strings(error.message);

        var dupliacteEmail = s.contains('for key \'users_email_unique\'')
        if( dupliacteEmail  ) {
            throw({"message":"Email already exists"});
        }
        throw(error);
    }
}

export const getAllUsers =  async (): Promise<User[]|false> => {
    try {
        const resultRes = await db.select().from(users); 
        return resultRes;  
    } catch (error) {
        console.log(error);
    }
    return false
}

export const getUserById = async (id:number): Promise<User|false> => {
    try {
        const data = await db.query.users.findFirst({
            where: eq(users.id, id),
        });
        if(data != undefined) return data;
    } catch (error) {
        throw(error)
    }
    return false;
}

export const getUserByEmail =  async (email:string): Promise<User|false>  => {
    try {
        // const resultRes:User[] = await db.select().from(users).where(eq(users.id, id));  
        // return resultRes[0];
        const data = await db.query.users.findFirst({
            where: eq(users.email, email),
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
        if(data != undefined) return data;
    } catch (error) {
        console.log(error);
    }
    return false;
}