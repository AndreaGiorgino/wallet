import { ReactNode } from "react";

interface ButtonProps {
    id?: string,
    label: string,
    endIcon?: ReactNode,
    type?: "submit" | "reset" | "button",
    form?: string,
    className?: string,
    onClick?: () => void,
};

export default function Button({
    id,
    label,
    endIcon,
    type = "button",
    form,
    className,
    onClick,
}: Readonly<ButtonProps>) {
    return (
        <button id={id} type={type} className={`dark:invert inline-flex h-[2.5em] items-center justify-center rounded-lg bg-zinc-950 px-12 py-2 font-medium text-current transition ring-3 border-none active:scale-95 hover:scale-110 focus:scale-110 cursor-pointer ${endIcon && "!px-4"} ${className}`} onClick={(e) => {
            e.currentTarget.blur();
            if (onClick)
                onClick();
        }} form={form}>
            {endIcon ? (
                <div className="flex gap-6 justify-between items-center w-full">
                    {label} {endIcon}
                </div>
            ) : (
                label
            )}
        </button>
    );
}