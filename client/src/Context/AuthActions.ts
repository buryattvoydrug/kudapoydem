import { AuthCallAssetsI, User } from "../types";

export const LoginStart = (userCredentials: AuthCallAssetsI) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user: User) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Follow = (userId: string) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId: string) => ({
  type: "UNFOLLOW",
  payload: userId,
});