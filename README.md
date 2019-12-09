This project is the front-end part of the Online English Academy Website Application and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Technical Statck
* React.js
* Ant Design
* Firebase Web API
* React-Router 
* Jest & Enzyme

## Prerequisites

1. Using Git to clone this repository.
2. Install the necessary environment.
 * [Install Node.js LTS](https://nodejs.org/en/).
 * [Install Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable).
3. Acquire Web Application credentials from firebase.
 1. Create *.env* file under the **root** directory.
 2. Follow [Download Firebase config file or object](https://support.google.com/firebase/answer/7015592) to download credentials and paste them into *.env* file.
4. Install necessary dependencies using the command: `npm install`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you cannot go back!**

If you are not satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc.) right into your project, so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you are on your own.

You do not have ever to use `eject`. The curated feature set is suitable for small and middle deployments, and you should not feel obligated to use this feature. However, we understand that this tool would not be useful if you could not customize it when you are ready for it.

## Deployment

1. Run `yarn build`
1. Run `firebase install.`
2. Go the firebase console -> hosting, using the provided URL.

## Q&A 
1. How do I test this project?
* *Create React App* has already integrated with [Jest](https://jestjs.io/), and another tool called [Enzyme](https://airbnb.io/enzyme/) is also trendy.

2. How do I pick up these codes quickly?
* The structure of the project is very concise and easy-understanding. We recommend you read *Navigation.js* first because most of the components are under it.

3. How could I extend this project?
* There are lots of ways to extend it. You can use [Redux](https://redux.js.org/) or [MobX](https://github.com/mobxjs/mobx) to manage the state. If you want to build this project without the help of *create react app*, you can use [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/) and follow [instruction](https://medium.com/@tim.givois.mendez/create-a-react-project-from-scratch-without-create-react-app-f02fce4e05b)


## Troubleshooting 
* Why can't I deploy the project to firebase?
    * You should copy the credentials to your local files.

