"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function FloatingAdminButton() {
  const supabase = createSupabaseBrowserClient();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      const email = data.user?.email?.toLowerCase();
      setIsAdminLoggedIn(email === process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase());
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={isAdminLoggedIn ? "/admin/login" : "/admin/logout"}
        className="rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
      >
        {isAdminLoggedIn ? "Admin Panel" : "Logout Admin"}
      </Link>
    </div>
  );
}