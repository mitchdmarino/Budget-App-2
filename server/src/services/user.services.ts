import { getUserByEmail, getUserById, insertUser } from "../repositories/users.repo.js";
import { hashUserPassword } from "../utils/utils.js";


export async function findUserByEmail(emailAddress: string) {
    const user = await getUserByEmail(emailAddress); 
    if (!user) {
        return null; 
    }
    return user; 
}

export async function createUser(emailAddress: string, password: string, name: string) {
    const foundUser = await findUserByEmail(emailAddress); 
    if (foundUser) {
        // throw invalid error 
        return null; 
    }
    // no user found, let's hash the password and create the user 
    const hashedPassword = await hashUserPassword(password); 
    const newUser = await insertUser(emailAddress, hashedPassword, name); 
    return newUser; 
}

export async function findUserByID(id: string) {
    const user = await getUserById(id); 
    if (!user) return null; 
    return user; 
}
