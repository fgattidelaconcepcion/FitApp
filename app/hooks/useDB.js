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

    const sessionExists = async (localId) => {
        const db = await openDatabase();
        const sql = `SELECT COUNT(*) AS count FROM sessions WHERE localId = ?`;
        const result = await db.getFirstAsync(sql, [localId]);
        console.log("Session exists check:", result);  // Logueo el resultado de la verificación
        return result.count > 0;  // Si el resultado es mayor a 0, la sesión ya existe
      };
      
      const insertSession = async ({ localId, email, token }) => {
        const db = await openDatabase();
      
        const checkSql = `SELECT COUNT(*) as count FROM sessions WHERE localId = ?`;
        const result = await db.getFirstAsync(checkSql, [localId]);
      
        console.log("Session exists check:", result);
      
        if (result.count === 0) {
          const sql = `INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?)`;
          const args = [localId, email, token];
          const res = await db.runAsync(sql, args);
          console.log("Session created:", res);
          return res;
        } else {
          console.log("Session already exists. Skipping insert.");
          return null;
        }
      };
      

      const getSession = async () => {
        try {
          const db = await openDatabase();
          const sql = `SELECT * FROM sessions`; // Obtengo todas las sesiones, o solo la primera 
          const firstRow = await db.getFirstAsync(sql); // Aquí obtengo el primer registro
          console.log("Retrieved session:", firstRow); // Confirmamos que se ha obtenido correctamente la sesión
          return firstRow;
        } catch (error) {
          console.log("Error retrieving session:", error); // Si hay un error, lo logueamos
          return null; 
        }
      };
      


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