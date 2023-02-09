import { WebSQLDatabase } from "expo-sqlite";
import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { db } from "../../db";

interface DBContextProps {
  db: WebSQLDatabase;
}
export const DBContext = createContext<DBContextProps>({} as DBContextProps);

export const DBContextProvider = ({ children }: PropsWithChildren) => {
  const contextValue = useMemo(() => ({ db }), []);

  return (
    <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
  );
};
