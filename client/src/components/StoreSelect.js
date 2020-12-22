import React, { useState, useEffect } from 'react'

export default function StoreSelect (props) {

    const [stores, setStores] = useState()

    useEffect(() => {

        const items = []

        fetch(process.env.REACT_APP_endpoint + 'api/stores')
        .then(res=>res.json())
        .then(result=>{
            for(let i = 0; i < result.length; i++){
                items.push(    
                <StoreItem
                    key={result[i]._id}
                    name={result[i].name}
                    number={result[i].number}
                    location={result[i].location}
                    handleConnect={()=>props.handleConnect(result[i])}
                />)
            }
            setStores(items)
        })
        .catch(error=>'fetch error: ' + console.log(error))

    }, [])

    return (
        <div className="store-item-list">
            {stores}
        </div>
    )
}

function StoreItem (props) {
    return (
        <div className="store-item">
            {props.name}
            <button onClick={props.handleConnect}>CONNECT</button>
        </div>
    )
}

