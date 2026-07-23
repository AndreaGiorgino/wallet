"use client"

import Button from "@/app/_components/Button"
import ErrorMessage from "@/app/_components/ErrorMessage"
import Loader from "@/app/_components/Loader/Loader"
import TextInput from "@/app/_components/TextInput"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { startTransition, useEffect, useState } from "react"
import { CgDanger } from "react-icons/cg"
import { Transaction } from "../details/[[...slug]]/_components/TransactionDetails"
import MoneyBadge from "./MoneyBadge"

const getTimeString = (dateString: string) => {
    const date = new Date(dateString)
    return `${("0" + date.getUTCHours()).slice(-2)}:${("0" + date.getUTCMinutes()).slice(-2)}`
}

export interface TransactionsGroup {
    ["date"]: string,
    ["items"]: Transaction[]
}

export default function TransactionsList({ transactions }: { transactions?: TransactionsGroup[] }) {
    if (!transactions)
        return <ErrorMessage text="Failed to load transactions." />

    const router = useRouter()
    const { status } = useSession()
    const pathname = usePathname()
    const params = useSearchParams()

    const [state, setState] = useState<TransactionsGroup[]>(transactions);
    const [query, setQuery] = useState<string>(params.get("q") ?? "")

    useEffect(() => {
        if (transactions)
            setState(transactions)
    }, [transactions])

    useEffect(() => {
        const timer = setTimeout(() => {
            const newParams = new URLSearchParams(params.toString())

            if (query.trim())
                newParams.set("q", query.trim())
            else
                newParams.delete("q")

            startTransition(() => {
                router.replace(`${pathname}?${newParams.toString()}`)
            })
        }, 300)

        return () => clearTimeout(timer)
    }, [query, pathname, router])

    if (status === "loading")
        return <Loader />

    return (
        <div className="flex flex-col">
            <div className="sticky mt-[-1em] left-0 w-full flex justify-center">
                <div className="flex gap-4 items-end w-full max-w-md rounded-md">
                    <TextInput name="search-input" placeholder="Search..." defaultValue={query} onChange={(e) => setQuery(e.target.value)} />
                    <Button label="+" onClick={() => router.push("/dashboard/transactions/details")} className="!px-4" />
                </div>
            </div>
            {state.length !== 0 ? (
                state.map(({ date, items }) => {
                    const filtered = items.filter(transaction => transaction.description.includes(query));

                    if (filtered.length === 0)
                        return

                    return (
                        <div key={date} className="flex flex-col flex-1 my-6 ">
                            <span className="font-bold">{date}</span>
                            <ul>
                                {filtered.map(transaction => {
                                    return (
                                        <li key={transaction.id} className="mt-3 bg-zinc-50 dark:bg-black">
                                            <Link href={`/dashboard/transactions/details/${transaction.id}`} className="outline-0 focus:[&>*]:bg-neutral-800 hover:[&>*]:bg-neutral-800">
                                                <div className="flex items-start p-2 rounded-lg bg-neutral-950">
                                                    <div className="flex flex-col flex-1">
                                                        <span className="font-medium">{transaction.description}</span>
                                                        <span className="text-sm text-gray-500">{getTimeString(transaction.started_date)}</span>
                                                    </div>
                                                    <MoneyBadge amount={transaction.amount} />
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })
            ) : (
                <div className="inline-flex gap-3 items-center px-2 py-2 mt-6 text-sm font-medium text-white rounded-lg text-medium bg-yellow-700/40">
                    <CgDanger size={20} />
                    No transactions found
                </div>
            )}
        </div >
    )
}