import { createContext } from "react";
import { UserInfoContextType } from "../types/UserInfoContext";

const initialUserInfoContext = {
  userContext: {},
  setUserContext: (): void => {
    throw new Error("setContext function must be overridden");
  },
};

export const UserInfoContext = createContext<UserInfoContextType>(
  initialUserInfoContext
);
