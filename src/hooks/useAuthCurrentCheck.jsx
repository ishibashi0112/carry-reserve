import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";

export const useAuthCurrentCheck = () => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user && !(router.pathname === "/auth/signUp")) {
        router.replace("/auth/signIn");
      }
    });
  }, []);
};
