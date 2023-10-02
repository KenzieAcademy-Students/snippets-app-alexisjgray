import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { requireAuth } from "../middleware";

const router = express.Router();

router
  .route("/:username")
  .get(async (req, res) => {
    const { username } = req.params;
    const populateQuery = {
      path: "posts",
      populate: { path: "author", select: ["username", "profile_image"] },
    };
    const user = await User.findOne({ username }).populate(populateQuery);
    if (!user) return res.sendStatus(404);
    res.json(user.toJSON());
  })
  .put(requireAuth, async (req, res) => {
    const { password, current_password } = req.body;
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(current_password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }
    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({
        error: "Password Must Be Between 8 and 20 Characters",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 12);

    try {
      const userUpdate = await User.findOneAndUpdate(
        {
          username,
        },
        {
          passwordHash: hashedpassword,
        },
        {
          new: true,
        }
      );

      res.json(userUpdate.toJSON());
    } catch (error) {
      res.status(404).end();
    }
  });

router.route("/:username/avatar").put(requireAuth, async (req, res) => {
  const { username } = req.params;
  const { profile_image } = req.body;

  if (!req.user.username.toLowerCase() === username.toLowerCase()) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  user.profile_image = profile_image;
  await user.save();
  res.json(user.toJSON());
});

module.exports = router;
