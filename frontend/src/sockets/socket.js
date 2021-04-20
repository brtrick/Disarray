import {io} from "socket.io-client";

const openSocket = ({receiveGame, endRound, receiveSystemMessage, receiveChat}) => {
    const socket = io();

    socket.onAny((event, ...args)=> {
        console.log(event, args);
    });
    socket.on('connect', () => {
        console.log("joining now");
        const d = new Date();
        const name = "Brad" + d.getUTCMilliseconds();
        socket.emit("join", {username: name});
    });
    socket.on("systemMessage", receiveSystemMessage);
    socket.on("startGame", receiveGame);
    socket.on("roundResults", endRound);
    socket.on("chat", receiveChat);

    return socket;
}

export default openSocket;