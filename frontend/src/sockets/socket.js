import {io} from "socket.io-client";


const openSocket = ({receiveGame, roundEnd, endGame, receiveSystemMessage, receiveChat, username}) => {
    const socket = io();

    socket.onAny((event, ...args)=> {
        console.log(event, args);
    });
    socket.on('connect', () => {
        console.log("joining now");
        socket.emit("join", {username: username});
    });
    socket.on("systemMessage", receiveSystemMessage);
    socket.on("startGame", receiveGame);
    socket.on("roundResults", roundEnd);
    socket.on("chat", receiveChat);
    socket.on("endGame", endGame);

    return socket;
}

export default openSocket;