"use client"

import Button from "@/app/_components/Button"
import DropdownButton from "@/app/_components/DropdownButton"
import ErrorMessage from "@/app/_components/ErrorMessage"
import Loader from "@/app/_components/Loader/Loader"
import Paper from "@/app/_components/Paper"
import TextInput from "@/app/_components/TextInput"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { refreshTransactionDetails, transactionCreate, transactionUpdate } from "../actions"
import { refreshTransactions } from "../../../actions"

export interface Transaction {
    id: number,
    description: string,
    amount: number,
    type: string,
    state: string,
    started_date: string,
    completed_date: string,
}


function dateTimeNowLocale() {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    return now
}

export default function TransactionDetails({ types, states, transaction }: {
    types?: string[],
    states?: string[],
    transaction?: Transaction
}) {
    if (!types || !states)
        return <ErrorMessage text="Failed to load transaction form." />
    if (!transaction)
        return <ErrorMessage text="Failed to load transaction details." />

    if (transaction.id === -1)
        transaction = {
            ...transaction,
            description: "",
            amount: 1000,
            type: "",
            state: "",
            started_date: dateTimeNowLocale().toISOString().slice(0, 16),
            completed_date: dateTimeNowLocale().toISOString().slice(0, 16),
        }

    const router = useRouter()
    const { data: session } = useSession()
    const [pending, startTransition] = useTransition()

    const [editing, setEditing] = useState<boolean>(transaction.id === -1)
    const [error, setError] = useState<string>("")

    const handleCancel = async () => {
        startTransition(async () => {
            if (transaction.id === -1) {
                await refreshTransactions()
                router.push("/dashboard/transactions")
            } else {
                await refreshTransactionDetails(transaction.id)
                setEditing(false)
            }
        })
    }

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const res = transaction.id === -1
                ? await transactionCreate(formData)
                : await transactionUpdate(transaction.id, formData)

            if (res?.success) {
                setEditing(false)
                await refreshTransactionDetails(transaction.id)
            }

            setError(res?.error || "")
        })
    }

    return session && !pending ? (
        <div className="flex flex-col gap-8 px-2">
            <Paper error={error} title={transaction.id === -1 ? "New Transaction" : "Transaction Details"}>
                {editing ? (
                    <form id="data-form" action={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6 items-end mb-6 sm:grid-cols-6">
                            <div className="col-span-full">
                                <TextInput name="description" placeholder="Bill description..." label="Description" defaultValue={transaction.description} required />
                            </div>
                            <div className="relative col-span-full sm:col-span-2">
                                <span className="absolute bottom-[0.6em] left-[.75em] font-bold">&euro</span>
                                <TextInput name="amount" type="number" label="Amount" placeholder="Enter amount..." defaultValue={transaction.amount.toString()} className="ps-[2.5em]" required />
                            </div>
                            <div className="sm:col-span-2">
                                <DropdownButton id="type" label="Transaction Type" items={types} defaultValue={transaction.type} className="w-full" />
                            </div>
                            <div className="sm:col-span-2">
                                <DropdownButton id="state" label="State" items={states} defaultValue={transaction.type} className="w-full" />
                            </div>
                            <div className="sm:col-span-3">
                                <TextInput name="started_date" type="datetime-local" label="Started Date" placeholder="Enter started date..." defaultValue={transaction.started_date} required />
                            </div>
                            <div className="sm:col-span-3">
                                <TextInput name="completed_date" type="datetime-local" label="Completed Date" placeholder="Enter completed date..." defaultValue={transaction.completed_date} required />
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-2 gap-6 items-end mb-6 sm:grid-cols-6">
                        <div className="flex flex-col col-span-full pb-3 h-full border-b-1">
                            <span className="mb-6 text-sm">Description</span>
                            <span className="text-sm text-heading">{transaction?.description}</span>
                        </div>
                        <div className="flex relative flex-col col-span-full pb-3 h-full border-b-1 sm:col-span-2">
                            <span className="mb-6 text-sm">Amount</span>
                            <span className="absolute bottom-[.6em] left-0 font-bold">&euro</span>
                            <span className="text-sm text-heading ps-[1.5em]">{transaction?.amount}</span>
                        </div>
                        <div className="flex flex-col pb-3 h-full border-b-1 sm:col-span-2">
                            <span className="mb-6 text-sm">Transaction Type</span>
                            <span className="text-sm text-heading">{transaction?.type}</span>
                        </div>
                        <div className="flex flex-col pb-3 h-full border-b-1 sm:col-span-2">
                            <span className="mb-6 text-sm">State</span>
                            <span className="text-sm text-heading">{transaction?.state}</span>
                        </div>
                        <div className="flex flex-col pb-3 h-full border-b-1 sm:col-span-3">
                            <span className="mb-6 text-sm">Started Date</span>
                            <span className="text-sm text-heading">{transaction?.started_date}</span>
                        </div>
                        <div className="flex flex-col pb-3 h-full border-b-1 sm:col-span-3">
                            <span className="mb-6 text-sm">Completed Date</span>
                            <span className="text-sm text-heading">{transaction?.completed_date}</span>
                        </div>
                    </div>
                )}
            </Paper>
            {editing ? (
                <div className="flex flex-col gap-4 justify-end items-center text-sm sm:flex-row">
                    <Button label="Cancel" onClick={handleCancel} className="w-full border-2 border-neutral-100 bg-neutral-100/25 dark:invert-0 sm:w-auto" />
                    <Button label="Save" type="submit" form="data-form" />
                </div>
            ) : (
                <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                    <Button label="Edit" onClick={() => setEditing(true)} />
                </div>
            )}
        </div>
    ) : <Loader />
}