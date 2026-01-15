"use client";

import { createContext, useContext, useMemo, useState } from "react";

const WizardContext = createContext(null);

export function WizardProvider({ children }) {
  const [wizard, setWizard] = useState({
    restaurantName: "",
    restaurantSlug: "",
    csvFile: null,
    logoFile: null,
    parsedMenu: null,
  });

  const value = useMemo(() => ({ wizard, setWizard }), [wizard]);

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}
