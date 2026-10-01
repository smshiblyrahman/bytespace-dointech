import { notFound } from "next/navigation";
import { getCreator } from "@/data/creators";

/** Validates the creator id before the loading boundary streams, so unknown ids return a real 404. */
export default async function CreatorLayout({ children, params }: LayoutProps<"/creators/[id]">) {
  if (!getCreator((await params).id)) notFound();
  return children;
}
