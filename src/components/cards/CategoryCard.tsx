import Image from "next/image";
import Link from "next/link";

export function CategoryCard({ label, icon }: { label: string; icon: string }) {
  return (
    <Link
      href={`/search?category=${encodeURIComponent(label)}`}
      className="group flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-3xl border border-shuttle-200 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-persian-blue-800 hover:bg-persian-blue-800"
    >
      <span className="flex rounded-[40px] bg-lime-400 p-3 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
        <Image src={icon} alt="" width={36} height={36} />
      </span>
      <span className="font-body text-xl font-medium leading-[1.2] whitespace-nowrap text-shuttle-950 transition-colors duration-300 group-hover:text-white">
        {label}
      </span>
    </Link>
  );
}
