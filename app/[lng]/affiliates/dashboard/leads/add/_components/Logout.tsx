'use client'

import { logoutSession } from "@/app/actions"
import { LogoutIcon } from "@/src/components/Icon"

export default function Logout() {

    return (
        <form action={logoutSession}>
            <button
                type={`submit`}
                className={`flex gap-1 items-center w-fit group px-2 py-1 transition-all rounded-lg hover:bg-zinc-700/90 active:bg-zinc-500/90`}
            >
                <LogoutIcon className={`fill-white h-6 w-auto transition-all group-hover:-translate-x-0.5`} />
            </button>
        </form>
    )
}