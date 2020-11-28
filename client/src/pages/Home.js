
import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";

import '../style/App.css'

import Game from '../assets/ticktacktoe'

const ENDPOINT = "http://192.168.0.10:3001";

export default class Page extends React.Component {

    render() {
        return(
            <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                backgroundColor: "orange",
            }}>
            <Date/>
            <Counter/>
            <div style={{
                backgroundImage: "%PUBLIC_URL%/favicon.ico"
            }}></div>
            </div>
        )
    }
}

function Date() {
    const [response, setResponse] = useState("");
  
    useEffect(() => {
      const socket = socketIOClient(ENDPOINT);
      socket.on("FromAPI", data => {
        setResponse(data);
      });
    }, []);
  
    return (
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
    );
}

function Counter() {

    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=> setCount(count + 1)}>
                Click me
            </button>
                <Game/>

        </div>

    );
}
