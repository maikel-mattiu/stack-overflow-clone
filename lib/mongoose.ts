import mongoose from "mongoose"

let isConnected: boolean = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) {
    return console.log('MONGODB_URL not found')
  }
  if (isConnected) {
    return console.log('=> using existing database connection')
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'devflow'
    })
    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.log('MongoDB connection failed', error)
  }
}     