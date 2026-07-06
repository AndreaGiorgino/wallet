"use client"

import ErrorMessage from "@/app/_components/ErrorMessage";
import Loader from "@/app/_components/Spinner/Loader";
import TextInput from "@/app/_components/TextInput";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
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
                <div className="flex gap-3 items-end w-full max-w-md rounded-md">
                    <TextInput id="search-input" placeholder="Search..." />
                    <button aria-label="Add transaction" title="Add transaction" className="rounded-fulldark:invert inline-flex h-[2.5em] items-center justify-center rounded-xl bg-zinc-950 w-[3em] h-full font-medium text-current transition ring-3 border-none active:scale-95 hover:scale-110 focus:scale-110 cursor-pointer">
                        <BiPlus />
                    </button>
                </div>
            </div>
            <ErrorMessage text={error} />
            {!error && (
                <div className="mt-8">
                    {transactions?.length ? (
                        <ul className="list-none">
                            {/* TODO: render transactions list */}
                        </ul>
                    ) : (
                        <div className="flex justify-center">
                            <span className="text-lg font-medium">No transactions found.</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    ) : (
        <Loader />
    )
}