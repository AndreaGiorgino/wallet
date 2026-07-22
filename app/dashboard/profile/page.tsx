import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import ProfileActions from "./_components/ProfileActions";
import ProfileData from "./_components/ProfileData";
import ProfileDelete from "./_components/ProfileDelete";

export default async function Profile() {
    const session = await getServerSession(authOptions);

    const user = await (async () => {
        try {
            const res = await fetch("http://localhost:8080/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });

            const data = await res.json();
            if (!res?.ok || !data)
                throw {};

            return {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
            };
        } catch { }
    })()

    return (
        <div className="flex flex-col flex-1 gap-12 w-full">
            <ProfileData user={user} />
            <ProfileDelete />
            <div className="flex-1"></div>
            <ProfileActions />
        </div>
    );
}