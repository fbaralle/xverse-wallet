"use client";

import "@/styles/style.scss";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import { queryClient } from "@/config/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

const toastStyles = {
  toastOptions: {
    style: {
      fontFamily: "var(--font-lexend)",
      backgroundColor: "var(--backgroundPopoutColor)",
      color: "var(--textDefaultColor)",
    },
  },
  containerStyle: {
    top: "10%",
    bottom: "0",
  },
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={toastStyles.toastOptions}
        containerStyle={toastStyles.containerStyle}
      />
      {children}
    </QueryClientProvider>
  );
};

export default Layout;
