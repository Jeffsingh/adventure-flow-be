const express = require('express');
const security = require("./src/security/security");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const tripRouter = require('./src/routes/tripRoutes');
const userRoutes = require('./src/routes/userRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const activityRoutes = require('./src/routes/activityRoutes');
const itemRoutes = require('./src/routes/itemRoutes');
const sessionRoutes = require('./src/routes/sessionRoutes');
const cors = require('cors');
const { sequelize } = require("./models")

const app = express();
security.init();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:3000'
}));


sequelize.authenticate().then(() => {
    console.log("Database connected");
})

app.use('/api/trips', tripRouter);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/sessions', sessionRoutes);

app.listen(8000, () => {
    console.log("Start app");
});


