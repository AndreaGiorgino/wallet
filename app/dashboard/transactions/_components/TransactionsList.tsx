"use client"

import Button from "@/app/_components/Button";
import ErrorMessage from "@/app/_components/ErrorMessage";
import Loader from "@/app/_components/Loader/Loader";
import TextInput from "@/app/_components/TextInput";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";

interface Transaction {
    id: number,
    type: string,
    started_date: string,
    completed_date: string,
    description: string,
    amount: number,
    state: string,
};

export default function TransactionsList() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [transactions, setTransactions] = useState<Transaction[] | null>();
    const [error, setError] = useState<string>("");

    const fetchData = async () => {
        if (status === "loading")
            return;

        setError("");

        try {
            const res = await fetch("http://localhost:8080/wallet/transactions", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });

            const data = await res.json();
            if (!res?.ok || !data) {
                setError("Cannot get the transactions list.");
                return;
            }

            setTransactions(data.transactions);
        } catch {
            setError("Something went wrong.");
            return;
        }
    }

    useEffect(() => {
        fetchData();
    }, [session]);

    return session ? (
        <div className="flex flex-col">
            <div className="sticky mt-[-1em] left-0 w-full flex justify-center">
                <div className="flex gap-4 items-end w-full max-w-md rounded-md">
                    <TextInput id="search-input" placeholder="Search..." />
                    <Button label="+" onClick={() => router.push("/dashboard/transactions/details")} className="!px-4" />
                </div>
            </div>
            <ErrorMessage text={error} />
            {!error && (
                <div className="flex flex-1 justify-center">
                    {transactions?.length ? (
                        <ul className="list-none">
                            {/* TODO: render transactions list */}
                        </ul>
                    ) : (
                        <div className="flex gap-3 items-center px-2 py-2 mt-6 w-full max-w-md text-sm font-bold rounded-lg bg-yellow-700/40 text-medium">
                            <CgDanger size={20} />
                            No transactions found
                        </div>
                    )}
                </div>
            )}
        </div>
    ) : (
        <Loader />
    )
}