import { atom } from "recoil";

interface UserGlobal {
  id: string;
  name: string;
  email: string;
}

export const authAtom = atom({
  key: "authAtom",
  default: null,
});

export const userAtom = atom<UserGlobal | null>({
  key: "userAtom",
  default: null,
});
