"use client"

import Button from "@/app/_components/Button";
import DropdownButton from "@/app/_components/DropdownButton";
import ErrorMessage from "@/app/_components/ErrorMessage";
import Loader from "@/app/_components/Spinner/Loader";
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
        // TODO: function "fetchData" not implemented yet

        // TODO: fetch data
        setTransactionTypes([
            "Card Payment",
            "Exchange",
            "Topup",
            "Transfer",
            "Other",
        ])

        // TODO: fetch data
        setTransactionStates([
            "Completed",
            "Pending",
        ])
    };

    const handleSave = async () => {
        // TODO: function "handleSave" not implemented yet
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
        <div className="flex flex-col gap-6">
            <div className="flex gap-6 items-end">
                <h3 className="text-2xl">
                    {
                        transactionId
                            ? "Transaction details"
                            : "New transaction"
                    }
                </h3>
                <ErrorMessage text={error} />
            </div>
            <hr />
            {editing ? (
                <div className="p-4 w-full rounded-lg sm:p-6 bg-neutral-950">
                    <form id="data-form" onSubmit={handleSave}>
                        <div className="grid grid-cols-1 gap-6 items-end mb-6 sm:grid-cols-6">
                            <div className="col-span-full">
                                <TextInput id="description" placeholder="Bill description..." label="Description" defaultValue={""} required />
                            </div>
                            <div className="relative sm:col-span-2">
                                <span className="absolute bottom-[0.6em] left-[.75em] font-bold">&euro;</span>
                                <TextInput id="amount" type="number" label="Amount" placeholder="Enter amount..." defaultValue="1000" className="ps-[2.5em]" required />
                            </div>
                            <div className="sm:col-span-2">
                                <DropdownButton label="Type" items={transactionTypes} className="w-full" />
                            </div>
                            <div className="sm:col-span-2">
                                <DropdownButton label="State" items={transactionStates} className="w-full" />
                            </div>
                            <div className="col-span-3">
                                <TextInput id="started_date" type="datetime-local" label="Started date" placeholder="Enter started date..." defaultValue={datetimeNow().toISOString().slice(0, 16)} required />
                            </div>
                            <div className="col-span-3">
                                <TextInput id="completed_date" type="datetime-local" label="Completed date" placeholder="Enter completed date..." defaultValue={datetimeNow().toISOString().slice(0, 16)} required />
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="p-6 w-full rounded-lg bg-neutral-950">
                    <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-3">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-heading">
                                <span>Description</span>
                                <div className="mt-2text-md text-medium">

                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            )}
            {editing ? (
                <div className="flex flex-col gap-3 justify-end items-center text-sm sm:flex-row">
                    <Button label="Cancel" onClick={() => router.push("/dashboard/transactions")} className="w-full border-2 border-neutral-100 bg-neutral-100/25 dark:invert-0 sm:w-auto" />
                    <Button label="Save" type="submit" form="data-form" className="w-full sm:w-auto" />
                </div>
            ) : (
                <div className="flex flex-col justify-end items-center text-sm sm:flex-row">
                    <Button label="Edit" onClick={() => setEditing(true)} className="w-full sm:w-auto" />
                </div>
            )}
        </div>
    ) : (
        <Loader />
    )
}