import express from 'express'
import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const USER_PROTO_PATH = path.join(__dirname,'../proto/user.proto');
const ORDER_PROTO_PATH = path.join(__dirname,'../proto/order.proto');

const userPackageDefinition = protoLoader.loadSync(USER_PROTO_PATH, {});
const userProto = grpc.loadPackageDefinition(userPackageDefinition).user;

const orderPackageDefinition = protoLoader.loadSync(ORDER_PROTO_PATH, {});
const orderProto = grpc.loadPackageDefinition(orderPackageDefinition).order;

const userClient = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());
const orderClient = new orderProto.OrderService('localhost:50052', grpc.credentials.createInsecure());

app.post('/create-user', (req, res) => {
    const { username, email } = req.body;
    userClient.CreateUser({ username, email }, (error, response) => {
      if (error) return res.status(500).send(error);
      res.send(response);
    });
  });
  
  app.post('/create-order', (req, res) => {
    const { orderId, details } = req.body;
    orderClient.CreateOrder({ orderId, details }, (error, response) => {
      if (error) return res.status(500).send(error);
      res.send(response);
    });
  });

  app.listen(3002, () => {
    console.log('Gateway server is running on port 3002');
  });