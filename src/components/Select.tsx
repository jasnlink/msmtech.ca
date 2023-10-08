import { Listbox, Transition } from "@headlessui/react"
import { Dispatch, Fragment } from "react"
import { ChevronUpDownIcon } from "@/src/components/Icon"
import Input from "./Input"
import Text from "./Text"

interface SelectOption {
    id: number;
    name: string;
    unavailable: boolean
}

interface SelectProps {
    data: Array<SelectOption>;
    name?: string;
    labelName: string;
    selected: SelectOption;
    onChange: Dispatch<SelectOption>;
    required: boolean;
}

export default function Select({data, name, labelName, selected, onChange, required}:SelectProps) {
    return (
        <div>
            <Input
                type="hidden"
                name={name}
                labelName={labelName}
                value={selected.name}
            />
            <Text tw={`ms-1 select-none cursor-default ${required ? `after:content-['*'] after:text-red-500` : ``}`}>{labelName}</Text>
            <div className="mt-1 relative">
                <Listbox value={selected} onChange={onChange}>
                    <Listbox.Button className="relative text-left cursor-default select-none active:border-white w-full text-lg py-2 px-3 rounded-lg bg-transparent border border-zinc-600/80 shadow-zinc-900/80 backdrop-blur-2xl">
                        <span>{selected.name}</span>
                        <span className="text-white absolute top-1/2 -translate-y-1/2 right-2 h-6 w-6">{ChevronUpDownIcon}</span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-in duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute overflow-hidden left-0 right-0 mt-2 rounded-lg bg-gradient-to-r border border-zinc-800/80 from-zinc-900/80 to-zinc-950/80 shadow-sm shadow-zinc-900/80 backdrop-blur-2xl">
                            {data.map((option) => (
                                <Listbox.Option
                                    key={option.id}
                                    value={option}
                                    disabled={option.unavailable}
                                    className={({active}) => `py-2 px-3 cursor-pointer select-none ${active ? `bg-zinc-700/90` : ``} ${option.unavailable ? `text-zinc-500` : ``}`}
                                >
                                    {option.name}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </Listbox>
            </div>
        </div>
    )
}