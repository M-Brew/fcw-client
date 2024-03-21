"use client";

import { createContext, useState } from "react";

export const DashboardContext = createContext<IDashboardContext>(
  {} as IDashboardContext
);

export default function DashboardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [slug, setSlug] = useState("");

  const handleSetSlug = (slug: string) => {
    setSlug(slug);
  };

  return (
    <DashboardContext.Provider value={{ slug, handleSetSlug }}>
      {children}
    </DashboardContext.Provider>
  );
}

interface IDashboardContext {
  slug: string;
  handleSetSlug: (slug: string) => void;
}
