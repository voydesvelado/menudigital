import { OnboardingProvider } from "@/components/onboarding/OnboardingProvider";

export const metadata = {
  title: "Crea tu menú digital",
  description: "Configura tu menú digital en minutos.",
};

export default function OnboardingLayout({ children }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
