"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { cn, getInitials } from "@/lib/utils";
import type { Session } from "@/lib/user"; // <-- FIXED: use your own type
import { adminSideBarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const SchoolSidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10 max-md:w-20 max-md:px-2">
      <div>
        {/* Logo Section */}
        <div className="flex flex-row items-center gap-2 border-b border-dashed pb-10 max-md:justify-center">
          <Image
            src="/icons/admin/logo.svg"
            alt="Logo"
            width={37}
            height={37}
          />
          <h1 className="text-2xl font-semibold text-[#25388C] max-md:hidden">
            EdGrade
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/school" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-lg font-medium text-base transition-colors",
                    // Desktop styles
                    "px-5 py-2 sm:px-4 sm:py-2 sm:text-sm",
                    // Mobile styles - square shape with centered icon
                    "max-md:justify-center max-md:px-2 max-md:py-3 max-md:w-12 max-md:h-12 max-md:mx-auto",
                    isSelected
                      ? "border border-[#B9C6E4] bg-[#25388C] text-white hover:bg-[#1e2e6d]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#25388C]"
                  )}
                >
                  <Image
                    src={link.img}
                    alt={link.text}
                    width={20}
                    height={20}
                    className={cn(
                      "transition-all duration-200",
                      isSelected ? "brightness-0 invert" : ""
                    )}
                  />
                  <span className="max-md:hidden">{link.text}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="mt-8 flex items-center gap-3 rounded-lg bg-gray-50 p-3 md:bg-transparent md:p-0">
        <Avatar className="flex-shrink-0">
          <AvatarFallback className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg font-semibold text-black">
            {getInitials(session?.user?.email || "IN")}
          </AvatarFallback>
        </Avatar>
        
        {/* User info - hidden on small screens */}
        <div className="hidden min-w-0 flex-col sm:flex">
          <p className="truncate text-sm font-medium text-gray-900">
            {session?.user?.name || "User"}
          </p>
          <p className="truncate text-xs text-gray-500">
            {session?.user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchoolSidebar;