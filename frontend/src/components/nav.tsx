"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "../../public/images/Livre Mercado.png";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function Nav() {
  const { user, logout } = useContext(AuthContext);

  function sair() {
    logout();
  }
  //function

  return (
    <header className="flex items-center justify-between p-[3vw] h-[10vh] bg-[#FAFF01]">
      <Image src={logo} alt="logo" className="w-[10vh]" />

      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-[3vw]">
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className="text-[1.3vw] font-semibold text-zinc-500 hover:text-black transition-colors"
            >
              Comprar
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/compras"
              className="text-[1.3vw] font-semibold text-zinc-500 hover:text-black transition-colors"
            >
              Minhas compras
            </NavigationMenuLink>
          </NavigationMenuItem>
          {user?.admin && (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/admin"
                  className="text-[1.3vw] font-semibold text-zinc-500 hover:text-black transition-colors"
                >
                  Administração
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
          {user ? (
            <NavigationMenuItem>
              <span>
                <p>
                  <b>{user.name}</b>
                </p>
                <button type="button" onClick={() => sair()}>
                  Sair
                </button>
              </span>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/login"
                className="text-[1.3vw] font-semibold text-zinc-500 hover:text-black transition-colors"
              >
                Login
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
