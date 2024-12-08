import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import 'dotenv/config'

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


//run backend server
app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})


// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import 'dotenv/config';
// import http from 'http';
// import { Server as SocketIOServer } from 'socket.io';

// // app config
// const app = express();
// const port = 4000;

// // Create HTTP server
// const server = http.createServer(app);

// // Integrate Socket.io with HTTP server
// const io = new SocketIOServer(server);

// // Store admin socket ID
// let adminSocket = null;

// // When a user (customer) connects
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Listen for customer messages
//   socket.on('chatMessage', (message) => {
//     console.log('Message from customer:', message);

//     // If admin is connected, send message to admin
//     if (adminSocket) {
//       io.to(adminSocket).emit('newMessage', message);
//     }
//   });

//   // When admin connects
//   socket.on('adminConnect', () => {
//     adminSocket = socket.id;
//     console.log('Admin connected:', socket.id);
//   });

//   // When a message is sent from admin to customer
//   socket.on('adminReply', (message) => {
//     // Send message to the customer
//     socket.emit('newMessage', message);
//   });

//   // When a user disconnects
//   socket.on('disconnect', () => {
//     console.log('A user disconnected:', socket.id);

//     // Reset admin socket if admin disconnects
//     if (adminSocket === socket.id) {
//       adminSocket = null;
//     }
//   });
// });

// // Middleware
// app.use(express.json());
// app.use(cors());

// // DB connection
// connectDB();

// // API endpoints
// app.use("/api/food", foodRouter);
// app.use("/images", express.static('uploads'));
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

// // Run backend server
// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// // Run server with Socket.io
// server.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`);
// });
