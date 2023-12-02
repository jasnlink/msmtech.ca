import { InputHTMLAttributes } from "react";
import { useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    labelName?: string;
}

export default function Input(props:InputProps) {

    const id = useId()
    const inputClass = `w-full py-2 px-3 bg-transparent text-lg text-white rounded-lg border border-zinc-600/80 shadow-sm shadow-zinc-900/80`

    const {labelName, ...htmlProps} = props

    return (
        <div>
            {props.type !== 'hidden' && (
                <label className={`block ms-1 text-lg text-start select-none cursor-default ${props.required ? `after:content-['*'] after:text-red-500` : ``}`} htmlFor={id}>{props.labelName}</label>
            )}
            <div className="mt-1">
                {props.type === 'textarea' && (
                    <textarea
                        name={props.name ?? id}
                        id={id}
                        rows={4}
                        className={inputClass}
                        required={props.required}
                        value={props.value}
                        onChange={props.onChange}
                        {...htmlProps}
                    ></textarea>
                )}
                {props.type !== 'textarea' && (
                    <input 
                        className={inputClass}
                        type={props.type}
                        id={id}
                        name={props.name ?? id}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        required={props.required}
                        min={props.min}
                        max={props.max}
                        {...htmlProps}
                    />
                )}
            </div>
        </div>
    )
}