"use client"

interface TextInputProps {
    id: string,
    type?: string,
    defaultValue?: string,
    placeholder?: string,
    required?: boolean,
    label?: string,
    className?: string,
}

export default function TextInput({
    id,
    type,
    defaultValue = "",
    placeholder,
    required = false,
    label,
    className,
}: Readonly<TextInputProps>) {
    return (
        <label className="block w-full">
            {label && <span className="text-sm">{label}</span>}
            <input type={type || "text"} id={id} name={id} className={`bg-zinc-50 dark:bg-black bg-zinc-50 border-2 border-current/25 text-heading text-sm text-current rounded-xl outline-none transition focus:ring-blue-400 block w-full px-3 py-2.5  placeholder:text-body ring-2 ${label && "mt-2"} ${className}`} placeholder={placeholder} required={required} defaultValue={defaultValue} />
        </label>
    );
}