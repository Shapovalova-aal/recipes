"use client";

import RecipeCard from "@/components/common/recipe-card";
import SearchInput from "@/components/UI/SearchInput/SearchInput";
import { useAuthStore } from "@/store/auth.store";
import { useRecipeStore } from "@/store/recipe.store";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function Home() {
  const { recipes, isLoading, error } = useRecipeStore();
  //   console.log("recipes", recipes);
  const { isAuth } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const searchedRecipes = useMemo(() => {
    return recipes.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, recipes]);
  console.log("searchedRecipes", searchedRecipes);

  return (
    <>
      <div className="flex flex-col w-full justify-between items-center mb-4">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {isAuth && (
          <Link href="/recipes/new">
            <Button color="primary">Добавить рецепт</Button>
          </Link>
        )}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isLoading && <p>Загрузка...</p>}
      {!isLoading && searchedRecipes.length == 0 && (
        <h1>Рецепты не найдены!</h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </>
  );
}
