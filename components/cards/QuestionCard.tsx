import Link from "next/link"
import React from "react"
import RenderTag from "../shared/RenderTag"
import Metric from "../shared/Metric"
import { formatLargeNumber, getTimeStamp } from "@/lib/utils"

interface Props {
	title: string
	tags: {
		_id: number
		name: string
	}[]
	author: {
		_id: number
		name: string
		avatar: string
	}
	upvotes: number
	views: number
	answers: Array<object>
	createdAt: Date
}

const QuestionCard = ({
	title,
	tags,
	author,
	upvotes,
	views,
	answers,
	createdAt
}: Props) => {
	console.log(createdAt)
	return (
		<div className="background-light800_dark400 card-wrapper rounded-[10px] p-9 sm:px-11">
			<div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
				<div>
					<span className="subtle-regular text-dark400_light700 line-clamp-1 flex">
						{getTimeStamp(createdAt)}
					</span>
					<Link href={`/questions/${1}`}>
						<h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
							{title}
						</h3>
					</Link>
				</div>
				{/* if signed in show edit and delete actions */}
			</div>
			<div className="mt-3.5 flex flex-wrap gap-2">
				{tags.map((tag) => (
					<RenderTag
						key={tag._id}
						id={tag._id}
						name={tag.name}
					/>
				))}
			</div>
			<div className="flex-between mt-6 w-full flex-wrap gap-3">
				<Metric
					imgSrc="/assets/icons/avatar.svg"
					alt="User"
					value={author.name}
					title=" - asked 1 hour ago"
					href={`/profile/${author._id}`}
					isAuthor
					textStyles="body-medium text-dark400_light700 cursor-pointer"
				/>
				<Metric
					imgSrc="/assets/icons/like.svg"
					alt="Upvotes"
					value={formatLargeNumber(upvotes)}
					title="Votes"
					textStyles="small-medium text-dark400_light800 cursor-pointer"
				/>
				<Metric
					imgSrc="/assets/icons/message.svg"
					alt="Message"
					value={formatLargeNumber(answers.length)}
					title="Answers"
					textStyles="small-medium text-dark400_light800 cursor-pointer"
				/>
				<Metric
					imgSrc="/assets/icons/eye.svg"
					alt="Views"
					value={formatLargeNumber(views)}
					title="Views"
					textStyles="small-medium text-dark400_light800 cursor-pointer"
				/>
			</div>
		</div>
	)
}

export default QuestionCard
