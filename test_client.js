const {setupClient }=require('./clutta_sync_client')

const chain_id="6bee099e-3a44-4af8-9b50-310d86d15f3e"
const signature_id="f71d00d0-5c85-4781-8579-1a89f458a418"
const correlation_id="39c34ce9-7748-41b3-976e-22eff701111c"
const source_id="busola"
const status="SUCCESS"
const status_description="testing from clutta-js in separate repo"
const port="**"
const host="***"

// sendPulseExample()

const client=setupClient("customer_Id", host, port)
client.sendPulse(chain_id,signature_id,correlation_id,source_id,status,status_description);