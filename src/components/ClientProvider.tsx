"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" autoClose={3000} />
      {children}
    </QueryClientProvider>
  );
}
