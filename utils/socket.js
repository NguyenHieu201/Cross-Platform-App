import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.23:3000");
export default socket;
