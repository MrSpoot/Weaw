export type User = {
  id: string | undefined,
  nickname: string;
  email: string;
  password: string;
  userStatus: UserStatus;
};


export type UserStatus = "ONLINE" | "OFFLINE" | "INVISIBLE"
