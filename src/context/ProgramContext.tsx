'use client';

import { createContext, useContext } from 'react';
import { Program } from '../../types/app';

const ProgramContext = createContext<Program[] | null>(null);

export const usePrograms = () => {
  const ctx = useContext(ProgramContext);
  if (!ctx) throw new Error('usePrograms must be used within a ProgramProvider');
  return ctx;
};

export const ProgramProvider = ({
  programs,
  children,
}: {
  programs: Program[];
  children: React.ReactNode;
}) => {
  return <ProgramContext.Provider value={programs}>{children}</ProgramContext.Provider>;
};
