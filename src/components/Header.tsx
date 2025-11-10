import { Link } from "react-router-dom";
import { Menu, Globe, User } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import type { Language } from "../types";

interface HeaderProps {
  variant?: "platform" | "panchayat";
  panchayatName?: string;
  onLanguageChange?: (lang: Language) => void;
}

export function Header({ variant = "platform", panchayatName, onLanguageChange }: HeaderProps) {
  const navigationItems = variant === "platform" 
    ? [
        { label: "Home", href: "#home" },
        { label: "Features", href: "#features" },
        { label: "Panchayats", href: "#panchayats" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ]
    : [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Schemes", href: "#schemes" },
        { label: "Projects", href: "#projects" },
        { label: "Gallery", href: "#gallery" },
        { label: "Contact", href: "#contact" },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#138808" />
                  <path d="M12 4 L12 20 M4 12 L20 12" stroke="white" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" fill="#FF9933" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-[#138808]">
                {variant === "platform" ? "e-GramSeva" : panchayatName}
              </h1>
              {variant === "platform" ? (
                <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                  Digital Platform for Gram Panchayats
                </p>
              ) : (
                <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                  Gram Panchayat
                </p>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-[#FF9933]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onLanguageChange?.("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange?.("hi")}>
                  हिंदी
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange?.("regional")}>
                  Regional
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {variant === "platform" && (
              <Button 
                asChild
                className="hidden bg-[#FF9933] hover:bg-[#FF9933]/90 md:inline-flex"
              >
                <Link to="/login">
                  <User className="mr-2 h-4 w-4" />
                  Sachiv Login
                </Link>
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 pt-8">
                  {navigationItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="border-b pb-3 transition-colors hover:text-[#FF9933]"
                    >
                      {item.label}
                    </a>
                  ))}
                  {variant === "platform" && (
                    <Button 
                      asChild
                      className="mt-4 bg-[#FF9933] hover:bg-[#FF9933]/90"
                    >
                      <Link to="/login">
                        <User className="mr-2 h-4 w-4" />
                        Sachiv Login
                      </Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
