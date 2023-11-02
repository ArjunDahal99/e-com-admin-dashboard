"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/billboards`,
      lable: "Billboards",
      active: new RegExp(`^/${params.storeId}/billboards.*`).test(pathname),
    },
    {
      href: `/${params.storeId}/categories`,
      lable: "Categories",
      active: new RegExp(`^/${params.storeId}/categories.*`).test(pathname),
    },
    {
      href: `/${params.storeId}/products`,
      lable: "Products",
      active: new RegExp(`^/${params.storeId}/products.*`).test(pathname),
    },
    {
      href: `/${params.storeId}/sizes`,
      lable: "Sizes",
      active: new RegExp(`^/${params.storeId}/sizes.*`).test(pathname),
    },
    {
      href: `/${params.storeId}/colors`,
      lable: "Colors",
      active: new RegExp(`^/${params.storeId}/colors.*`).test(pathname),
    },
    {
      href: `/${params.storeId}/overview`,
      lable: "Overview",
      active: new RegExp(`^/${params.storeId}/overview.*`).test(pathname),
    },
    {
      href: `/${params.storeId}/orders`,
      lable: "Order",
      active: new RegExp(`^/${params.storeId}orders.*`).test(pathname),
    },
    {
      href: `/${params.storeId}/settings`,
      lable: "Settings",
      active: new RegExp(`^/${params.storeId}/settings.*`).test(pathname),
    },
  ];

  return (
    <>
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : " text-muted-foreground"
            )}
          >
            {route.lable}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default MainNav;
