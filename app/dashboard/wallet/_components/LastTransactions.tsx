"use client"

import ErrorMessage from "@/app/_components/ErrorMessage";
import Paper from "@/app/_components/Paper";
import { useSession } from "next-auth/react";
import Link from "next/link";
import MoneyBadge from "../../transactions/_components/MoneyBadge";
import { Transaction } from "../../transactions/details/[[...slug]]/_components/TransactionDetails";

export default function LastTransactions({ transactions = [] }: { transactions?: Transaction[] }) {
    if (!transactions)
        return <ErrorMessage text="Failed to load transactions." />

    const { status } = useSession()

    if (status === "loading")
        return

    return (
        <div className="flex flex-col gap-8 px-2">
            <Paper title="Recent transactions" contentClassName="bg-zinc-50 dark:bg-black !px-0 !py-0">
                <ul className="list-none">
                    {transactions.map(transaction => {
                        return (
                            <li key={transaction.id} className="mt-1 bg-zinc-50 dark:bg-black rounded-lg">
                                <Link href={`/dashboard/transactions/details/${transaction.id}`} title={transaction.description} aria-label={transaction.description} className="outline-0 focus:[&>*]:bg-neutral-800 hover:[&>*]:bg-neutral-800">
                                    <div className="flex items-start p-2 rounded-lg bg-neutral-950">
                                        <div className="flex flex-col flex-1 gap-1">
                                            <span className="font-medium">{transaction.description}</span>
                                            <span className="text-sm text-gray-500">{new Date(transaction.started_date).toLocaleString()}</span>
                                        </div>
                                        <MoneyBadge cents_amount={transaction.cents_amount} />
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className="relative flex justify-end items-center mt-3">
                    <Link href={"/dashboard/transactions"} className="underline">View all</Link>
                </div>
            </Paper>
        </div>
    )
}