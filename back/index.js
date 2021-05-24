const express = require('express'); //서버를 구성해주는 프레임워크
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const passportConfig = require('./passport');
const db = require('./models');
const todoAPIRouter = require('./routes/todo');
const todoListAPIRouter = require('./routes/todoList');
const DdayAPIRouter = require('./routes/dday');
const DdayListAPIRouter = require('./routes/ddayList');
const userAPIRouter = require('./routes/user');

dotenv.config();
const app = express(); //express를 불러와서 실행을 해주면 app이라는 객체가 생김.
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
    name: 'pspl'
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => { //프론트에서 / 서버에 요청을 하면 res.send를 통해 응답을 함.
    res.send('study planner 백엔드 정상 동작!');
});

app.use('/api/todo', todoAPIRouter);
app.use('/api/todolist', todoListAPIRouter);
app.use('/api/dday', DdayAPIRouter);
app.use('/api/ddaylist', DdayListAPIRouter);
app.use('/api/user', userAPIRouter);

app.listen(3070, () => {
    console.log('server is running on http://localhost:3070');
});