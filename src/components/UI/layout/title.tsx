"use client";
import { siteConfig } from "@/config/site.config";
import { useParams, usePathname } from "next/navigation";

const Title = () => {
  const pathName = usePathname();
  const params = useParams();

  const currentNavItem = siteConfig.navItems.find(
    (item) => item.href === pathName
  );

  let pageTitle = siteConfig.title;

  if (pathName.startsWith("/profile")) {
    pageTitle = "Мой профиль";
  } else if (pathName.startsWith("/recipes")) {
    const slug = (params.slug as string) || undefined;

    if (slug && slug.length > 0) {
      pageTitle = decodeURIComponent(slug[0]);
    } else if (!slug && params.id) {
      pageTitle = "Редактировать рецепт";
    } else if (pathName.startsWith("/recipes/new")) {
      pageTitle = "Создать рецепт";
    } else {
      pageTitle = "Рецепты";
    }
  } else {
    if (currentNavItem) {
      pageTitle = currentNavItem.label;
    }
  }
  console.log("title", pageTitle);

  return (
    <div className="w-full flex justify-center my-6">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
    </div>
  );
};

export default Title;
