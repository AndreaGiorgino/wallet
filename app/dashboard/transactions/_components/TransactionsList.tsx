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
                newParams.set("q", query.trim().toLowerCase())
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
        <div className="relative flex flex-col">
            <div className="w-full flex justify-center sticky top-0 left-0 py-4 bg-zinc-50 dark:bg-black">
                <div className="flex gap-4 items-end w-full max-w-md rounded-md" >
                    <TextInput name="search-input" placeholder="Search..." defaultValue={query} onChange={(e) => setQuery(e.target.value)} />
                    <Button label="+" onClick={() => router.push("/dashboard/transactions/details")} className="!px-4 flex-1" />
                </div>
            </div>
            {state.length !== 0 ? (
                state.map(({ date, items }) => {
                    const filtered = items.filter(transaction => transaction.description
                        .toLowerCase()
                        .includes(query));

                    if (filtered.length === 0)
                        return

                    return (
                        <section key={date} className="flex flex-col flex-1 mt-[2.5em]">
                            <span className="font-bold">{date}</span>
                            <ul className="list-none">
                                {filtered.map(transaction => {
                                    return (
                                        <li key={transaction.id} className="mt-3 bg-zinc-50 dark:bg-black rounded-lg">
                                            <Link href={`/dashboard/transactions/details/${transaction.id}`} className="outline-0 focus:[&>*]:bg-neutral-800 hover:[&>*]:bg-neutral-800">
                                                <div className="flex items-start p-2 rounded-lg bg-neutral-950">
                                                    <div className="flex flex-col flex-1 gap-1">
                                                        <span className="font-medium">{transaction.description}</span>
                                                        <span className="text-sm text-gray-500">{new Date(transaction.started_date).toLocaleTimeString().replace(/:00\s/, " ")}</span>
                                                    </div>
                                                    <MoneyBadge amount={transaction.amount} />
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                    )
                })
            ) : (
                <div className="inline-flex gap-3 items-center px-2 py-2 text-sm font-medium text-white rounded-lg text-medium bg-yellow-700/40">
                    <CgDanger size={20} />
                    No transactions found
                </div>
            )}
        </div>
    )
}