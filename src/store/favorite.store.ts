import { addFavorite, getFavorites, removeFavorite } from '@/actions/favorite';
import { IRecipe } from '@/types/recipe';
import { create } from 'zustand';

interface IFavoriteState {
    favorites: IRecipe[];
    favoriteIds: Set<string>;
    isLoading: boolean;
    error: string | null;
    loadFavorites: () => Promise<void>;
    toggleFavorite: (recipe: IRecipe) => Promise<void>;
    isFavorite: (recipeId: string) => boolean;
}

export const useFavoriteStore = create<IFavoriteState>((set, get) => ({
    favorites: [],
    favoriteIds: new Set(),
    isLoading: false,
    error: null,

    loadFavorites: async () => {
        set({ isLoading: true, error: null });

        try {
            const result = await getFavorites();

            if (result.success && result.recipes) {
                set({
                    favorites: result.recipes,
                    favoriteIds: new Set(result.recipes.map((r) => r.id)),
                    isLoading: false
                });
            } else {
                set({ error: result.error ?? null, isLoading: false });
            }
        } catch (error) {
            console.log('error', error);
            set({ error: 'Ошибка при загрузке избранного', isLoading: false });
        }
    },

    toggleFavorite: async (recipe: IRecipe) => {
        const currentlyFavorite = get().favoriteIds.has(recipe.id);
        const prevFavorites = get().favorites;
        const prevIds = get().favoriteIds;

        const nextIds = new Set(prevIds);
        if (currentlyFavorite) {
            nextIds.delete(recipe.id);
            set({
                favorites: prevFavorites.filter((r) => r.id !== recipe.id),
                favoriteIds: nextIds
            });
        } else {
            nextIds.add(recipe.id);
            set({
                favorites: [recipe, ...prevFavorites],
                favoriteIds: nextIds
            });
        }

        try {
            const result = currentlyFavorite
                ? await removeFavorite(recipe.id)
                : await addFavorite(recipe.id);

            if (!result.success) {
                set({ favorites: prevFavorites, favoriteIds: prevIds, error: result.error ?? null });
            }
        } catch (error) {
            console.log('error', error);
            set({ favorites: prevFavorites, favoriteIds: prevIds, error: 'Ошибка при изменении избранного' });
        }
    },

    isFavorite: (recipeId: string) => get().favoriteIds.has(recipeId)
}));