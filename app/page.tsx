import Image from "next/image";
import AccessForm from "./_components/AccessForm";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center font-sans bg-zinc-50 dark:bg-black">
            <main className="flex flex-col flex-1 items-center px-2 py-16 w-full max-w-3xl">
                <div className="flex justify-center items-center">
                    <Image alt="wallet" src={"/wallet.png"} loading="eager" width={200} height={200} className="me-[-2em]" />
                    <div className="flex flex-col gap-5">
                        <h1 className="text-5xl font-bold">WALLET</h1>
                        <h6>Track your funds and transactions</h6>
                    </div>
                </div>
                <AccessForm />
            </main>
        </div>
    );
}
