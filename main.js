const { WebSocketServer } = require('ws');
const http = require('http');
const { ConnectionBuilder } = require('electron-cgi')


// Spinning the HTTP server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});


const clients = {}

const pushData = (json) => {
    const data = JSON.stringify(json);
    for (let userId in clients) {
        let client = clients[userId];
        if(client.readyState === 1) {
          console.log(data)
            client.send(data);
        }
    };
}

wsServer.on('connection', function(connection) {
  // Generate a unique code for every user
  const userId = new Date().getTime();
  console.log(`Recieved a new connection.`);

  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);
});


 // C# communication stuff ForzaDataDotNet
 const connection = new ConnectionBuilder()
  .connectTo('dotnet', 'run', '--project', 'ForzaCore')
  .build()

connection.onDisconnect = () => {
    console.log('lost')
}



// receive
connection.on('new-data', (data, test, test12) => {
    // parse data into object
      const dataObj = JSON.parse(data)
    // send the data from forza to the front-end
    // log this event
    pushData(data)
    console.log(`${dataObj.Steer}`)
   
})

connection.on('switch-recording-mode', (data) => {
  // parse data into object
  const dataObj = JSON.parse(data)
  // send the data from forza to the front-end
  // log this event
  console.log(`${dataObj.Steer}`)

  pushData(data)

})

