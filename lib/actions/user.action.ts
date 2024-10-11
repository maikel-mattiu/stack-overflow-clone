"use server"
import User from "@/database/user.model"
import { connectToDB } from "../mongoose"
import { DeleteUserParams, UpdateUserParams } from "./shared.types"
import { revalidatePath } from "next/cache"
import Question from "@/database/question.model"

export async function getUserById(params: any) {
  try {
    connectToDB()
    const { userId } = params
    const user = await User.findOne({ clerkId: userId })
    return user
  } catch (error) {
    console.log(error)
    throw error
  }

}

export async function getAllUsers() {
  try {
    connectToDB()
    const users = await User.find({})
    return users
  } catch (error) {
    console.log(error)
    throw error
  }

}

export async function createUser(params: any) {
  try {
    connectToDB()
    const { clerkId, name, username, email, picture } = params
    const user = await User.create({
      clerkId,
      name,
      username,
      email,
      picture
    })
    return user
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDB()
    const { clerkId, updateData, path } = params
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true })
    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDB()
    const { clerkId } = params
    const user = await User.findOneAndDelete({ clerkId })
    if (!user) {
      throw new Error('User not found')
    }
    const userQuestionIds = await Question.find({ author: user._id }).distinct('_id')

    await Question.deleteMany({ author: user._id })

    const deleteUser = await User.findByIdAndDelete(user._id)
    return deleteUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function toggleSaveQuestion(params: any) {
  try {
    connectToDB()
    const { userId, questionId, path } = params
    const user = await User.findOne({ clerkId: userId })
    if (user) {
      if (user.savedQuestions.includes(questionId)) {
        await User.findOneAndUpdate({ clerkId: userId }, { $pull: { savedQuestions: questionId } })
      } else {
        await User.findOneAndUpdate({ clerkId: userId }, { $push: { savedQuestions: questionId } })
      }
      revalidatePath(path)
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

// export async function getSavedQuestions(params: any) {
//   try {
//     connectToDB()
//     const { clerkId } = params
//     const user = await User.findOne({ clerkId: clerkId })
//     if (user) {
//       const savedQuestions = await Question.find({ _id: { $in: user.savedQuestions } })
//         .populate({ path: "tags", model: Tag })
//         .populate({ path: "author", model: User })
//         .sort({ createdAt: -1 })
//       return savedQuestions
//     }
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }
