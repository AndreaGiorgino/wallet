interface TextInputProps {
    id: string,
    type?: string,
    placeholder?: string,
    required?: boolean,
    label?: string,
}

export default function TextInput({
    id,
    type,
    placeholder,
    required = false,
    label,
}: Readonly<TextInputProps>) {
    return (
        <div>
            {
                (label !== "") && (
                    <label htmlFor={id} className="block mb-2.5 text-sm font-medium text-heading">{label}</label>
                )
            }
            <input type={type || "text"} id={id} name={id} className="bg-neutral-secondary-medium border-2 border-current/25 text-heading text-sm rounded-xl outline-none transition focus:border-current/75 block w-full px-3 py-2.5 shadow-xs placeholder:text-body " placeholder={placeholder} required={required} />
        </div>
    );
}