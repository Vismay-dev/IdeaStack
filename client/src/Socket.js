import io from "socket.io-client";
import { useState } from "react";

let socketObj;

const createSocket = () => {
  const socket = io();
  socketObj = socket;
  return socket;
};

const returnSocket = () => {
  return socketObj;
};

export { returnSocket, createSocket };
