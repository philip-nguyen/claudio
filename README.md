# ClAud-io
A Web-based digitial audio workstation working prototype that features a sequencer, its users and their music compositions.

## Initial Setup 
Once you clone the repo:
```
npm install
```
`cd` into the api directory (for UNIX and Cygwin)
and install flask and python-dotenv
and if we'll be needing other libraries, here is where we can install them:
```
cd api
python3 -m venv venv
source venv/bin/activate
pip install flask python-dotenv
```
**If we start using other python libraries pls add them here to the readme as well.**


There is an added a custom script in node.packages called `start-api` which starts the flask app from the top of the directory. It just executes `flask run`. This doesn't seem to work on cygwin though...

## To Run Flask server
### Mac/Linux:
```
npm run-script start-api
```

### Cygwin(Windows)/Mac/Linux
```
cd api
source venv/bin/activate
flask run
```

**Remember that you need 2 terminals to run both the servers**

![two-servers](https://user-images.githubusercontent.com/55335418/110071827-9a44c600-7d31-11eb-8dc7-149e7b04b174.PNG)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
