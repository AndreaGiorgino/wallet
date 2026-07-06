"use client"

import ErrorMessage from "@/app/_components/ErrorMessage";
import Loader from "@/app/_components/Spinner/Loader";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import { CgDanger } from "react-icons/cg";

export default function Balance() {
    const { data: session, status } = useSession();
    const [balance, setBalance] = useState<number | null>(null);
    const [error, setError] = useState<string>("");

    const fetchData = async () => {
        if (status === "loading")
            return;

        setError("");
        const res = await fetch("http://localhost:8080/wallet/balance", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        const data = await res.json();
        if (!res?.ok || !data) {
            setError("Cannot get balance data.")
            return;
        }

        setBalance(data.balance);
    }

    useEffect(() => {
        fetchData();
    }, [session]);

    return session ? (
        <div className="flex flex-col gap-6">
            <div className="flex gap-6 items-end">
                <ErrorMessage text={error} />
            </div>
            <div className="flex justify-center">
                <div className="flex gap-2 px-24 py-12 text-3xl rounded-full shadow-lg text-medium dark:shadow-white">
                    <span>{balance}</span>
                    <span>&euro;</span>
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    )
}