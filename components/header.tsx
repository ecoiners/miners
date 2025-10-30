"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { HiMenu } from "react-icons/hi";
import NetworkSwitcher from "./network-switcher";

export default function Header() {
  const menuItem = [
    { label: "Home", link: "#home" },
    { label: "Tools", link: "#tools" },
    { label: "Features", link: "#features" },
    { label: "Price", link: "#price" },
    { label: "FAQ", link: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-green-400/10 bg-gradient-to-b from-slate-900/60 to-slate-900/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        {/* === Logo === */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="ECROP Logo"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="font-semibold text-lg bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            ECROP 100
          </span>
        </Link>

        {/* === Desktop Menu === */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-6">
            {menuItem.map((item, i) => (
              <NavigationMenuItem key={i}>
                <NavigationMenuLink asChild>
                  <a
                    href={item.link}
                    className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* === Right Section === */}
        <div className="flex items-center gap-3">
          <NetworkSwitcher />

          {/* === Mobile Menu === */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="md:hidden hover:bg-green-500 text-white"
              >
                <HiMenu size={22} />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="top"
              className="bg-slate-900/95 backdrop-blur-xl border-l border-green-500/10"
    >
              <nav className="flex items-center flex-col mt-10 space-y-5">
                {menuItem.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    className="text-lg font-medium text-gray-200 hover:text-green-400 transition"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col gap-4">
								  <NetworkSwitcher />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
