import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://nameko-3d-othello-backend.herokuapp.com/";

const Top = () => {
  
    const [response, setResponse] = useState("");
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, []);

    return (
        <div>topだよ
            <div>
                <Link to='/play' >あそぶ</Link>
            </div>
            <p>
                It's <time dateTime={response}>{response}</time>
            </p>
        </div>

    );
}

export default Top;