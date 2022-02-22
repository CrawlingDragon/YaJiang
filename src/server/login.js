import { get } from "@/http";

export function login(useName, passWord) {
  return get("Mobile/Member/login", {
    useName,
    passWord
  });
}
