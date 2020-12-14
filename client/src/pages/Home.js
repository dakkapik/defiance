
import React, {useState} from 'react';
import '../style/App.css'

import Game from '../assets/ticktacktoe'

const newPage = () => {
    console.log("latest")
}

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
            <Counter/>
            <div style={{
                backgroundImage: "%PUBLIC_URL%/favicon.ico"
            }}></div>
            </div>
        )
    }
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
