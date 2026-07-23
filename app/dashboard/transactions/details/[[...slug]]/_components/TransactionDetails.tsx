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
import MoneyBadge from "../../../_components/MoneyBadge"
import { refreshTransactions } from "../../../actions"
import { refreshTransactionDetails, transactionCreate, transactionDelete, transactionUpdate } from "../actions"

export interface Transaction {
    id?: number,
    description: string,
    amount: number,
    type: string,
    state: string,
    started_date: string,
    completed_date: string,
}

const defaultTransaction: Transaction = {
    id: undefined,
    description: "",
    amount: 1000,
    type: "",
    state: "",
    started_date: dateTimeNowLocale().toISOString().slice(0, 16),
    completed_date: dateTimeNowLocale().toISOString().slice(0, 16),
}

function dateTimeNowLocale() {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    return now
}

export default function TransactionDetails({ types, states, transaction }: {
    types?: string[],
    states?: string[],
    transaction: Transaction | undefined,
}) {
    if (!types || !states)
        return <ErrorMessage text="Failed to load transaction form." />

    const router = useRouter()
    const { status } = useSession()
    const [pending, startTransition] = useTransition()

    const isNew = transaction?.id === undefined
    if (!transaction && !isNew)
        return <ErrorMessage text="Failed to load transaction details." />

    const [formState, setFormState] = useState<Transaction>(isNew ? defaultTransaction : transaction)

    const [editing, setEditing] = useState<boolean>(isNew)
    const [error, setError] = useState<string>("")

    const handleCancel = () => {
        if (isNew) {
            startTransition(async () => {
                await refreshTransactions()
                await refreshTransactionDetails()
                router.push("/dashboard/transactions")
            })
        } else {
            setFormState(transaction)
            setEditing(false)
            setError("")
        }
    }

    const handleDelete = () => {
        startTransition(async () => {
            const res = await transactionDelete(formState.id!)

            if (res.success) {
                await refreshTransactions()
                router.push("/dashboard/transactions")
            }

            setError(res.error ?? "")
        })
    }

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const res = isNew
                ? await transactionCreate(formData)
                : await transactionUpdate(formState.id!, formData)

            if (res.success) {
                if (isNew) {
                    await refreshTransactions()
                    await refreshTransactionDetails()
                    router.replace(`/dashboard/transactions/details/${res.id}`)
                } else {
                    setEditing(false)
                    await refreshTransactions()
                    await refreshTransactionDetails(formState.id!)
                }
            } else setFormState({
                ...formState,
                description: formData.get("description")!.toString(),
                amount: parseFloat(formData.get("amount")!.toString()),
                type: formData.get("type")?.toString() ?? defaultTransaction.type,
                state: formData.get("state")?.toString() ?? defaultTransaction.state,
                started_date: formData.get("started_date")!.toString(),
                completed_date: formData.get("completed_date")?.toString() ?? defaultTransaction.completed_date,
            })

            setError(res.error ?? "")
        })
    }

    if (status === "loading")
        return <Loader />

    return (
        <div className="flex flex-col gap-8 px-2">
            <Paper error={error} title={isNew ? "New Transaction" : "Transaction Details"}>
                {editing ? (
                    <form id="data-form" action={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6 items-end mb-6 sm:grid-cols-6">
                            <div className="col-span-full">
                                <TextInput name="description" placeholder="Bill description..." label="Description" defaultValue={formState.description} required />
                            </div>
                            <div className="relative col-span-full sm:col-span-2">
                                <span className="absolute bottom-[0.6em] left-[.75em] font-bold">&euro;</span>
                                <TextInput name="amount" type="number" label="Amount" placeholder="Enter amount..." defaultValue={formState.amount.toString()} className="[&>input]:ps-[2.5em]" required />
                            </div>
                            <div className="sm:col-span-2">
                                <DropdownButton id="type" label="Transaction Type" items={types} defaultValue={formState.type} className="w-full" />
                            </div>
                            <div className="sm:col-span-2">
                                <DropdownButton id="state" label="State" items={states} defaultValue={formState.state} className="w-full" />
                            </div>
                            <div className="sm:col-span-3">
                                <TextInput name="started_date" type="datetime-local" label="Started Date" placeholder="Enter started date..." defaultValue={formState.started_date} required />
                            </div>
                            <div className="sm:col-span-3">
                                <TextInput name="completed_date" type="datetime-local" label="Completed Date" placeholder="Enter completed date..." defaultValue={formState.completed_date} required />
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-2 gap-6 items-end mb-6 sm:grid-cols-6">
                        <div className="flex flex-col col-span-full pb-3 h-full border-b-1">
                            <span className="mb-4 text-sm">Description</span>
                            <span className="text-sm text-heading">{formState.description}</span>
                        </div>
                        <div className="flex relative flex-col col-span-full pb-3 h-full border-b-1 sm:col-span-2">
                            <span className="mb-4 text-sm">Amount</span>
                            <MoneyBadge amount={formState.amount} />
                        </div>
                        <div className="flex flex-col pb-3 h-full border-b-1 sm:col-span-2">
                            <span className="mb-4 text-sm">Transaction Type</span>
                            <span className="text-sm text-heading">{formState.type}</span>
                        </div>
                        <div className="flex flex-col pb-3 h-full border-b-1 sm:col-span-2">
                            <span className="mb-4 text-sm">State</span>
                            <span className="text-sm text-heading">{formState.state}</span>
                        </div>
                        <div className="flex flex-col pb-3 h-full border-b-1 sm:col-span-3">
                            <span className="mb-4 text-sm">Started Date</span>
                            <span className="text-sm text-heading">{formState.started_date}</span>
                        </div>
                        <div className="flex flex-col pb-3 h-full border-b-1 sm:col-span-3">
                            <span className="mb-4 text-sm">Completed Date</span>
                            <span className="text-sm text-heading">{formState.completed_date}</span>
                        </div>
                    </div>
                )}
            </Paper>
            {editing ? (
                <div className="flex flex-col gap-4 justify-end items-center text-sm sm:flex-row">
                    <Button label="Cancel" onClick={handleCancel} className="w-full invert sm:w-auto" disabled={pending} />
                    <Button label="Save" type="submit" form="data-form" disabled={pending} />
                </div>
            ) : (
                <div className="flex flex-col gap-4 justify-end items-center text-sm sm:flex-row">
                    <Button label="Delete" onClick={handleDelete} className="w-full ring-red-800 sm:w-auto !text-white !dark:bg-red-500/25 !bg-red-900/40" disabled={pending} />
                    <Button label="Edit" onClick={() => setEditing(true)} disabled={pending} />
                </div>
            )}
        </div>
    )
}