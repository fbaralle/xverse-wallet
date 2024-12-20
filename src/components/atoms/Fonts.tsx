'use client';

import { Inter } from 'next/font/google';

export const interFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
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
