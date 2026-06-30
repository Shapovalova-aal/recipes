'use server';

import { auth } from '@/auth/auth';
import { prisma } from '@/utils/prisma';
import { revalidatePath } from 'next/cache';

export async function getFavorites() {
    try {
        const session = await auth();
        if (!session?.user?.id) return { success: false, error: 'Неавторизован' };

        const favorites = await prisma.favorite.findMany({
            where: { userId: session.user.id },
            include: {
                recipe: {
                    include: {
                        ingredients: {
                            include: { ingredient: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return { success: true, recipes: favorites.map((f) => f.recipe) };
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return { success: false, error: 'Ошибка при загрузке избранного' };
    }
}

export async function addFavorite(recipeId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) return { success: false, error: 'Неавторизован' };

        await prisma.favorite.upsert({
            where: {
                userId_recipeId: { userId: session.user.id, recipeId }
            },
            create: { userId: session.user.id, recipeId },
            update: {}
        });

        revalidatePath('/profile');
        return { success: true };
    } catch (error) {
        console.error('Error adding favorite:', error);
        return { success: false, error: 'Ошибка при добавлении в избранное' };
    }
}

export async function removeFavorite(recipeId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) return { success: false, error: 'Неавторизован' };

        await prisma.favorite.deleteMany({
            where: { userId: session.user.id, recipeId }
        });

        revalidatePath('/profile');
        return { success: true };
    } catch (error) {
        console.error('Error removing favorite:', error);
        return { success: false, error: 'Ошибка при удалении из избранного' };
    }
}