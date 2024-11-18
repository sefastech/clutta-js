const SyncClient = require('./SyncClient');
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const protoFileLocation = path.resolve(__dirname, 'pulsestream.proto');

const packageDefinition = protoLoader.loadSync(protoFileLocation, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const pulsestreamservice = protoDescriptor.clutta_sync_grpc

function establishConnection(address){
    let creds;  
    creds = grpc.credentials.createSsl();
    return new pulsestreamservice.PulseStreamService(address,creds)
}

function checkSubscription(customerId){
  //to be implemented later
  return true
}

function setupClient(customerId, host, port){
  let address=host+":"+port
  
  if (!checkSubscription(customerId)){
    console.log("User subscription invalid")
    return
  }

  const client=establishConnection(address)
  return new SyncClient(client)
}

module.exports ={
  setupClient
}