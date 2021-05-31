export interface UserInfoType {
  lastEmailSend?: string;
  newUser?: string;
  acceptCGU?: boolean;
}

export interface UserInfoContextType {
  userContext: UserInfoType;
  setUserContext: (value: UserInfoType) => void;
}
