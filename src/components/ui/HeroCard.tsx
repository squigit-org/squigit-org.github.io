import type { ReactNode, Ref } from "react";
import { motion, type MotionValue } from "motion/react";
import { AppBrandIcon } from "@/components/icons";
import { cn } from "@/lib";

type HeroCardProps = {
  text: ReactNode;
  supportingText?: ReactNode;
  primaryButton?: ReactNode;
  secondaryButton?: ReactNode;
  showMeta?: boolean;
  animateMeta?: boolean;
  y?: MotionValue<number>;
  textRef?: Ref<HTMLDivElement>;
  className?: string;
  textClassName?: string;
  supportingTextClassName?: string;
  actionsClassName?: string;
};

const visible = { opacity: 1, y: 0 };
const brandHidden = { opacity: 0, y: 24 };
const actionsHidden = { opacity: 0, y: 38 };

export function HeroCard({
  text,
  supportingText,
  primaryButton,
  secondaryButton,
  showMeta = true,
  animateMeta = true,
  y,
  textRef,
  className,
  textClassName,
  supportingTextClassName,
  actionsClassName,
}: HeroCardProps) {
  const containerStyle = y ? { y } : undefined;
  const hasActions = Boolean(primaryButton || secondaryButton);
  const brandContent = (
    <div className="flex items-center text-slate-950">
      <AppBrandIcon className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
      <span className="pl-2 font-product-sans text-2xl font-[450] tracking-tight sm:text-3xl">
        Squigit
      </span>
    </div>
  );
  const actionsContent = (
    <>
      {primaryButton}
      {secondaryButton}
    </>
  );

  return (
    <motion.div
      style={containerStyle}
      className={cn(
        "relative z-10 mx-auto -mt-14 max-w-5xl text-center sm:-mt-16",
        className,
      )}
    >
      {animateMeta ? (
        <motion.div
          initial={brandHidden}
          animate={showMeta ? visible : brandHidden}
          transition={{ duration: 0.98, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex justify-center"
        >
          {brandContent}
        </motion.div>
      ) : (
        <div className="mb-6 flex justify-center">{brandContent}</div>
      )}

      <div
        ref={textRef}
        className={cn(
          "mx-auto flex max-w-4xl flex-col items-center gap-0.5 sm:gap-1.5",
          textClassName,
        )}
      >
        {text}
      </div>

      {supportingText && animateMeta ? (
        <motion.div
          initial={brandHidden}
          animate={showMeta ? visible : brandHidden}
          transition={{ duration: 0.98, ease: [0.22, 1, 0.36, 1] }}
          className={cn("mt-5 flex justify-center", supportingTextClassName)}
        >
          {supportingText}
        </motion.div>
      ) : supportingText ? (
        <div className={cn("mt-5 flex justify-center", supportingTextClassName)}>
          {supportingText}
        </div>
      ) : null}

      {hasActions && animateMeta ? (
        <motion.div
          initial={actionsHidden}
          animate={showMeta ? visible : actionsHidden}
          transition={{ duration: 1.08, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mt-18 flex flex-col items-center justify-center gap-3 sm:flex-row",
            actionsClassName,
          )}
        >
          {actionsContent}
        </motion.div>
      ) : hasActions ? (
        <div
          className={cn(
            "mt-18 flex flex-col items-center justify-center gap-3 sm:flex-row",
            actionsClassName,
          )}
        >
          {actionsContent}
        </div>
      ) : null}
    </motion.div>
  );
}
