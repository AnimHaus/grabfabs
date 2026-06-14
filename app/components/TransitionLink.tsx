"use client";

import { type ComponentProps } from "react";
import { usePageTransition } from "./PageTransitionProvider";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string };

/**
 * Drop-in replacement for Next <Link> that triggers the page transition.
 * Usage: <TransitionLink href="/products">...</TransitionLink>
 */
export default function TransitionLink({ href, onClick, children, ...props }: Props) {
  const { navigate } = usePageTransition();

  return (
    <a
      href={href}
      onClick={(e) => {
        // Let browser handle external links, new-tab clicks, etc.
        if (
          e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
          href.startsWith("http") || href.startsWith("mailto")
        ) {
          onClick?.(e);
          return;
        }
        e.preventDefault();
        onClick?.(e);
        navigate(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
