import { AuthUser } from "../../types/models/AuthUser";

export const authRole = {
  admin: ["admin"],
  user: ["user", "admin"],
};

export enum RoutePermittedRole {
  Admin = "admin",
  User = "user",
}

export const defaultUser: AuthUser = {
  uid: "john-alex",
  displayName: "John Alex",
  email: "demo@example.com",
  token: "access-token",
  role: "user",
  photoURL: "/assets/images/placeholder.jpg",
};
export const initialUrl = "/sample/page-1"; // this url will open after login
