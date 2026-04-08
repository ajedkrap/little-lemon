import { deleteUser, getUser, saveUser, seedMenu } from "@/data/database";
import { UserFormData } from "@/utils/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthState {
  isLoading: boolean;
  isOnboardingCompleted: boolean;
}

interface AuthContextValue extends AuthState {
  completeOnboarding: (user: UserFormData) => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isOnboardingCompleted: false,
  });

  useEffect(() => {
    (async () => {
      await seedMenu();
      const user = await getUser();
      setState({
        isLoading: false,
        isOnboardingCompleted: !!(user?.firstName && user?.email),
      });
    })();
  }, []);

  const completeOnboarding = async (user: UserFormData) => {
    await saveUser(user);
    setState({ isLoading: false, isOnboardingCompleted: true });
  };

  const resetOnboarding = async () => {
    await deleteUser();
    setState({ isLoading: false, isOnboardingCompleted: false });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, completeOnboarding, resetOnboarding }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
