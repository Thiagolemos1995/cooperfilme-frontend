"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Film, Menu } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("access_token");
    router.replace("/backoffice/signin");
  };

  return (
    <header className="bg-light-background shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Film className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">
                Cooper Filme
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/"
              className="text-muted-foreground hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Roteiros
            </Link>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sair
            </Button>
          </nav>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu principal"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-white hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Início
            </Link>
            <Link
              href="/filmes"
              className="text-white hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Filmes
            </Link>
            <Link
              href="/series"
              className="text-white hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Séries
            </Link>
            <Link
              href="/sobre"
              className="text-white hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Sobre
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
