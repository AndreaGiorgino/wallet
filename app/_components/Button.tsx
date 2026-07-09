import { ReactNode } from "react";

interface ButtonProps {
    id?: string,
    label: string,
    type?: "submit" | "reset" | "button",
    form?: string,
    className?: string,
    onClick?: () => void,
};

export default function Button({
    id,
    label,
    type = "button",
    form,
    className,
    onClick,
}: Readonly<ButtonProps>) {
    return (
        <button id={id} type={type} className={`dark:invert inline-flex h-[2.5em] items-center justify-center rounded-lg bg-zinc-950 px-12 py-2 font-medium text-current transition ring-3 border-none active:scale-95 hover:sm:scale-110 hover:scale-103 w-full sm:w-auto focus:sm:scale-110 focus:scale-103 cursor-pointer ${className}`} onClick={(e) => {
            e.currentTarget.blur();
            if (onClick)
                onClick();
        }} form={form}>
            {label}
        </button>
    );
}