import Image from "next/image";
import AccessForm from "./_components/AccessForm";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center font-sans bg-zinc-50 dark:bg-black">
            <main className="flex flex-col flex-1 items-start px-2 py-16 w-full max-w-3xl md:items-center">
                <div className="flex justify-center w-full">
                    <div className="flex items-center justify-center w-[30em]">
                        <Image alt="wallet" src={"/wallet.png"} loading="eager" width={200} height={200} className="mx-[-2em]" />
                        <div className="flex flex-col gap-5">
                            <h1 className="text-5xl">WALLET</h1>
                            <h6>Track your funds and transactions</h6>
                        </div>
                    </div>
                </div>
                <AccessForm />
            </main>
        </div>
    );
}
