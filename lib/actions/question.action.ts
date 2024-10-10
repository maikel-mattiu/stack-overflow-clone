'use server'

import Question from "@/database/question.model"
import { connectToDB } from "../mongoose"
import Tag from "@/database/tag.model"
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types"
import User from "@/database/user.model"
import { revalidatePath } from "next/cache"


// getQuestion function
export async function getQuestion(params: GetQuestionsParams) {
  try {
    connectToDB()
    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 })
    return { questions }
  } catch (error) {
    console.log(error)
    throw error
  }
}

// createQuestion function

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDB()
    const { title, content, tags, author, path } = params
    const question = await Question.create({
      title,
      content,
      author,
    })

    const tagDocuments = []
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      )
      tagDocuments.push(existingTag._id)
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }
    })
    // revalidate path
    // await invalidateQuery(path)
    revalidatePath(path)
  } catch (error) {
    //  catch error
    console.log(error)
    throw error
  }

}