"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { getInitials } from "@/lib/utils";
import type { Session } from "@/lib/user";


const Sidebar = ({ session }: { session: Session }) => {
  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10;">
      <div>
        <div className="flex flex-row items-center gap-2 border-b border-dashed pt-10 pb-10 max-md:justify-center">
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

        <div className="mt-10 flex flex-col gap-5">
          <Link href="/admin">
            <div className="flex items-center gap-2 rounded-lg border border-[#B9C6E4] bg-[#25388C] px-5 py-2 text-white font-medium text-base transition-colors hover:bg-[#1e2e6d] sm:px-4 sm:py-2 sm:text-sm max-md:justify-center max-md:px-3">
              <Image
                src="/icons/admin/home.svg"
                alt="Dashboard"
                width={20}
                height={20}
                className="invert-0"
              />
              <span className="max-md:hidden">Dashboard</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-8">
        <Avatar>
          <AvatarFallback className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-black font-semibold text-lg">
            {getInitials(session?.user?.email || "IN")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-md:hidden">
            <p className="text-xs text-light-500">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
