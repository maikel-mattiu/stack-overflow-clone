"use client"
import React from "react"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"

interface Props {
	filters: {
		name: string
		value: string
	}[]
	otherClasses?: string
	containerClasses?: string
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
	return (
		<div className={`relative ${containerClasses}`}>
			<Select>
				<SelectTrigger
					className={`${otherClasses}body-regular background-light800_dark400 light-border text-dark500_light700 rounded-xl px-10 py-2.5 focus-visible:ring-0 focus-visible:ring-offset-0 `}
				>
					<div className="line-clamp-1 flex-1 text-left">
						<SelectValue placeholder="Select a Filter" />
					</div>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{filters.map((filter) => (
							<SelectItem
								key={filter.value}
								value={filter.value}
							>
								{filter.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}

export default Filter
