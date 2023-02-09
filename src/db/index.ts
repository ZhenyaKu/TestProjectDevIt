import * as SQLite from "expo-sqlite";
import { WebSQLDatabase } from "expo-sqlite";
import { Platform } from "react-native";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    } as unknown as WebSQLDatabase;
  }

  const db = SQLite.openDatabase("db.db");

  db.exec(
    [
      // NOTE: Uncomment to reset database
      // {
      //   sql: "DROP TABLE IF EXISTS users;",
      //   args: [],
      // },
      {
        sql: `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          position TEXT DFAULT NULL,
          skype TEXT DEFAULT NULL
        );
        `,
        args: [],
      },
      {
        sql: "SELECT * FROM users",
        args: [],
      },
    ],
    false,
    (_, results) => {
      // @ts-ignore
      console.log(results);
    }
  );

  return db;
}

export const db = openDatabase();
