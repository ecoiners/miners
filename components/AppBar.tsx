import { FC, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import NetworkSwitcher from "./NetworkSwitcher";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AppBar: FC = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", link: "#home" },
    { label: "Tools", link: "#tools" },
    { label: "Features", link: "#features" },
    { 
      label: "Products", 
      link: "#products",
      submenu: [
        { label: "Analytics", link: "#analytics" },
        { label: "Monitoring", link: "#monitoring" },
        { label: "Automation", link: "#automation" }
      ]
    },
    { label: "Price", link: "#price" },
    { label: "FAQ", link: "#faq" },
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/60 backdrop-blur-md border-b border-green-500/20 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
          
          {/* === Logo === */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="h-9 w-9"
            />
            <span className="font-semibold text-lg bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
              ECROP 100
            </span>
          </a>

          {/* === Desktop Nav with shadcn/ui === */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-slate-800/50 data-[state=open]:bg-slate-800/70 text-slate-200 hover:text-green-400">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[200px] p-2 bg-slate-900 border border-green-500/20 rounded-lg">
                            {item.submenu.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.link}
                                className="block p-2 text-sm text-slate-200 hover:text-green-400 hover:bg-slate-800/50 rounded-md transition-colors"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <a href={item.link}>
                        <NavigationMenuLink className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent hover:bg-slate-800/50 text-slate-200 hover:text-green-400"
                        )}>
                          {item.label}
                        </NavigationMenuLink>
                      </a>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* === Tablet Nav (simplified) === */}
          <nav className="hidden md:flex lg:hidden items-center gap-4">
            {menuItems.slice(0, 4).map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-slate-200 hover:text-green-400 transition-colors text-sm font-medium px-2 py-1 rounded-md hover:bg-slate-800/50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* === Right Section === */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <NetworkSwitcher />
            </div>

            {/* Mobile Sheet */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden text-white hover:bg-slate-800/50 hover:text-green-400"
                >
                  {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="bg-slate-900/95 border-l border-green-500/20 backdrop-blur-md w-[280px] sm:w-[350px]"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b border-green-500/10">
                    <a 
                      href="/" 
                      className="flex items-center gap-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <img
                        src="/assets/logo.png"
                        alt="logo"
                        className="h-8 w-8"
                      />
                      <span className="font-semibold text-lg bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                        ECROP 100
                      </span>
                    </a>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-4">
                      {menuItems.map((item, index) => (
                        <div key={index}>
                          {item.submenu ? (
                            <div className="space-y-2">
                              <p className="text-green-400 font-medium text-sm uppercase tracking-wide">
                                {item.label}
                              </p>
                              <div className="space-y-1 ml-2">
                                {item.submenu.map((subItem, subIndex) => (
                                  <SheetClose asChild key={subIndex}>
                                    <a
                                      href={subItem.link}
                                      className="block py-2 px-3 text-slate-200 hover:text-green-400 hover:bg-slate-800/50 rounded-md transition-colors text-base"
                                    >
                                      {subItem.label}
                                    </a>
                                  </SheetClose>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <SheetClose asChild>
                              <a
                                href={item.link}
                                className="block py-3 px-3 text-slate-200 hover:text-green-400 hover:bg-slate-800/50 rounded-md transition-colors text-base font-medium border-l-2 border-transparent hover:border-green-500/50"
                              >
                                {item.label}
                              </a>
                            </SheetClose>
                          )}
                        </div>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-green-500/10">
                    <div className="sm:hidden">
                      <NetworkSwitcher />
                    </div>
                    <div className="mt-4 pt-4 border-t border-green-500/10">
                      <p className="text-slate-400 text-sm text-center">
                        ECROP 100 © 2024
                      </p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="pt-20 md:pt-24">{props.children}</main>
    </div>
  );
};

export default AppBar;