"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
// DATABASE_URL="postgresql://postgres:25dj5eQVB6q0nPCwciOS@containers-us-west-204.railway.app:7361/railway"

//NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dzsl2h59g"
//NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YnJpZ2h0LWJ1bGwtOTEuY2xlcmsuYWNjb3VudHMuZGV2JA
//CLERK_SECRET_KEY=sk_test_3F0fvFtoWgXAOFn06DEbpU7U984ru21su0uQ8k5E54

