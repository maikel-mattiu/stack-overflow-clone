"use client"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import React from "react"

const GlobalSearch = () => {
	return (
		<div className="relative w-full max-w-[600px] max-lg:hidden">
			<div className="background-light800_dark400 relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
				<Image
					src="/assets/icons/search.svg"
					alt="search"
					width={24}
					height={24}
					className="cursor-pointer px-1"
				/>
				<Input
					type="text"
					placeholder="Search"
					value={""}
					onChange={() => {}}
					className="paragraph-regular no-focus placeholder background-light800_dark400 text-dark500_light500 !border-none shadow-none !outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
				/>
			</div>
		</div>
	)
}

export default GlobalSearch
