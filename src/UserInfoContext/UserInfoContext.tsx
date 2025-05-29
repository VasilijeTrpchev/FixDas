import { createContext, useContext, useEffect, useState } from "react";
import { UserInfo } from "../interfaces/Interfaces";
import { getAuth, onAuthStateChanged } from "firebase/auth";
type UserContextType = {
  userInfo: UserInfo | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
};

export const UserInfoContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const res = await fetch(
            `https://api-fixdas.onrender.com/loggedUser?loggedUserId=${user.uid}`
          );
          const data = await res.json();
          let userData = data[0];

          if (!userData) {
            const newUser = {
              loggedUserId: user.uid,
              name: user.displayName || "Add user name",
              email: user.email || "Add email",
              phone: user.phoneNumber || "Add phone number",
              city: "Add city",
              photoUrl: user.photoURL || "",
            };

            const postRes = await fetch(
              "https://api-fixdas.onrender.com/loggedUser",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
              }
            );

            userData = await postRes.json();
          }

          setUserInfo({
            loggedUserId: user.uid,
            currUserName: userData.name,
            currUserEmail: userData.email,
            currUserPhone: userData.phone,
            currUserPhotoUrl: userData.photoUrl,
            currUserCity: userData.city,
            id: userData.id,
          });
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      } else {
        setUserInfo(undefined);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserInfoContext.Provider
      value={{ userInfo: userInfo as UserInfo, setUserInfo }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserInfoContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
