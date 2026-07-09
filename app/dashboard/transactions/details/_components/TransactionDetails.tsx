"use client"

import Button from "@/app/_components/Button";
import DropdownButton from "@/app/_components/DropdownButton";
import ErrorMessage from "@/app/_components/ErrorMessage";
import Loader from "@/app/_components/Loader/Loader";
import Paper from "@/app/_components/Paper";
import TextInput from "@/app/_components/TextInput";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TransactionData {
    id: number | null,
    type: string,
    started_date: string,
    completed_date: string,
    description: string,
    amount: number,
    state: string,
};

export default function TransactionDetails() {
    const params = useSearchParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [transactionId, setTransactionId] = useState<number | null>();
    const [transaction, setTransaction] = useState<TransactionData | null>();
    const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
    const [transactionStates, setTransactionStates] = useState<string[]>([]);
    const [editing, setEditing] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const datetimeNow = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now;
    };

    const fetchData = async () => {
        if (status === "loading")
            return;

        setError("");
        try {
            const res = await fetch("http://localhost:8080/config/transaction_types", {
                method: "GET",
            });

            const data = await res.json()
            if (!res.ok || !data)
                setError("Cannot get transaction types data.");
            setTransactionTypes(data["transaction_types"])
        } catch {
            setError("Cannot get transaction types data.");
        }

        try {
            const res = await fetch("http://localhost:8080/config/transaction_states", {
                method: "GET",
            });

            const data = await res.json()
            if (!res.ok || !data)
                setError("Cannot get transaction states data.");
            setTransactionStates(data["transaction_states"])
        } catch {
            setError("Cannot get transaction states data.");
        }
    };

    const handleSubmit = async () => {
        // TODO: function "handleSubmit" not implemented yet
    };

    useEffect(() => {
        setTransactionId(params.get("transactionId") as number | null);
        if (!transactionId)
            setEditing(true);
    }, [params])

    useEffect(() => {
        fetchData();
    }, [session]);

    return session ? (
        <div className="flex flex-col gap-8 px-2">
            <Paper error={error} title={transactionId ? "Transaction Details" : "New Transaction"}>
                {editing ? (
                    <form id="data-form" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6 items-end mb-6 sm:grid-cols-6">
                            <div className="col-span-full">
                                <TextInput id="description" placeholder="Bill description..." label="Description" defaultValue={""} required />
                            </div>
                            <div className="relative col-span-full sm:col-span-2">
                                <span className="absolute bottom-[0.6em] left-[.75em] font-bold">&euro;</span>
                                <TextInput id="amount" type="number" label="Amount" placeholder="Enter amount..." defaultValue="1000" className="ps-[2.5em]" required />
                            </div>
                            <div className="sm:col-span-2">
                                <DropdownButton label="Transaction Type" items={transactionTypes} className="w-full" />
                            </div>
                            <div className="sm:col-span-2">
                                <DropdownButton label="State" items={transactionStates} className="w-full" />
                            </div>
                            <div className="sm:col-span-3">
                                <TextInput id="started_date" type="datetime-local" label="Started Date" placeholder="Enter started date..." defaultValue={datetimeNow().toISOString().slice(0, 16)} required />
                            </div>
                            <div className="sm:col-span-3">
                                <TextInput id="completed_date" type="datetime-local" label="Completed Date" placeholder="Enter completed date..." defaultValue={datetimeNow().toISOString().slice(0, 16)} required />
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
                            <span className="absolute bottom-[.6em] left-0 font-bold">&euro;</span>
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
                    <Button label="Cancel" onClick={() => router.push("/dashboard/transactions")} className="w-full border-2 border-neutral-100 bg-neutral-100/25 dark:invert-0 sm:w-auto" />
                    <Button label="Save" type="submit" form="data-form" />
                </div>
            ) : (
                <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                    <Button label="Edit" onClick={() => setEditing(true)} />
                </div>
            )}
        </div>
    ) : (
        <Loader />
    )
}