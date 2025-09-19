"use client";

import { Button } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/").filter((el) => el !== "");
  const showBackButton = segments[0] === "recipes" && segments.length === 3;

  if (!showBackButton) return null;
  return (
    <div className="absolute top-20 left-10 ">
      <Button color="primary" onPress={() => router.back()}>
        Назад
      </Button>
    </div>
  );
};

export default BackButton;
