import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  profile_image: { type: String, default: '/thor-3831290.svg' },
  posts: [
    {
      type: ObjectId,
      ref: 'Post',
    },
  ],
  postLikes: [
    {
      type: ObjectId,
      ref: 'Post',
    },
  ],
})

const User = mongoose.model('User', userSchema)

export default User
