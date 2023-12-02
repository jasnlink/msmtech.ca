'use client'

import { actionAddLead } from "@/app/actions"
import Button from "@/src/components/Button"
import Input from "@/src/components/Input"
import Select from "@/src/components/Select"
import Text from "@/src/components/Text"
import { SelectOption } from "@/src/models"
import { useState } from "react"

interface LeadsFormProps {
    lng: string;
}

export default function LeadsForm({
    lng,
}: LeadsFormProps) {

    const [formSubmitted, setFormSubmitted] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [formError, setFormError] = useState<string | false>(false)
    const [shopNameError, setShopNameError] = useState<string | false>(false)
    const [shopEmailError, setShopEmailError] = useState<string | false>(false)
    const [appSelectError, setAppSelectError] = useState<string | false>(false)

    
    const appOptions:Array<SelectOption> = [
        { id: 1, name: 'Ultimate PO Box Blocker', unavailable: false },
        { id: 2, name: 'Deliverly - Local Deliveries (Coming Soon)', unavailable: false },
    ]
    const [selectedApp, setSelectedApp] = useState<SelectOption>((appOptions[0]))

    return (
        <form
            action={async (data: FormData) => {
                // Trycatch is here instead of in the function because we need to catch the error here to display the error
                try {
                    const actionAddLeadWithLng = actionAddLead.bind(null, lng)
                    const response = await actionAddLeadWithLng(data)
                    if (response.errors.message) {
                        if (response.errors.path === 'shopName') {
                            setShopNameError(response.errors.message);
                        } else if (response.errors.path === 'shopEmail') {
                            setShopEmailError(response.errors.message);
                        } else if (response.errors.path === 'app') {
                            setAppSelectError(response.errors.message);
                        }
                        return
                    }
                    setFormSubmitted(true)
                } catch (e: unknown) {
                    setFormError('Internal server error, please try again later.');
                } finally {
                    setSubmitLoading(false)
                }
            }}
            onSubmit={() => setSubmitLoading(true)}
        >
            {formError ? (
                <Text variant={`body2`} tw={`text-red-400 text-left mt-2`}>{formError}</Text>
            ) : null}
            <div className={`mt-4`}>
                <Input
                    type="text"
                    labelName={`Shop name`}
                    name="shopName"
                    inputMode={`text`}
                    required
                />
                {shopNameError ? (
                    <Text variant={`body2`} tw={`text-red-400 text-left mt-2`}>{shopNameError}</Text>
                ) : null}
            </div>
            <div className={`mt-4`}>
                <Input
                    type="email"
                    name="shopEmail"
                    labelName={`Shop email`}
                    inputMode={`email`}
                    required
                />
                {shopEmailError ? (
                    <Text variant={`body2`} tw={`text-red-400 text-left mt-2`}>{shopEmailError}</Text>
                ) : null}
            </div>
            <div className={`mt-4`}>
                <Select
                    data={appOptions}
                    name="app"
                    labelName={`App`}
                    selected={selectedApp}
                    onChange={setSelectedApp}
                    required
                />
                {appSelectError ? (
                    <Text variant={`body2`} tw={`text-red-400 text-left mt-2`}>{appSelectError}</Text>
                ) : null}
            </div>
            <div className={`mt-8`}>
                <Button
                    fullWidth
                    type="submit"
                    labelName={`Send`}
                    loading={submitLoading}
                    size={`default`}
                >
                    {`Send`}
                </Button>
            </div>
        </form>
    )
}