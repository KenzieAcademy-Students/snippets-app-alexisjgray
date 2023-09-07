import chalk from 'chalk'
import Post from './models/post'
import User from './models/user'

async function seedDatabase() {
  try {
    const users = await User.find({})
    const posts = await Post.find({})
    if (users.length === 0 && posts.length === 0) {
      console.log(
        chalk.yellow(
          'No users or posts in the database, creating sample data...'
        )
      )
      const user = new User({ username: 'alice', passwordHash: '$2a$12$fsBxfD2j7E9M7z0JLQPBvubh6F4j80IwJef6SDWpA7lCcJ.TFaHRu' })
      await user.save()
      console.log(chalk.green('Sample user successfuly created!'))
      const newPosts = [
        new Post({ text: 'My first post', author: user }),
      ]
      await Post.insertMany(newPosts)
      console.log(
        chalk.green(`${newPosts.length} Post(s) successfuly created!`)
      )
    } else {
      console.log(
        chalk.yellow('Database already initiated, skipping populating script')
      )
    }
  } catch (error) {
    console.log(chalk.red(error))
  }
}

module.exports = seedDatabase;