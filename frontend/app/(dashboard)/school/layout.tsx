// frontend/app/(dashboard)/school/layout.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SchoolSidebar from "@/components/dashboard/Schoolsidebar";
import Header from "@/components/dashboard/Header";
import { getUserInfo, Session } from "@/lib/user";

 


export default function Layout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    getUserInfo(token)
      .then((user) => {
        if (user.role !== "user") {
          router.replace("/unauthorized");
        } else {
          setSession({ user });
        }
      })
      .catch(() => {
        router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!session) return null;

  return (
    <main className="flex min-h-screen w-full flex-row">
      <SchoolSidebar session={session} />
      <div className="flex w-[calc(100%-264px)] flex-1 flex-col bg-[#F8F8FF] p-5 sm:p-10">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
}