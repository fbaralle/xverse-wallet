"use client";

import { Montserrat } from "next/font/google";

export const interFont = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const Fonts = () => {
  return (
    <style jsx global>
      {`
        html {
          --font-inter: ${interFont.style.fontFamily};
          font-family: ${interFont.style.fontFamily};
        }
      `}
    </style>
  );
};
