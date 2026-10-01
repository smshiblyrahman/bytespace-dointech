import Image from "next/image";
import Link from "next/link";
import type { Creator } from "@/types";

export function CreatorCard({ creator, courseCount }: { creator: Creator; courseCount: number }) {
  return (
    <article className="group relative flex items-center gap-6 rounded-3xl border border-shuttle-200 bg-white p-6 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(0_59_226/0.35)]">
      <Image src={creator.profileImage} alt="" width={96} height={96} className="size-24 rounded-3xl object-cover" />
      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="font-heading text-xl leading-[1.2] font-semibold tracking-[-0.01em] text-shuttle-950">
          <Link
            href={`/creators/${creator.id}`}
            className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-persian-blue-800"
          >
            {creator.name}
          </Link>
        </h3>
        <p className="font-body text-base leading-[1.6] text-shuttle-700">{creator.role}</p>
        <p className="font-body text-base leading-[1.2] font-medium text-shuttle-950">
          <span className="text-persian-blue-800">{courseCount}</span> Courses ·{" "}
          <span className="text-persian-blue-800">{creator.followers}</span> Followers
        </p>
      </div>
    </article>
  );
}
