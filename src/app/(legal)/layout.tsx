import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate pb-24 pt-32 sm:pt-40">
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Retour à l&apos;accueil
        </Link>
        {children}
      </Container>
    </div>
  );
}
