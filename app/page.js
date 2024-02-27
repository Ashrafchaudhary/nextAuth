"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-[82vh] flex items-center justify-center">
            <div className="border border-black w-1/2 min-h-[10vh] rounded-lg p-4">
                <div className="mb-3">
                    <p className="font-semibold text-2xl">Name: {user.name}</p>
                </div>
                <div className="mb-3">
                    <p className="font-semibold text-2xl">
                        Email: {user.email}
                    </p>
                </div>
                <div className="mb-3">
                    <Link href="/update-profile">Profile Update</Link>
                </div>
            </div>
        </div>
    );
}
