import { create } from "zustand";

type UserType = {
  username: string;
};

interface UserStore {
  user: UserType;
  setUsername: (username: string) => void;
}

const useUserStore = create<UserStore>()((set) => ({
  user: {
    username: "",
  },
  setUsername: (username) => {
    set((prev) => ({
      user: {
        ...prev.user,
        username: username,
      },
    }));
  },
}));

export { useUserStore };
