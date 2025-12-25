"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BackLink({children }) {

    const router= useRouter();

    return (
        <Link href="#" onClick={(e) => { e.preventDefault(); router.back(); }}>
            {children}
        </Link> 
    );
}