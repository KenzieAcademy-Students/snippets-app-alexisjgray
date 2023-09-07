# kinzie-mern-social-media-app

## Project uses yarn workspaces to organize monorepo

Add or Remove packages to client or server from the root dir

```
yarn workspace client add react-router-dom
yarn workspace server add mongoose

```

## Run Client/Server for Development

```
yarn start
```

## Frontend

The client was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Backend

The server uses MongoDB, make sure you have it installed in your system.

Install MongoDB and start your server: [MongoDB instructions](https://docs.mongodb.com/manual/administration/install-community/)

---

## Student Challenges

### Complete _update user_ feature (FE)

1. Update code in **UserDetailPage.js** to allow user to change password. Call edit user endpoint on server 'users/:id'. Refer to server/routes/users.js for requirements.
2. Move update form to separate page by creating a new **EditUserPage**. Add Route in App.js and update links.
3. **\*BONUS** (FE) Add Selector to change User profile_image. Use image options from public/ directory. (BE) Update 'users/:id' endpoint to accept new profile_icon string and update User.

### Add Delete post feature (FE)

1. Complete _handleDeletePost_ function in client/src/components/Post to call server endpoint **/posts/:id** with delete request.
2. **\*BONUS** Add a confirmation Modal using [Bootstrap Modal component](https://react-bootstrap.github.io/components/modal/). Open Modal onClick of delete icon. User can click "Confirm" button before delete.

### Complete _like post_ feature (FE/BE)

1. In client/src/components/Post get initial state from USER postLikes.
2. Complete _handleToggleLike_ function in client/src/components/Post to update like state on server.
3. Add server endpoint to posts controller. Increment POST likesCount and add postId to postLikes.

### Refactor the Comments Container

1. Move the comments container from client/src/components/Post to it's own component. _Don't forget to pass comments and/or any handlers as props._

### Add Confirmation and Error alerts/toasts on completion of the following requests

1. Signin/Signup
2. Delete post
3. Update user password
