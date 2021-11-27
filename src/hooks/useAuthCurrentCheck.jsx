import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "src/firebase/firebase";

export const useAuthCurrentCheck = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user && !(router.pathname === "/auth/signUp")) {
        router.replace("/auth/signIn");
      }
    });
  }, []);
};
