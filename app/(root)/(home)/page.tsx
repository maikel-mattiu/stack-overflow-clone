import QuestionCard from "@/components/cards/QuestionCard"
import HomeFilters from "@/components/home/HomeFilters"
import Filter from "@/components/shared/Filter"
import NoResult from "@/components/shared/NoResult"
import LocalSearchBar from "@/components/shared/search/LocalSearchBar"
import { Button } from "@/components/ui/button"
import { HomePageFilters } from "@/constants/filters"
import Link from "next/link"

const questions = [
	{
		_id: 1,
		title: "How to center a div?",
		tags: [
			{ _id: 1, name: "javascript" },
			{ _id: 2, name: "react" }
		],
		author: { _id: 1, name: "maikel", avatar: "/assets/images/avatar.png" },
		upvotes: 10,
		views: 100,
		answers: [],
		createdAt: new Date("2023-01-01T00:00:00.000Z"),
		updatedAt: new Date("2023-01-01T00:00:00.000Z")
	},
	{
		_id: 2,
		title: "What is the difference between let, const, and var in JavaScript?",
		tags: [{ _id: 1, name: "javascript" }],
		author: { _id: 2, name: "johnDoe", avatar: "/assets/images/avatar-1.png" },
		upvotes: 55,
		views: 520,
		answers: [
			{ _id: 1, author: { _id: 3, name: "janeDoe" } },
			{ _id: 2, author: { _id: 4, name: "peterPan" } }
		],
		createdAt: new Date("2023-02-15T12:00:00.000Z"),
		updatedAt: new Date("2023-02-18T09:15:00.000Z")
	},
	{
		_id: 3,
		title: "How to fetch data from an API in React using Axios?",
		tags: [
			{ _id: 1, name: "javascript" },
			{ _id: 2, name: "react" },
			{ _id: 3, name: "axios" }
		],
		author: { _id: 5, name: "aliceLee", avatar: "/assets/images/avatar-2.png" },
		upvotes: 25,
		views: 280,
		answers: [{ _id: 3, author: { _id: 1, name: "maikel" } }],
		createdAt: new Date("2023-03-10T18:30:00.000Z"),
		updatedAt: new Date("2023-03-12T14:20:00.000Z")
	}
]

export default function Home() {
	return (
		<>
			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="h1-bold text-dark100_light900">All Questions</h1>
				<Link
					href="/ask-questions"
					className="flex justify-end max-sm:w-full"
				>
					<Button className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900">
						Ask a Questions
					</Button>
				</Link>
			</div>

			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearchBar
					route="/"
					position={"left"}
					src="/assets/icons/search.svg"
					placeholder={"Search Questions"}
					otherClasses={""}
				/>
				<Filter
					filters={HomePageFilters}
					otherClasses={"min-h-[56px] sm:min-w-[17px]"}
					containerClasses={"hidden max-md:flex"}
				/>
			</div>

			<HomeFilters />

			<div className="mt-10 flex w-full flex-col gap-6">
				{questions.length > 0 ? (
					questions.map((question) => (
						<QuestionCard
							key={question._id}
							title={question.title}
							tags={question.tags}
							author={question.author}
							upvotes={question.upvotes}
							views={question.views}
							answers={question.answers}
							createdAt={question.createdAt}
						/>
					))
				) : (
					<NoResult
						title="No results found"
						description="Be the first to break the silence! Ask a question and kickstart the discussion. Our query could be the next big thing others learn from. Get involved!"
						link="/ask-question"
						linkText="Ask a Question"
					/>
				)}
			</div>
		</>
	)
}
