import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Meal } from '../types/meal.type';

interface AppContextType {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (mealId: string) => void;
  isMealFavorite: (mealId: string) => boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('mdavid29021984@gmail.com-mealFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites) as Meal[]);
      } catch (e) {
        console.error("Error parsing favorites from localStorage:", e);
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mdavid29021984@gmail.com-mealFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (mealToAdd: Meal) => {
    if (!favorites.some(favMeal => favMeal.idMeal === mealToAdd.idMeal)) {
      setFavorites(prevFavorites => [...prevFavorites, mealToAdd]);
    }
  };

  const removeFavorite = (mealIdToRemove: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(favMeal => favMeal.idMeal !== mealIdToRemove));
  };

  const isMealFavorite = (mealId: string): boolean => {
    return favorites.some(favMeal => favMeal.idMeal === mealId);
  };


  // El valor que se proveerá a los consumidores del contexto
  const contextValue: AppContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isMealFavorite,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};