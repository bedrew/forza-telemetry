import './App.css';
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Dashboard } from './components/Dashboard'
import  useWebSocket  from 'react-use-websocket'


function App() {

    const [dashboardData, setDashBoardData] = React.useState(null)

    // eslint-disable-next-line no-restricted-globals
    const WS_URL = `ws://${location.hostname}:8000`;

    useWebSocket(WS_URL, {
        onOpen: () => {
          console.log('WebSocket connection established.');
        },
        onMessage:(ev)=> {
            setDashBoardData(JSON.parse(JSON.parse(ev.data)))
           // console.log('WebSocket connection established.');
        }
      });  

  return (
    <div>
         <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        />
          <Dashboard message={dashboardData} />
    </div>
  
  );
}

export default App;
