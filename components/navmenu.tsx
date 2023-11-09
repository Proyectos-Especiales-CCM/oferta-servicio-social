import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import SignOutButton from "./SignOutButton"
import { Separator } from "./ui/separator"
import { AdminProfile } from "@/lib/types/users/schema"

export async function NavMenu() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: fetchedAdmins, error } = await supabase
    .from('admin_profiles')
    .select('*') as { data: AdminProfile[], error: any }

  let isAdmin = false;
  if (user?.email) isAdmin = fetchedAdmins.map((admin: AdminProfile) => admin.email).includes(user?.email);

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
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Oferta
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {user ? (
            <>
              <NavigationMenuItem>
                <Link href="/favoritos" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Favoritos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {isAdmin && (
                <NavigationMenuItem>
                  <Link href="/admin" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Admin
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
              <NavigationMenuItem>
                <Link href="/account" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Account
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <SignOutButton className={navigationMenuTriggerStyle()} />
            </>
          ) : (
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
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
