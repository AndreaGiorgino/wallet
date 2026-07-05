interface ButtonProps {
    label: string,
    type?: "submit" | "reset" | "button",
    form?: string,
    className?: string,
    onClick?: () => void,
};

export default function Button({
    label,
    type = "button",
    form,
    className,
    onClick,
}: Readonly<ButtonProps>) {
    return (
        <button type={type} className={`invert inline-flex h-[2.5em] items-center justify-center rounded-full bg-neutral-950 px-12 py-2 font-medium text-neutral-50 transition active:scale-95 hover:scale-110 focus:scale-110 cursor-pointer outline-none ${className}`} onClick={(e) => {
            e.currentTarget.blur();
            if (onClick)
                onClick();
        }} form={form}>
            {label}
        </button>
    );
}