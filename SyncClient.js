const grpc = require('@grpc/grpc-js');
const { v4: uuidv4 } = require('uuid');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');


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

const StatusMap = {};
pulsestreamservice.PulseStatus.type.value.forEach(enumValue => {
  StatusMap[enumValue.name] = enumValue.number;
});

function getStatusValue(statusName) {
  return StatusMap[statusName] !== undefined ? StatusMap[statusName] : StatusMap['UNKNOWN'];
} 

class SyncClient{
    constructor(client){
        this.client=client
    }

    sendPulse(chainId,signatureId,correlationId,sourceId,status,statusDescription){
      var pulse={
        uuid: uuidv4(),
        chain_id: chainId,
        signature_id: signatureId,
        correlation_id: correlationId,
        source_id: sourceId,
        status: getStatusValue(status),
        status_description: statusDescription,
        created_at: String(Date.now())
      }

      var call = this.client.sendPulse(function(error, response) {
        if (error) {
          console.error(error);
        }
        console.log('Stream success: ', response);
      });

      try{
        call.write(pulse);
        console.log('Pulse sent successfully');
      }catch (error) {
        console.log('Failed to send pulse with error %s',error);
      }

      call.end()
    }
}

module.exports = SyncClient;