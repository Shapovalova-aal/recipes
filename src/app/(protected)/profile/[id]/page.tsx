"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRecipeStore } from "@/store/recipe.store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IRecipe } from "@/types/recipe";
// import { useRouter } from "next/navigation";
import RecipeCard from "@/components/common/recipe-card";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { session } = useAuthStore();
  const { recipes, isLoading, error } = useRecipeStore();
  const [recipe, setRecipe] = useState<IRecipe[] | null>([]);
  //   const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (recipes.length > 0 || error) {
      const foundRecipe = recipes.filter((r) => r.userId === id);
      setRecipe(foundRecipe || null);
    }
  }, [recipes, id, error]);

  if (isLoading) return <p className="text-center">Загрузка...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center mb-4">
        <h1 className="text-3xl font-bold">{session?.user?.email}</h1>
      </div>
      <div className="flex flex-col w-full justify-center items-center md:block">
        <Tabs
          aria-label="Options"
          color="secondary"
          classNames={{
            tabContent: "font-semibold text-black ",
            base: "md:pl-3 pt-5 ",
          }}
        >
          <Tab key="myRecipes" title="Мои рецепты">
            <Card className="bg-[--background])">
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recipe &&
                    recipe.map((r) => (
                      <RecipeCard key={r.id} recipe={r} searchQuery={""} />
                    ))}
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="favorites" title="Избранное">
            <Card className="bg-[--background])">
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Optio, accusantium!
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
    // </div>
  );
};

export default ProfilePage;
