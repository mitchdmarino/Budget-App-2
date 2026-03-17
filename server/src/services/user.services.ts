import { getUserByEmail, insertUser } from "../repositories/users.repo.js";
import bcrypt from "bcrypt"; 
import type { User } from "../types/user.js";

// bcrypt hashing 
const SALT_ROUNDS = 12;

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

export async function findUserByEmail(emailAddress: string) {
    const user = await getUserByEmail(emailAddress); 
    if (!user) {
        return null; 
    }
    return user; 
}


// helper functions

export async function hashUserPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword; 
}

export async function isValidPassword(hashedPassword: string, givenPassword: string) {
    const isValid = await bcrypt.compare(givenPassword, hashedPassword);
    return isValid; 
}