const http = require("http");
const path = require('path')
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const chatRoute = require("./routes/chatRoute");
const paymentRoute = require("./routes/paymentRoute");
const adminRoute = require('./routes/adminRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const userRoute = require('./routes/userRoute');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", dashboardRoute);
app.use('/admin', adminRoute);
app.use('/user',userRoute);
app.use("/chat", chatRoute);
app.use("/", paymentRoute);
app.get('/registerForm',(req,res,next) => {
    res.sendFile(path.join(__dirname, 'views', 'registrationForm.html'))
})

/** ERROR HANDLING */
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message })
})

/** DATABASE CONNECTIVITY */
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.khvyqri.mongodb.net/userAuth"
  )
  .then((result) => {
    console.log(result.connection.host);
    console.log(result.connection.name);
    server.listen(PORT, () => {
      console.log(`Server is running on the port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

/** Socket Work */

io.on("connection", (socket) => {
  console.log("Connected...", socket.id);

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
