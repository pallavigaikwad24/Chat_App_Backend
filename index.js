const express = require("express"); const path = require("path");
const dotenv = require("dotenv"); const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const PgSession = require('connect-pg-simple')(session); const { Pool } = require('pg');
const http = require("http"); const { Server } = require("socket.io"); const bodyParser = require("body-parser");
const { initializationPassport } = require("./src/Authentication/passportConfig.js");
const cors = require("cors");
const route = require("./src/routes/index.js"); const HTTP_CODE = require("./src/service/enum.js");
const socketIOInit = require("./src/utils/socketIOInit.js");
dotenv.config();

async function startApolloServer() {
  const app = express();

  const corsOptions = {
    origin: "http://localhost:5173", // Your React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allowed headers
    credentials: true, // Important: Allows credentials (cookies, auth headers)
  };

  app.use(cors(corsOptions));

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Connection with io
  socketIOInit(io);

  app.use(bodyParser.json());
  initializationPassport(passport);

  const pool = new Pool({
    host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, port: process.env.DB_PORT,
  });

  // Initialize the session store
  const sessionStore = new PgSession({ pool, tableName: 'sessions' });

  app.use(passport.initialize());

  app.use(session({ key: "user_SID", sessionStore, secret: 'black cat', resave: false, saveUninitialized: false }));
  app.use(passport.session());
  app.use(cookieParser());

  app.use("/public", express.static(path.join(__dirname, "public")));
  // app.set('view engine', 'ejs');
  // app.set('views', path.join(__dirname, 'views'));

  app.use(express.urlencoded({ extended: false }));

  // Route 
  app.use(route);
  app.use((req, res) => { res.status(HTTP_CODE.NOT_FOUND.code).render("pageNotFound") });

  server.listen(5000, () => {
    console.log("Server is listening on port 5000!");
  });
}

startApolloServer();