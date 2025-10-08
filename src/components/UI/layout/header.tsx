"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import React, { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";

export const Logo = () => {
  return (
    <Image
      src="/logo_tatar_kitchen.png"
      alt={siteConfig.title}
      width={26}
      height={26}
      priority
    />
  );
};

export default function Header() {
  const pathname = usePathname();
  const { isAuth, session, status, setAuthState } = useAuthStore();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavItems = () => {
    const filteredLinks = siteConfig.navItems.filter((item) => {
      if (item.href === "/ingredients") {
        return isAuth;
      }
      return true;
    });

    return filteredLinks.map((item, index) => {
      const isLast = index == filteredLinks.length - 1;
      const href = isLast ? `/profile/${session?.user?.id}` : item.href;

      const isActive =
        pathname === href ||
        (href.startsWith("/profile/") && pathname.startsWith("/profile/"));

      return (
        <NavbarItem key={href}>
          <Link
            onClick={() => setIsMenuOpen(false)}
            color="foreground"
            href={href}
            className={`px-3 py-1
                ${isActive ? "text-blue-500" : "text-foregrund"} 
                border
                border-transparent
                rounded-md
                text-xl
                lg:text-medium
                hover:text-blue-300 hover:border
                hover:border-blue-300 hover:rounded-md
                transition-colors
                transition-border
                duration-200`}
          >
            {item.label}
          </Link>
        </NavbarItem>
      );
    });
  };

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.log("error", error);
    }

    setAuthState("unauthenticated", null);
  };
  const AuthButtons = () => {
    return (
      <div className="flex items-center justify-between">
        {isAuth && (
          <span className="mr-2 whitespace-nowrap">
            Привет, {session?.user?.email}!
          </span>
        )}
        {status === "loading" ? (
          <p>Загрузка...</p>
        ) : !isAuth ? (
          <div className="flex items-center justify-start ">
            <NavbarItem className="m-2">
              <Button
                as={Link}
                color="secondary"
                href="#"
                variant="flat"
                onPress={() => setIsLoginOpen(true)}
              >
                Логин
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Регистрация
              </Button>
            </NavbarItem>
          </div>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color="secondary"
              href="#"
              variant="flat"
              onPress={handleSignOut}
            >
              Выйти
            </Button>
          </NavbarItem>
        )}
      </div>
    );
  };

  return (
    <Navbar
      style={{ height: layoutConfig.headerHeight }}
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
    >
      <NavbarBrand>
        <Link href="/" className="flex gap-1">
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.title}</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {getNavItems()}
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="end">
        {AuthButtons()}
      </NavbarContent>
      <NavbarContent className="lg:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
      </NavbarContent>
      <NavbarMenu>
        <div className="md:hidden px-3">{AuthButtons()}</div>
        <div className="w-full h-[1px] m-2 bg-secondary-500" />
        {getNavItems()}
      </NavbarMenu>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  );
}
