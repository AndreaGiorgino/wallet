"use client"

import Button from "@/app/_components/Button";
import TextInput from "@/app/_components/TextInput";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"

interface User {
    first_name: string,
    last_name: string,
    email: string,
};

export default function ProfileData({
    className,
}: Readonly<{
    className?: string
}>) {
    const { data: session } = useSession();
    const [editing, setEditing] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>();

    const fetchData = async () => {
        setError("");
        if (!session || !session.accessToken)
            return;

        const res = await fetch("http://localhost:8080/user/get", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
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

    const handleSave = async () => {
        // TODO: function "handleSave" not implemented yet.
    }

    useEffect(() => {
        fetchData();
    }, [session]);

    return (
        <div className={`flex flex-col gap-6 ${className}`}>
            <div className="flex items-end">
                <h3 className="flex-1 text-2xl">Your data</h3>
                {error && (
                    <div className="px-6 py-3 mt-6 rounded-lg bg-red-900/40">
                        {error}
                    </div>
                )}
            </div>
            <hr />
            {editing ? (
                <div className="p-6 w-full rounded-lg bg-neutral-900">
                    <form>
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
                    <Button label="Save" onClick={handleSave} />
                </div>
            ) : (
                <div className="flex justify-end items-center w-full">
                    <Button label="Edit" onClick={() => setEditing(true)} />
                </div>
            )}
        </div>
    )
}