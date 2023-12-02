'use client'
import { handleLoginCode, handleLoginEmail, validateSessionRedirect } from "@/app/actions";
import Button from "@/src/components/Button";
import { ArrowLeftIcon } from "@/src/components/Icon";
import Input from "@/src/components/Input";
import Text from "@/src/components/Text";
import { Transition } from "@headlessui/react";
import { useState } from "react";

interface AffiliateFormProps {
    lng: string;
}
export default function AffiliateForm({ lng }: AffiliateFormProps) {

    const [emailSubmitted, setEmailSubmitted] = useState(false)
    const [emailLoading, setEmailLoading] = useState(false)
    const [emailError, setEmailError] = useState<string | false>(false)

    const [submittedEmail, setSubmittedEmail] = useState('')

    const [loginCodeSubmitted, setLoginCodeSubmitted] = useState(false)
    const [loginCodeLoading, setLoginCodeLoading] = useState(false)
    const [loginCodeError, setLoginCodeError] = useState<string | false>(false)

    return (
        <div className={`relative`}>
            <Transition
                show={!emailSubmitted}
                enter="transition-slide-down ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-slide-down ease-in-out duration-100"
                leaveFrom="opacity-100 blur-none"
                leaveTo="opacity-0 blur-lg"
            >
                <form
                    action={async (data: FormData) => {
                        // Trycatch is here instead of in the function because we need to catch the error here to display the error
                        try {
                            const response = await handleLoginEmail(data)
                            if (response.errors.message) {
                                setEmailError(response.errors.message);
                                return
                            }
                            setSubmittedEmail(response.result.email)
                            setEmailSubmitted(true)
                            setEmailError(false)
                        } catch (e: unknown) {
                            setEmailError('Internal server error, please try again later.');
                        } finally {
                            setEmailLoading(false)
                        }
                    }}
                    onSubmit={(e) => {
                        e.stopPropagation()
                        setEmailLoading(true)
                    }}
                >
                    <Input
                        type="email"
                        name="email"
                        labelName={`Please enter your email`}
                        inputMode={`email`}
                        required
                    />
                    {emailError ? (
                        <Text variant={`body2`} tw={`text-red-400 text-left mt-2`}>{emailError}</Text>
                    ) : null}
                    <div className={`mt-4`}>
                        <Button
                            fullWidth
                            type="submit"
                            labelName={`Send`}
                            loading={emailLoading}
                            size={`default`}
                        >
                            {`Send`}
                        </Button>
                    </div>
                </form>
            </Transition>
            <Transition
                show={emailSubmitted && !loginCodeSubmitted}
                enter="transition-slide-down ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-slide-down ease-in-out duration-500"
                leaveFrom="opacity-100 blur-none"
                leaveTo="opacity-0 blur-lg"
            >
                <form
                    action={async (data: FormData) => {
                        // Trycatch is here instead of in the function because we need to catch the error here to display the error
                        try {
                            const response = await handleLoginCode(data)
                            if (response.errors.message) {
                                setLoginCodeError(response.errors.message);
                                return
                            }
                            setLoginCodeSubmitted(true)
                            const validateSessionRedirectWithLng = validateSessionRedirect.bind(null, lng)
                            await validateSessionRedirectWithLng()
                        } catch (e: unknown) {
                            setLoginCodeError('Internal server error, please try again later.');
                        } finally {
                            setLoginCodeLoading(false)
                        }
                    }}
                    onSubmit={(e) => {
                        e.stopPropagation()
                        setLoginCodeLoading(true)
                    }}
                >
                    <input
                        type={`hidden`}
                        name={`email`}
                        value={submittedEmail}
                    />
                    <input
                        type={`hidden`}
                        name={`lng`}
                        value={lng}
                    />
                    <Input
                        type="number"
                        name="loginCode"
                        labelName={`Please enter your login code`}
                        required
                        onChange={(e) => { if (e.target.value.length > e.target.maxLength) e.target.value = e.target.value.slice(0, e.target.maxLength); }}
                        inputMode={`numeric`}
                        maxLength={6}
                    />
                    {loginCodeError ? (
                        <Text variant={`body2`} tw={`text-red-400 text-left mt-2`}>{loginCodeError}</Text>
                    ) : null}
                    <div className={`mt-4 grid grid-cols-2 gap-2`}>
                        <Button
                            onClick={() => setEmailSubmitted(false)}
                            fullWidth
                            labelName={`Go back`}
                            loading={loginCodeLoading}
                            size={`default`}
                            variant={`secondary`}
                        >
                            {`Go back`}
                        </Button>
                        <Button
                            fullWidth
                            type="submit"
                            labelName={`Confirm`}
                            loading={loginCodeLoading}
                            size={`default`}
                        >
                            {`Confirm`}
                        </Button>
                    </div>
                </form>
            </Transition>
        </div>
    )
}