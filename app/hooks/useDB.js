import * as SQLite from 'expo-sqlite';

export const useDB= () => {

    const openDatabase = async () => {
        const db = await SQLite.openDatabaseAsync("sessions.db")
        return db
    }

    const initDB = async () => {
        const db = await openDatabase();
        const sql = `CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);`;
        const res = await db.execAsync(sql)
        console.log("DB initialized", res)
        return res;
    }

    const sessionExists = async (localIdToCheck) => {
        const db = await openDatabase();
        const sql = `SELECT localId FROM sessions WHERE localId = ?`;
        const result = await db.getFirstAsync(sql, [localIdToCheck]);
        return result !== undefined;
    }

    const insertSession = async ({localId, email, token}) => {
        const exists = await sessionExists(localId);
        if (!exists) {
            const db = await openDatabase();
            const sql = `INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?)`;
            const args = [localId, email, token];
            const res = await db.runAsync(sql, args);
            console.log("Session created", res);
            return res;
        } else {
            console.log("Session with localId:", localId, "already exists.");
            return null; // O podrías devolver un objeto/booleano indicando que no se insertó
        }
    }

    const getSession = async () => {
        const db = await openDatabase()
        const sql = `SELECT * FROM sessions`
        const firsRow = await db.getFirstAsync(sql)
        console.log( "Session retrieved", firsRow)
        return firsRow
    }

    const truncateSessionTable = async () => {
        const db = await openDatabase()
        const sql = `DELETE FROM sessions`
        const res = await db.execAsync(sql)
        console.log("Session table truncated", res)
        return res
    }

    return {
      initDB,
      insertSession,
      getSession,
      truncateSessionTable,
    };
}