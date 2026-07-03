"use client"

import { useRouter } from "next/navigation";
import Spinner from "../_components/Spinner/Spinner";
import { useEffect } from "react";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        router.push("/dashboard/wallet")
    })

    return (
        <div className="flex justify-center mt-16 w-full">
            <div className="bg-neutral-900 rounded-lg p-6 w-[15em] flex justify-center">
                <Spinner></Spinner>
            </div>
        </div>
    );
}