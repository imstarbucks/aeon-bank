"use client";

import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { useUserStore } from "@/hooks/useUserStore";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const setUsername = useUserStore((state) => state.setUsername);
  const router = useRouter();

  const handleOnClick = () => {
    Cookies.remove("username");
    Cookies.remove("login");
    setUsername("");
    alert("You have been logged out successfully");
    router.push("/login");
  };

  return (
    <Button className="mt-12" onClick={handleOnClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;
