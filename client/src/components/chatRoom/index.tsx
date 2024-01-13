import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
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
import { Button } from "@mui/material";

export default () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<
    {
      userName: string;
      message: string;
    }[]
  >([]);
  const [users, setUsers] = useState<string[]>([]);
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
    <Container maxWidth="sm">
      {connection ? (
        <Grid container spacing={2}>
          <Button onClick={closeConnection}>Leave Room</Button>
          <Grid xs={3}>
            <UserList users={users} />
          </Grid>
          <Grid xs={9}>
            <Box>
              <Stack>
                <ChatBox messages={messages} />
                <MessageInput sendMessage={sendMessage} />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Landing joinRoom={joinRoom} />
      )}
    </Container>
  );
};
