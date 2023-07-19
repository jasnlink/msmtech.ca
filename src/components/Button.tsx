import { PropsWithChildren, forwardRef } from "react";
import { LoadingSpinnerIcon } from "./Icon";

type ButtonVariants = 'default'
type ButtonTypes = 'default' | 'submit'
type ButtonSizes = 'default' | 'large'

interface ButtonProps {
    variant?: ButtonVariants;
    type?: ButtonTypes;
    size?: ButtonSizes;
    href?: string;
    labelName?: string;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    onClick?: () => any;
}

const Button = forwardRef<HTMLAnchorElement, PropsWithChildren<ButtonProps>>((props, ref) => {

    const { variant=`default`, type=`default`, size=`default`, href, loading=false, disabled=false, fullWidth=false, labelName=``, onClick, children } = props
    const variantMap:Record<ButtonVariants, string> = {
        default: `flex items-center justify-center bg-gradient-to-r hover:from-primary-400 hover:to-primary-500 from-[#396afc] to-primary font-semibold rounded-lg shadow-sm shadow-primary-600 transition-all disabled:opacity-40 disabled:pointer-events-none disabled:cursor-default`
    }
    const sizeMap:Record<ButtonSizes, string> = {
        default: ` py-3 px-8 text-lg`,
        large: ` py-3 px-8 lg:py-4 lg:px-12 text-lg lg:text-xl`
    }
    const buttonClass = `${variantMap[variant]}${sizeMap[size]}${fullWidth ? ` w-full text-center` : ` w-fit`}`

    if(type === `submit`) {
        if(ref) throw new Error(`Passing next/link ref to an input element is not needed`)
        return (
            <div>
                <button
                    type="submit"
                    className={buttonClass}
                    onClick={loading || disabled ? (event) => event.preventDefault : onClick}
                    value={labelName}
                    disabled={loading || disabled ? true : false}
                >
                    {!!!loading && (
                        <span>
                            {children}
                        </span>
                    )}
                    {!!loading && (
                        <span className="inline-block p-1 h-7 w-7 animate-spin">
                            {LoadingSpinnerIcon}
                        </span>
                    )}
                </button>
            </div>
        )
    } else {
        return (
            <a
                role="button"
                href={href}
                className={buttonClass}
                onClick={onClick}
                ref={ref}
                title={labelName}
            >
                {children}
            </a>
        )
    }
})

Button.displayName = "Button"

export default Button