import { onAuthStateChanged } from "firebase/auth";
import React, { FC, useEffect } from "react";
import useStore from "../../zustand";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { setUser } = useStore();
  const { setFollow, setLoading } = useStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        setUser(user);
        setLoading(true);

        setLoading(false);
        setDoc(doc(db, `users/${user.uid}`), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        return;
      }

      setUser(null);
      setFollow([]);
    });

    return () => unsub();
  }, [setUser, setFollow, setLoading]);

  return <>{children}</>;
};

export default AuthLayout;
