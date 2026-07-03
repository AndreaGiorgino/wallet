import Navbar from "./_components/Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col flex-1 justify-center items-center font-sans bg-zinc-50 dark:bg-black">
            <main className="flex flex-col flex-1 items-center px-16 py-32 w-full max-w-3xl bg-white dark:bg-black sm:items-start">
                {children}
            </main>
            <Navbar></Navbar>
        </div>
    );
}
