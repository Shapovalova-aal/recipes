"use client";
import { siteConfig } from "@/config/site.config";
import { useParams, usePathname } from "next/navigation";

const Title = () => {
  const pathName = usePathname();
  const currentNavItem = siteConfig.navItems.find(
    (item) => item.href === pathName
  );
  const { slug } = useParams<{ slug: string[] }>();
  let pageTitle = currentNavItem ? currentNavItem.label : siteConfig.title;
  if (slug) {
    const [name] = slug;
    pageTitle = decodeURIComponent(name);
  }

  return (
    <div className="w-full flex justify-center my-6">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
    </div>
  );
};

export default Title;
