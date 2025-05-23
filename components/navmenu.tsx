import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Separator } from "./ui/separator"

export async function NavMenu() {
  return (
    <div className="flex w-full items-center justify-center lg:justify-between px-1 lg:px-40 space-x-8 pt-2">
      <Link href="/" passHref>
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/tec-logo.webp"
            alt="Logo"
            width={200}
            height={50}
            className="w-24 h-auto cursor-pointer"
          />
          <Separator orientation="vertical" className="h-6 bg-black" />
          <Image
            src="/servicio-logo.webp"
            alt="Logo"
            width={200}
            height={50}
            className="w-20 h-auto cursor-pointer"
          />
        </div>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/catalogo" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Catalogo
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/favoritos" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Favoritos
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div >
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md px-2 py-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
