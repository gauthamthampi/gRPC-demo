import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PROTO_PATH = path.join(__dirname,'../proto/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

function createUser(call,callback){
    const {username,email} = call.request
    console.log(`User created: ${username}, ${email}`);
    callback(null, {message: `User ${username} created successfully!`,success: true})    
}

function main(){
    const server = new grpc.Server()
    server.addService(userProto.UserService.service,{CreateUser:createUser});
    const port = '127.0.0.1:50051';
    server.bindAsync(port, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`UserService gRPC server running at ${port}`);
        server.start();
      });
    }

main();
