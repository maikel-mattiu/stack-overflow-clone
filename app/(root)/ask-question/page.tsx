"use server"
import Question from "@/components/forms/Question"
import { getUserById } from "@/lib/actions/user.action"
import { mongo } from "mongoose"
// import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import React from "react"

async function Page() {
	// const { userId } = auth()
	const userId = "someClerkId123"
	if (!userId) redirect("/sign-in")

	const mongoUser = await getUserById({ userId })
	const mongoUserId = JSON.parse(JSON.stringify(mongoUser._id))

	// console.log(mongoUser)
	// console.log(JSON.stringify(mongoUser._id))
	// console.log(typeof mongoUser._id)
	if (!mongoUser) redirect("/sign-in")
	console.log(JSON.parse(JSON.stringify(mongoUser._id)))

	return (
		<div>
			<h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
			<div className="mt-9">
				<Question mongoUserId={mongoUserId} />
			</div>
		</div>
	)
}

export default Page
