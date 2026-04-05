"use client";

import { createContext, useContext, useMemo, useState } from "react";

const OnboardingContext = createContext(null);

export function OnboardingProvider({ children }) {
  const [onboarding, setOnboarding] = useState({
    businessName: "",
    businessSlug: "",
    foodTypes: [],      // string[] — selected food type ids
    sections: [],       // string[] — ordered menu section names
    dishes: {},         // Record<sectionName, {id,name,price,description}[]>
    csvFile: null,
    logoFile: null,
    parsedMenu: null,
  });

  const value = useMemo(() => ({ onboarding, setOnboarding }), [onboarding]);

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
