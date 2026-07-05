"use client"

import Button from "@/app/_components/Button";
import Spinner from "@/app/_components/Spinner/Spinner";
import TextInput from "@/app/_components/TextInput";
import { useSession } from "next-auth/react";
import { SubmitEvent, useEffect, useState } from "react"
import { CgDanger } from "react-icons/cg";

interface User {
    first_name: string,
    last_name: string,
    email: string,
};

export default function ProfileData() {
    const { data: session } = useSession();
    const [editing, setEditing] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setError(null);
        const res = await fetch("http://localhost:8080/user/get", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });

        const data = await res.json();
        if (!res?.ok || !data) {
            setError("Cannot get user data.")
            return;
        }

        setUser({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
        });
    }

    const handleSave = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const form = e.target;
        const data = new FormData(form);

        const res = await fetch("http://localhost:8080/user/update", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: data.get("first_name"),
                last_name: data.get("last_name"),
                email: data.get("email"),
            }),
        });

        if (!res?.ok) {
            setError("Something went wrong.")
            return;
        }

        fetchData();
        setEditing(false);
    }

    useEffect(() => {
        fetchData();
    }, [session]);

    return user ? (
        <div className="flex flex-col gap-6">
            <div className="flex gap-6 items-end">
                <h3 className="text-2xl">Your data</h3>
                {error && (
                    <div className="inline-flex flex-1 gap-3 items-center px-2 py-2 mt-6 rounded-lg bg-red-900/40">
                        <CgDanger size={20} />
                        {error}
                    </div>
                )}
            </div>
            <hr />
            {editing ? (
                <div className="p-6 w-full rounded-lg bg-neutral-900">
                    <form id="data-form" onSubmit={handleSave}>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <TextInput id="first_name" placeholder="Jhon" label="First name" defaultValue={user?.first_name} required></TextInput>
                            </div>
                            <div>
                                <TextInput id="last_name" placeholder="Doe" label="Last name" defaultValue={user?.last_name} required></TextInput>
                            </div>

                            <div className="col-span-2">
                                <TextInput id="email" type="email" placeholder="john.doe@company.com" label="Email address" defaultValue={user?.email} required></TextInput>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="p-6 w-full rounded-lg bg-neutral-900">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="first_name" className="block mb-2.5 text-sm font-medium text-heading">First name</label>
                            <div className="text-lg text-medium">
                                {user?.first_name}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block mb-2.5 text-sm font-medium text-heading">Last name</label>
                            <div className="text-lg text-medium">
                                {user?.last_name}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email address</label>
                            <div className="text-lg text-medium">
                                {user?.email}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {editing ? (
                <div className="flex gap-3 justify-end items-center w-full">
                    <Button label="Undo" onClick={() => setEditing(false)} className="border-2 border-neutral-100 bg-neutral-100/25 dark:invert-0" />
                    <Button label="Save" type="submit" form="data-form" />
                </div>
            ) : (
                <div className="flex justify-end items-center w-full">
                    <Button label="Edit" onClick={() => setEditing(true)} />
                </div>
            )}
        </div>
    ) : (
        <div className="flex justify-center mt-16 w-full">
            <div className="bg-neutral-900 rounded-lg p-6 w-[15em] flex justify-center">
                <Spinner></Spinner>
            </div>
        </div>
    )
}