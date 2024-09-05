import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, '../proto/order.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const orderProto = grpc.loadPackageDefinition(packageDefinition).order;

function createOrder(call, callback) {
  const { orderId, details } = call.request;
  console.log(`Order created: ID=${orderId}, Details=${details}`);
  callback(null, { message: `Order ${orderId} created successfully!`, success: true });
}

function main() {
  const server = new grpc.Server();
  server.addService(orderProto.OrderService.service, { CreateOrder: createOrder });
  const port = '127.0.0.1:50052';
  server.bindAsync(port, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`OrderService gRPC server running at ${port}`);
    server.start();
  });
}

main();
