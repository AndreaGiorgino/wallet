import { MouseEvent, MouseEventHandler, ReactNode } from "react"

interface ButtonProps {
    label: string,
    type?: "submit" | "reset" | "button",
    form?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    className?: string,
    disabled?: boolean,
}

export default function Button({
    label,
    type = "button",
    form,
    onClick = () => { },
    className,
    disabled = false,
}: Readonly<ButtonProps>) {
    return (
        <button type={type} className={`inline-flex h-[2.5em] items-center justify-center rounded-lg bg-zinc-950 dark:bg-white dark:text-black px-12 py-2 font-medium text-current transition ring-3 border-none outline-none active:scale-95 hover:sm:scale-110 hover:scale-103 w-full sm:w-auto focus:sm:scale-110 focus:scale-103 cursor-pointer ${disabled && "!bg-gray-500"} ${className}`} onClick={(e) => {
            if (type === "button")
                e.preventDefault();

            e.currentTarget.blur()
            onClick(e)
        }} form={form}>
            {label}
        </button>
    )
}