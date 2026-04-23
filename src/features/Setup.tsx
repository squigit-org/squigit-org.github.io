import { AppBrandIcon } from "@/src/components/icons";

export type SetupPlatform = "MacOS" | "Windows" | "Linux";

export function Setup({ platform }: { platform: SetupPlatform }) {
  return (
    <article className="flex min-h-[34rem] flex-col items-center justify-center gap-6 text-center">
      <AppBrandIcon className="h-24 w-24 sm:h-28 sm:w-28" />
      <h3 className="text-3xl font-product-sans font-[450] tracking-[-0.04em] text-slate-950 sm:text-4xl">
        Download for {platform}
      </h3>
    </article>
  );
}
