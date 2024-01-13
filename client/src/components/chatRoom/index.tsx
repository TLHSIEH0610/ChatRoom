import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import Landing from "./landing";
import MessageInput from "./messageInput";
import ChatBox from "./chatbox";
import UserList from "./userList";
import { Button, CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";

export default () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<
    {
      userName: string;
      message: string;
    }[]
  >([]);
  const [users, setUsers] = useState<string[]>(["dwdw"]);
  const joinRoom = async ({
    userName,
    roomId,
  }: {
    userName: string;
    roomId: string;
  }) => {
    try {
      // create a connection
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5190/chatroom")
        .configureLogging(LogLevel.Information)
        .build();

      //listening message from server
      connection.on("ReceiveMessage", (userName, message) => {
        console.log(`receive a message from ${userName}: ${message}`);
        setMessages((prev) => [...prev, { userName, message }]);
      });

      connection.onclose((_) => {
        setConnection(null);
        setMessages([]);
        setUsers([]);
      });

      connection.on("UserList", (user) => {
        setUsers(user);
      });

      //start connection
      await connection.start();
      //invoke JoinRoom method from backend
      await connection.invoke("JoinRoom", { userName, roomId });

      setConnection(connection);
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke("SendMessage", message);
    } catch (e) {
      console.error(e);
    }
  };

  const closeConnection = async () => {
    try {
      connection?.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      sx={{
        minWidth: "1280px",
      }}
    >
      {connection ? (
        <Card>
          <CardContent sx={{ height: "100%" }}>
            {" "}
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <UserList users={users} />
              </Grid>
              <Grid item xs={9}>
                <ChatBox messages={messages} />
              </Grid>
            </Grid>
            <MessageInput sendMessage={sendMessage} />
          </CardContent>

          <CardActions>
            <Button onClick={closeConnection}>Leave Room</Button>{" "}
          </CardActions>
        </Card>
      ) : (
        <Landing joinRoom={joinRoom} />
      )}
    </Box>
  );
};
