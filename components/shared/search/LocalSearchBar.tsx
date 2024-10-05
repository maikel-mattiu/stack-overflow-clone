"use client"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import React from "react"

interface Props {
	route: string
	position: string
	src: string
	placeholder: string
	otherClasses?: string
}

const LocalSearchBar = ({ route, position, src, placeholder, otherClasses }: Props) => {
	return (
		<div
			className={`background-light800_dark400 flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
		>
			{position === "left" && (
				<Image
					src={src}
					alt={placeholder}
					width={24}
					height={24}
					className="cursor-pointer"
				/>
			)}
			<Input
				type="text"
				placeholder={placeholder}
				value={""}
				onChange={() => {}}
				className="paragraph-regular no-focus placeholder background-light800_dark400 border-none shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
			/>
			{position === "right" && (
				<Image
					src={src}
					alt={placeholder}
					width={24}
					height={24}
					className="cursor-pointer"
				/>
			)}
		</div>
	)
}

export default LocalSearchBar
