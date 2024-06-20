const express = require('express');
const dotenv = require('dotenv');
const logs = require('./middleware/logs.js');
const authRoute = require('./route/authRoute.js');
const userRoute = require('./route/userRoute.js');
const publishRoute = require('./route/publishRoute.js');
const commentRoute = require('./route/commentRoute.js');
const profileRoute = require('./route/profileRoute.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logs);

app.use(authRoute); // Auth
app.use(userRoute); // User
app.use(publishRoute); // Publish
app.use(commentRoute); // Comment
app.use(profileRoute); // Profile

app.listen(`${port}`, () => {
    console.log(`Server berjalan di port ${port}`);
});
