import { InputHTMLAttributes } from "react";
import { useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    labelName: string;
}

export default function Input({
    type,
    name,
    labelName,
    placeholder='',
    value,
    onChange,
    required=false,
    min,
    max
}:InputProps) {

    const id = useId()
    const inputClass = `w-full py-2 px-3 bg-transparent text-lg text-white rounded-lg border border-zinc-600/80 shadow-sm shadow-zinc-900/80`

    return (
        <div>
            {type !== 'hidden' && (
                <label className={`ms-1 text-lg select-none cursor-default ${required ? `after:content-['*']` : ``}`} htmlFor={id}>{labelName}</label>
            )}
            <div className="mt-1">
                {type === 'textarea' && (
                    <textarea
                        name={name ?? id}
                        id={id}
                        rows={4}
                        className={inputClass}
                        required={required}
                        value={value}
                        onChange={onChange}
                    ></textarea>
                )}
                {type !== 'textarea' && (
                    <input 
                        className={inputClass}
                        type={type}
                        id={id}
                        name={name ?? id}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        required={required}
                        min={min}
                        max={max}
                    />
                )}
            </div>
        </div>
    )
}