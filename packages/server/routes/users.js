import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models'

const router = express.Router()

router
  .route('/:id')
  .get(async (request, response) => {
    const populateQuery = [
      {
        path: 'posts',
        populate: { path: 'author', select: ['username', 'profile_image'] },
      },
    ]

    const user = await User.findOne({ username: request.params.id })
      .populate(populateQuery)
      .exec()
    if (user) {
      response.json(user.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .put(async (request, response) => {
    const { username } = request.body
    const { id } = request.params

    // const hashedpassword = await password ? bcrypt.hash(password, 12) : ""

    try {
    //   if (username && password) {
    //     const userUpdate = await User.findByIdAndUpdate(
    //       {
    //         _id: id,
    //       },
    //       {
    //         username: username,
    //         passwordHash: hashedpassword,
    //       },
    //       {
    //         new: true,
    //       }
    //   )
    //   response.redirect(301, "/login")
    //   response.json(userUpdate.toJSON())
    // }

      if (username) {
        const userUpdate = await User.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            username: username,
          },
          {
            new: true,
          }
          )
          response.json(userUpdate.toJSON())
          // response.redirect(301, "http://localhost:3000/login/update_profile")
        }
    //   if (!username && password) {
    //     const userUpdate = await User.findByIdAndUpdate(
    //       {
    //         _id: id,
    //       },
    //       {
    //         passwordHash: hashedpassword,
    //       },
    //       {
    //         new: true,
    //       }
    //   )
    //   response.redirect(301, "/login")
    //   response.json(userUpdate.toJSON())
    // }
    // if (!username && !password) {
    //   response.status(400).send("Invalid inputs for username and/or password");
    // }
    } catch (error) {
      response.status(404).end()
    }
  })

module.exports = router
