"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AppContextType {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (state: boolean) => void;
  handleOpenFilters: (state: boolean) => void;
  isNewsletterModalOpen: boolean;
  setIsNewsletterModalOpen: (state: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  isFiltersOpen: false,
  setIsFiltersOpen: () => {},
  handleOpenFilters: () => {},
  isNewsletterModalOpen: false,
  setIsNewsletterModalOpen: () => {},
});

export const useAppProvider = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  const handleOpenFilters = (state: boolean) => {
    setIsFiltersOpen(state);
  };

  const freeze = () => {
    window.scrollTo(0, 0);
    let bodyElement = document.body;
    bodyElement.style.overflowY = "hidden";
    bodyElement.style.touchAction = "none";
  };

  const unfreeze = () => {
    let bodyElement = document.body;
    bodyElement.style.overflowY = "auto";
    bodyElement.style.touchAction = "";
  };

  useEffect(() => {
    isFiltersOpen ? freeze() : unfreeze();
  }, [isFiltersOpen, freeze, unfreeze]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // FETCH HP INITIAL DATA

  return (
    <AppContext.Provider
      value={{
        isFiltersOpen,
        setIsFiltersOpen,
        handleOpenFilters,
        isNewsletterModalOpen,
        setIsNewsletterModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
