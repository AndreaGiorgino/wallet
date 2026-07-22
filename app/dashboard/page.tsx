"use client"

import Loader from "../_components/Loader/Loader"

export default function Dashboard() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center font-sans bg-zinc-50 dark:bg-black">
            <main className="flex flex-col flex-1 items-start px-2 py-16 w-full max-w-3xl sm:items-center">
                <div className="flex justify-center mt-16 w-full">
                    <div className="bg-neutral-950 rounded-lg p-4 sm:p-6 w-[15em] flex justify-center">
                        <Loader />
                    </div>
                </div>
            </main>
        </div>
    )
}