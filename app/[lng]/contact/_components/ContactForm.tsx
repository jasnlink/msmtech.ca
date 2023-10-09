'use client'
import Button from "@/src/components/Button"
import { SentIcon } from "@/src/components/Icon"
import Input from "@/src/components/Input"
import Select from "@/src/components/Select"
import Text from "@/src/components/Text"
import useCurrentDate from "@/src/hooks/useCurrentDate"
import { Transition } from "@headlessui/react"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { FormEvent, Fragment, useState } from "react"
import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT"

export interface BudgetOption {
    id: number;
    name: string;
    unavailable: boolean;
}

const budgetOptions:Array<BudgetOption> = [
    { id: 1, name: '$0 - $5,000', unavailable: false },
    { id: 2, name: '$5,000 - $10,000', unavailable: false },
    { id: 3, name: '$10,000 - $25,000', unavailable: false },
    { id: 4, name: '$25,000 - $50,000', unavailable: false },
    { id: 5, name: '$50,000+', unavailable: false },
]

interface ContactFormProps {
    lng: string;
    t?: Translation;
}
export default function ContactForm({ lng, t }: ContactFormProps) {
    
    const [submitLoading, setSubmitLoading] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [showFormSuccess, setShowFormSuccess] = useState(false)

    const [inputFirstName, setInputFirstName] = useState('')
    const [inputLastName, setInputLastName] = useState('')

    const [inputEmail, setInputEmail] = useState('')
    const [inputPhone, setInputPhone] = useState('')

    const [selectedBudget, setSelectedBudget] = useState<BudgetOption>(budgetOptions[0])

    const formattedTodayDate = useCurrentDate()
    const [selectedDate, setSelectedDate] = useState(formattedTodayDate)

    const [inputMessage, setInputMessage] = useState('')

    function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        dayjs.extend(utc)
        const selectedDayJs = dayjs(selectedDate)
        setSubmitLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/contact`, {
            method: `POST`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                firstName: inputFirstName,
                lastName: inputLastName,
                email: inputEmail,
                phone: inputPhone,
                budget: selectedBudget,
                date: dayjs().year(selectedDayJs.year()).month(selectedDayJs.month()).date(selectedDayJs.date()).utc().format(),
                message: inputMessage
            })
        })
        .then(async (response) => {
            if(!response.ok) {
                const text = await response.text()
                throw new Error(text)
            }
            setSubmitLoading(false)
            setFormSubmitted(true)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const text = {
        send: useT(t?.ContactForm.send),
        form_submitted: {
            title: useT(t?.ContactForm.form_submitted.title),
            subtitle: useT(t?.ContactForm.form_submitted.subtitle),
        },
        fields: {
            first_name: useT(t?.ContactForm.fields.first_name.label),
            last_name: useT(t?.ContactForm.fields.last_name.label),
            email: useT(t?.ContactForm.fields.email.label),
            phone: useT(t?.ContactForm.fields.phone.label),
            budget: useT(t?.ContactForm.fields.budget.label),
            launch: useT(t?.ContactForm.fields.launch.label),
            message: useT(t?.ContactForm.fields.message.label),
        }
    }

    return (
        <div>
            <Transition
                show={!formSubmitted}
                enter="transition-slide-down ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out transition-slide-down duration-500"
                leaveFrom="opacity-100 blur-none"
                leaveTo="opacity-0 blur-lg"
                afterLeave={() => {setShowFormSuccess(true)}}
            >
                <form
                    onSubmit={(event) => handleSubmit(event)}
                    action={`${process.env.NEXT_PUBLIC_API_ROUTE}/contact`}
                    method="POST"
                >
                    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Input
                            type="text"
                            name="firstName"
                            labelName={text.fields.first_name}
                            value={inputFirstName}
                            onChange={(event) => setInputFirstName(event.target.value)}
                            required
                        />
                        <Input
                            type="text"
                            name="lastName"
                            labelName={text.fields.last_name}
                            value={inputLastName}
                            onChange={(event) => setInputLastName(event.target.value)}
                            required
                        />
                        <Input
                            type="email"
                            name="email"
                            labelName={text.fields.email}
                            value={inputEmail}
                            onChange={(event) => setInputEmail(event.target.value)}
                            required
                        />
                        <Input
                            type="tel"
                            name="phone"
                            labelName={text.fields.phone}
                            value={inputPhone}
                            onChange={(event) => setInputPhone(event.target.value)}
                        />
                        <Select
                            data={budgetOptions}
                            name="budget"
                            labelName={text.fields.budget}
                            selected={selectedBudget}
                            onChange={setSelectedBudget}
                            required
                        />
                        <Input
                            type="date"
                            name="date"
                            labelName={text.fields.launch}
                            value={selectedDate}
                            onChange={(event) => {setSelectedDate(event.target.value)}}
                            min={formattedTodayDate}
                            required
                        />
                        <div className="md:col-span-2">
                            <Input
                                type="textarea"
                                name="message"
                                labelName={text.fields.message}
                                value={inputMessage}
                                onChange={(event) => setInputMessage(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        labelName={text.send}
                        loading={submitLoading}
                    >
                        {text.send}
                    </Button>
                </form>
            </Transition>
            <Transition
                show={showFormSuccess}
                as={Fragment}
                enter="transition-slide-down ease-in-out duration-500"
                enterFrom="opacity-0 blur-lg"
                enterTo="opacity-100 blur-none"
                leave="ease-in-out transition-slide-down duration-500"
                leaveFrom="opacity-100 blur-none"
                leaveTo="opacity-0 blur-lg"
            >
                <div className="border border-green-800 bg-gradient-to-r from-green-400/80 to-green-300/80 text-green-950 text-center rounded-lg pt-16 pb-20 px-12">
                    <div className="h-24 w-24 mx-auto">
                        {SentIcon}
                    </div>
                    <div className="mt-8">
                        <Text variant="h3">{text.form_submitted.title}</Text>
                    </div>
                    <div className="mt-4 xl:mt-2">
                        <Text variant="h3">{text.form_submitted.subtitle}</Text>
                    </div>
                </div>
            </Transition>
        </div>
    )
}