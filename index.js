const express = require('express');
const security = require("./src/security/security");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const tripRouter = require('./src/routes/tripRoutes');
const userRoutes = require('./src/routes/userRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const activityRoutes = require('./src/routes/activityRoutes');
const itemRoutes = require('./src/routes/itemRoutes');
const itineraryItemRoutes = require('./src/routes/itineraryItemRoutes');
const dbRoutes = require('./src/routes/dbDataRoutes');
const sessionRoutes = require('./src/routes/sessionRoutes');
const path = require("path");
const cors = require('cors');
const { sequelize } = require("./models");
const router = express.Router();

const port = process.env.PORT || 8000;

const app = express();
security.init();

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.static(path.join(__dirname, "public", "build")));

sequelize.authenticate().then(() => {
    console.log("Database connected");
})


app.use('/api/trips', tripRouter);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/db', dbRoutes);
app.use('/api/itineraryItems', itineraryItemRoutes);

app.get("/*", (req, res) => {
        if (!req.originalUrl.startsWith("/api") && !req.originalUrl.startsWith("/images")) {
            res.sendFile(path.join(__dirname, "public", "build", "index.html"));
        }
});

app.listen(port, () => {
    console.log("Start app on port " + port);
});