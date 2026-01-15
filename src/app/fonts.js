import localFont from "next/font/local";

export const hellix = localFont({
  variable: "--font-hellix",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/hellix/HellixTRIAL-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/hellix/HellixTRIAL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/hellix/HellixTRIAL-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/hellix/HellixTRIAL-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/hellix/HellixTRIAL-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});
