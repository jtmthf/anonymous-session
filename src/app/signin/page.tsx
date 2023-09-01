"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    signIn("credentials", {
      callbackUrl: searchParams.get("callbackUrl") ?? "/",
    });
  }, [searchParams]);
}
