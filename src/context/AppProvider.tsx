'use client';

import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AppContextType {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean) => void;
  handleOpenFilters: (state: boolean) => void;
  isNewsletterModalOpen: boolean;
  setIsNewsletterModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps): ReactElement => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  const handleOpenFilters = (state: boolean) => {
    setIsFiltersOpen(state);
  };

  const freeze = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.body.style.overflowY = 'hidden';
      document.body.style.touchAction = 'none';
    }
  };

  const unfreeze = () => {
    if (typeof window !== 'undefined') {
      document.body.style.overflowY = 'auto';
      document.body.style.touchAction = '';
    }
  };

  useEffect(() => {
    if (isFiltersOpen) {
      freeze();
    } else {
      unfreeze();
    }
  }, [isFiltersOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isFiltersOpen: isFiltersOpen,
        setIsFiltersOpen: setIsFiltersOpen,
        handleOpenFilters: handleOpenFilters,
        isNewsletterModalOpen: isNewsletterModalOpen,
        setIsNewsletterModalOpen: setIsNewsletterModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
