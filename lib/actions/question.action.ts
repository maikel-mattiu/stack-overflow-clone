'use server'

import { connectToDB } from "../mongoose"

export async function createQuestion(params: any) {
  // 
  try {
    connectToDB()
  } catch (error) {
    //  catch error
  }

}