"use client"

import { FaWallet } from "react-icons/fa"
import { GrTransaction } from "react-icons/gr"
import { MdPerson } from "react-icons/md"
import NavButton from "./NavButton"

const profileLogo = <MdPerson size={24} />
const walletLogo = <FaWallet size={24} />
const transactionsLogo = <GrTransaction size={24} />

export default function Navbar() {
    return (
        <div className="sticky bottom-[1em] left-0 w-full flex justify-center">
            <ul className="flex gap-2 px-2 py-1 list-none rounded-full bg-neutral-950 w-fit">
                <li>
                    <NavButton label="Profile" callbackUrl="/dashboard/profile" children={profileLogo}></NavButton>
                </li>
                <li>
                    <NavButton label="Wallet" callbackUrl="/dashboard/wallet" children={walletLogo}></NavButton>
                </li>
                <li>
                    <NavButton label="Transactions" callbackUrl="/dashboard/transactions" children={transactionsLogo}></NavButton>
                </li>
            </ul>
        </div>
    )
}