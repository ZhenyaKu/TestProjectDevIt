import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { DBContext } from "../DBContext";
import { IUserCredentials, IUser, IUserDto } from "./types";

interface UserContextProps {
  currentUser?: IUser;
  login(email: string, password: string): Promise<IUser>;
  createUser(user: IUserDto): Promise<IUser>;
  updateUser(user: IUser): Promise<void>;
  checkIfUserExists(email: string): Promise<boolean>;
}
export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const { db } = useContext(DBContext);

  const selectUser = ({ email, password }: IUserCredentials) => {
    return new Promise<IUser>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1;",
          [email, password],
          (_, { rows: { _array } }) => {
            if (_array.length > 0) {
              setCurrentUser(_array[0]);
              resolve(_array[0]);
            } else {
              reject("User not found");
            }
          }
        );
      });
    });
  };

  const createUser = ({ email, password, name, phone }: IUserDto) => {
    return new Promise<IUser>(async (resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO users (email, password, name, phone) VALUES (?, ?, ?, ?);",
          [email, password, name, phone],
          (_, { insertId }) => {
            if (insertId) {
              const user = { id: insertId, email, name, phone };
              setCurrentUser(user);
              resolve(user);
            } else {
              reject("User not created");
            }
          }
        );
      });
    });
  };

  const updateUser = async (userPayload: IUser) => {
    await db.transaction((tx) => {
      tx.executeSql(
        "UPDATE users SET email = ?, name = ?, phone = ?, position = ?, skype = ? WHERE id = ?;",
        [
          userPayload.email,
          userPayload.name ?? null,
          userPayload.phone ?? null,
          userPayload.position ?? null,
          userPayload.skype ?? null,
          userPayload.id,
        ]
      );
    });

    setCurrentUser({ ...currentUser, ...userPayload });
  };

  const login = async (email: string, password: string) => {
    return selectUser({ email, password });
  };

  const checkIfUserExists = async (email: string) => {
    return new Promise<boolean>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM users WHERE email = ? LIMIT 1;",
          [email],
          (_, { rows: { _array } }) => {
            if (_array.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      });
    });
  };

  const contextValue = useMemo(
    () => ({
      login,
      createUser,
      updateUser,
      currentUser,
      checkIfUserExists,
    }),
    [currentUser]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
