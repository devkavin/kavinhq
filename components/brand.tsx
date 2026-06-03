import Link from "next/link";

export function Brand() {
  return (
    <Link className="inline-flex items-center gap-1 text-base font-semibold tracking-tight text-white" href="/">
      Kavin<span className="text-sky-400">HQ</span>
    </Link>
  );
}
