import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Overline } from "@/components/primitives/overline";

export default function NotFound() {
  return (
    <section className="container-page py-32 flex flex-col items-center text-center gap-6">
      <Overline>404 · Not Found</Overline>
      <h1 className="font-serif text-[length:var(--text-display-mobile)] lg:text-[length:var(--text-display-lg)] leading-tight text-balance">
        This page hasn&apos;t been written.
      </h1>
      <p className="text-[color:var(--color-ink-soft)] max-w-md">
        The address you requested doesn&apos;t exist in this portfolio. Head
        back to the home page.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">
          Return Home
        </Button>
      </Link>
    </section>
  );
}
