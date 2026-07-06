import Navbar from "./_components/Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col flex-1 justify-center items-center w-full h-full font-sans bg-zinc-50 dark:bg-black">
            <main className="flex flex-col flex-1 items-start px-2 py-8 w-full h-full bg-white sm:max-w-3xl dark:bg-black sm:items-center">
                {children}
            </main>
            <Navbar></Navbar>
        </div>
    );
}
