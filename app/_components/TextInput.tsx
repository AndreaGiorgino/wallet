"use client"

import { ChangeEventHandler, useState } from "react"

interface TextInputProps {
    name: string,
    type?: string,
    defaultValue?: string,
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement>,
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
    name,
    type = "text",
    defaultValue = "",
    onChange = () => { },
    placeholder,
    required = false,
    label,
    className,
    disabled = false,
    min,
    max,
    step,
}: Readonly<TextInputProps>) {
    const [value, setValue] = useState<string>(defaultValue)

    return (
        <label className={`block w-full ${className}`}>
            {label && <span className="text-sm">{label}</span>}
            <input type={type} name={name} className={`bg-zinc-50 dark:bg-black bg-zinc-50 border-2 border-current/25 text-heading text-sm text-current rounded-xl outline-none transition focus:ring-blue-400 block w-full px-3 py-2.5  placeholder:text-body ring-2 ${label && "mt-2"}`} placeholder={placeholder} required={required} min={min} max={max} step={step} disabled={disabled} value={value} onChange={e => {
                setValue(e.target.value)
                onChange(e)
            }} />
        </label>
    )
}