import { render, screen, act, waitFor } from '@testing-library/react';
import { AppProvider, useAppContext } from './AppContext';
import { Meal } from '../types/meal.type';
import mockMeal1DATA from '../test-data/meals.one-data.json';
import mockMeal2DATA from '../test-data/meals.one-2-data.json';
const localMockMeal1: Meal = mockMeal1DATA.meals[0];

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: jest.fn((key: string) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('AppProvider and useAppContext', () => {
  const TEST_KEY = 'mdavid29021984@gmail.com-mealFavorites';
  const mockMeal1: Meal = mockMeal1DATA.meals[0];
  const mockMeal2: Meal = mockMeal2DATA.meals[0];

  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  test('useAppContext throws error when not used within AppProvider', () => {
    const TestComponent = () => {
      useAppContext();
      return null;
    };
    expect(() => render(<TestComponent />)).toThrow('useAppContext must be used within an AppProvider');
  });

  test('handles error when parsing favorites from localStorage', () => {
    localStorageMock.getItem.mockReturnValueOnce('invalid json');

    render(<AppProvider><div></div></AppProvider>);

    expect(localStorageMock.getItem).toHaveBeenCalledWith(TEST_KEY);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error parsing favorites from localStorage:", expect.any(Error));
    const TestComponent = () => {
      const { favorites } = useAppContext();
      return <div data-testid="favorites-count">{favorites.length}</div>;
    };
    render(<AppProvider><TestComponent /></AppProvider>);
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(TEST_KEY, "[]");
  });

  test('addFavorite does not add meal if already a favorite', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([mockMeal1]));

    let addFavoriteFn: (meal: Meal) => void;
    const TestComponent = () => {
      const { addFavorite } = useAppContext();
      addFavoriteFn = addFavorite;
      return null;
    };
    render(<AppProvider><TestComponent /></AppProvider>);

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(TEST_KEY, JSON.stringify([]));
    expect(localStorageMock.setItem).toHaveBeenCalledWith(TEST_KEY, JSON.stringify([mockMeal1]));

    act(() => {
      addFavoriteFn(mockMeal1);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
  });

  test('removeFavorite removes meal from favorites', async () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([mockMeal1, mockMeal2]));

    let removeFavoriteFn: (mealId: string) => void;
    const TestComponent = () => {
      const { removeFavorite, favorites } = useAppContext();
      removeFavoriteFn = removeFavorite;
      return <div data-testid="favorites-display">{favorites.length}</div>;
    };

    render(<AppProvider><TestComponent /></AppProvider>);

    await waitFor(() => {
      expect(screen.getByTestId('favorites-display')).toHaveTextContent('2');
    });

    localStorageMock.setItem.mockClear();

    act(() => {
      removeFavoriteFn(mockMeal1.idMeal);
    });

    await waitFor(() => {
        expect(screen.getByTestId('favorites-display')).toHaveTextContent('1');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    const storedFavorites = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
    const expectedIdMeal = mockMeal2.idMeal;
    const mealExists = storedFavorites.some((meal: Meal) => meal && meal.idMeal === expectedIdMeal);
    expect(mealExists).toBe(true);
  });

  // Test para línea 50: isMealFavorite
  test('isMealFavorite returns true if meal is favorite', async () => {
    // 1. Controla lo que localStorage.getItem devuelve al AppProvider al inicio
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([localMockMeal1]));

    let isMealFavoriteFn: (mealId: string) => boolean;
    const TestComponent = () => {
      const { isMealFavorite } = useAppContext();
      isMealFavoriteFn = isMealFavorite;
      // El display ahora reflejará el resultado de isMealFavorite después de la carga
      return <div data-testid="is-favorite-status">{isMealFavorite(localMockMeal1.idMeal).toString()}</div>;
    };

    render(<AppProvider><TestComponent /></AppProvider>);

    // 2. Await para que el estado 'favorites' se cargue y se refleje que la comida es favorita
    await waitFor(() => {
      expect(screen.getByTestId('is-favorite-status')).toHaveTextContent('true');
    });
  });

  test('isMealFavorite returns false if meal is not favorite', () => {
    localStorageMock.setItem(TEST_KEY, JSON.stringify([mockMeal1]));

    let isMealFavoriteFn: (mealId: string) => boolean;
    const TestComponent = () => {
      const { isMealFavorite } = useAppContext();
      isMealFavoriteFn = isMealFavorite;
      return null;
    };
    render(<AppProvider><TestComponent /></AppProvider>);

    let result: boolean = false;
    act(() => {
      result = isMealFavoriteFn(mockMeal2.idMeal);
    });
    expect(result).toBe(false);
  });

  // Test para línea 54: setFavoritesMode
  test('setFavoritesMode updates favoriteMode', async () => { // Make it async
    let setFavoritesModeFn: (value: boolean) => void;
    const TestComponent = () => {
      const { setFavoritesMode, favoriteMode } = useAppContext();
      setFavoritesModeFn = setFavoritesMode;
      return <div data-testid="favorite-mode-display">{favoriteMode.toString()}</div>;
    };

    render(<AppProvider><TestComponent /></AppProvider>);

    // Initial state check
    expect(screen.getByTestId('favorite-mode-display')).toHaveTextContent('false');

    act(() => {
      setFavoritesModeFn(true);
    });

    await waitFor(() => { // Await for the display to update
      expect(screen.getByTestId('favorite-mode-display')).toHaveTextContent('true');
    });

    act(() => { // Test setting back to false
        setFavoritesModeFn(false);
    });
    await waitFor(() => {
        expect(screen.getByTestId('favorite-mode-display')).toHaveTextContent('false');
    });
  });

  test('addFavorite adds meal if not already a favorite', async () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([])); // Inicia con favoritos vacíos

    let addFavoriteFn: (meal: Meal) => void;
    const TestComponent = () => {
      const { addFavorite, favorites } = useAppContext();
      addFavoriteFn = addFavorite;
      return <div data-testid="favorites-display">{favorites.length}</div>;
    };
    render(<AppProvider><TestComponent /></AppProvider>);

    // Esperar a que el estado inicial se cargue y se refleje (0 favoritos)
    await waitFor(() => {
      expect(screen.getByTestId('favorites-display')).toHaveTextContent('0');
    });

    localStorageMock.setItem.mockClear(); // Limpiamos llamadas de inicialización

    act(() => {
      addFavoriteFn(localMockMeal1); // Añade una nueva comida
    });

    // Esperar a que el display muestre 1 favorito (la comida añadida)
    await waitFor(() => {
      expect(screen.getByTestId('favorites-display')).toHaveTextContent('1');
    });

    // Verificar que setItem fue llamado 1 vez con la comida añadida
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    const storedFavorites = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
    expect(storedFavorites.some((meal: Meal) => meal && meal.idMeal === localMockMeal1.idMeal)).toBe(true);
  });
});