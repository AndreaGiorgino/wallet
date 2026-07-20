"use client"

import { useState } from "react";

interface TextInputProps {
    id: string,
    type?: string,
    defaultValue?: string,
    placeholder?: string,
    required?: boolean,
    label?: string,
    className?: string,
    disabled?: boolean,
    min?: number,
    max?: number,
    step?: number,
}

export default function TextInput({
    id,
    type = "text",
    defaultValue = "",
    placeholder,
    required = false,
    label,
    className,
    disabled = false,
    min,
    max,
    step,
}: Readonly<TextInputProps>) {
    const [value, setValue] = useState<string>(defaultValue);

    return (
        <label className="block w-full">
            {label && <span className="text-sm">{label}</span>}
            <input type={type} id={id} name={id} className={`bg-zinc-50 dark:bg-black bg-zinc-50 border-2 border-current/25 text-heading text-sm text-current rounded-xl outline-none transition focus:ring-blue-400 block w-full px-3 py-2.5  placeholder:text-body ring-2 ${label && "mt-2"} ${className}`} placeholder={placeholder} required={required} min={min} max={max} step={step} disabled={disabled} value={value} onChange={e => setValue(e.target.value)} />
        </label>
    );
}