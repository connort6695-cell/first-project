"use client";
/**
 * Navbar component
 * Purpose: Reusable top navigation using DaisyUI
 * Location: src/components/Navbar.tsx
 */
import React from "react";
import Link from "next/link";
import { UserMenu } from "@/components/UserMenu";

export function Navbar() {
	return (
		<div className="navbar bg-base-100 border-b">
			<div className="flex-1">
				<Link href="/" className="btn btn-ghost text-xl">My App</Link>
			</div>
			<div className="flex-none gap-2">
				<Link href="/" className="btn btn-ghost">Home</Link>
				<a href="https://vercel.com" className="btn btn-ghost" target="_blank" rel="noreferrer">Vercel</a>
				<UserMenu />
			</div>
		</div>
	);
}

export default Navbar;


