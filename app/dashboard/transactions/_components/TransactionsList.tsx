"use client"

import Button from "@/app/_components/Button";
import ErrorMessage from "@/app/_components/ErrorMessage";
import Loader from "@/app/_components/Loader/Loader";
import Paper from "@/app/_components/Paper";
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
    const [transactions, setTransactions] = useState<{ date: string, items: Transaction[] }[] | undefined>();
    const [error, setError] = useState<string>("");

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

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

            const groups = Array.from(
                Map.groupBy(data.transactions, ({ started_date }: Transaction) => {
                    const date = new Date(started_date);
                    return `${date.getDate()}, ${monthNames[date.getMonth()]}`;
                })).map(([key, value]) => { return { date: key, items: value } });

            setTransactions(groups);
        } catch (ex) {
            setError("Something went wrong.");
        }
    }

    useEffect(() => {
        fetchData();
    }, [session]);

    const getTimeString = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getHours()}:${date.getMinutes()}`;
    };

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
                transactions ? (
                    transactions.length !== 0 ? (
                        transactions.map(({ date, items }) => {
                            return (
                                <div key={date} className="flex flex-col flex-1 my-6">
                                    <span className="font-bold">{date}</span>
                                    <ul>
                                        {items.map(transaction => {
                                            return (
                                                <li key={transaction.id} className="mt-3 bg-zinc-50 dark:bg-black">
                                                    <a href={`/dashboard/transactions/details/${transaction.id}`} className="outline-0 focus:[&>*]:bg-neutral-800 hover:[&>*]:bg-neutral-800">
                                                        <div className="flex items-start p-2 rounded-lg bg-neutral-950">
                                                            <div className="flex flex-col flex-1">
                                                                <span className="font-medium">{transaction.description}</span>
                                                                <span className="text-sm text-gray-500">{getTimeString(transaction.started_date)}</span>
                                                            </div>
                                                            <div className={`flex gap-1 text-sm rounded-lg px-3 py-1 ${transaction.amount > 0 ? "bg-green-900/40" : "bg-red-900/40"}`}>
                                                                <span>&euro;</span>
                                                                <span>{Math.abs(transaction.amount)}</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })
                    ) : (
                        <div className="inline-flex flex-1 gap-3 items-center px-2 py-2 text-sm font-medium text-white rounded-lg bg-red-900/40 text-medium bg-yellow-700/40">
                            <CgDanger size={20} />
                            No transactions found
                        </div>
                    )
                ) : (
                    <Loader />
                )
            )}
        </div >
    ) : (
        <Loader />
    )
}