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

export default () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<
    {
      userName: string;
      message: string;
    }[]
  >([]);

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
      if (!connection) return;
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="sm">
      {connection ? (
        <Grid container spacing={2}>
          <Grid xs={3}>List</Grid>
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
