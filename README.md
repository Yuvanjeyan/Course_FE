# Learning Platform Client

This is the React frontend for the Learning Platform application. It provides a polished UI for students, teachers, and admins with course browsing, video playback, course creation, quizzes, enrollment tracking, and certificate features.

## Features

- Responsive dashboard for students, teachers, and admins
- Course creation and editing with video upload support
- Student course browsing, enrollment, and details pages
- Secure JWT authentication with role-based protected routes
- Video player for uploaded course material
- Quiz center, certificate generator, and attendance module placeholders
- Tailwind CSS styling with a modern dashboard layout

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in `client/` if needed:

   ```bash
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

3. Start the client app:

   ```bash
   npm start
   ```

4. Open the app in your browser at:

   ```text
   http://localhost:3000
   ```

## Important Notes

- The frontend expects the backend API to be available at `REACT_APP_BACKEND_URL`.
- If `REACT_APP_BACKEND_URL` is not set, the client defaults to `http://localhost:5000`.
- File upload fields use `multipart/form-data` so video uploads work with the backend.

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the frontend in development mode.

### `npm test`

Runs the test runner.

### `npm run build`

Builds the app for production into the `build` folder.

## Dependencies

Key frontend libraries include:

- React
- React Router DOM
- Redux Toolkit
- Axios
- Tailwind CSS
- React Toastify

## Deployment

Build the production bundle with:

```bash
npm run build
```

Then serve the contents of the `build/` folder with any static hosting provider.

### Notes

- This client is intended to work with the backend server running at `http://localhost:5000`.
- If you use a different backend URL, update `REACT_APP_BACKEND_URL` in `.env`.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
