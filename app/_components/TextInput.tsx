"use client"

interface TextInputProps {
    id: string,
    type?: string,
    defaultValue?: string,
    placeholder?: string,
    required?: boolean,
    label?: string,
}

export default function TextInput({
    id,
    type,
    defaultValue = "",
    placeholder,
    required = false,
    label,
}: Readonly<TextInputProps>) {
    return (
        <label className="block">
            <span className="text-sm">{label}</span>
            <input type={type || "text"} id={id} name={id} className="mt-2 bg-neutral-secondary-medium border-2 border-current/25 text-heading text-sm rounded-xl outline-none transition focus:border-current/75 block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} required={required} defaultValue={defaultValue} />
        </label>
    );
}