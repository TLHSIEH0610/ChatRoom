import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export default () => {
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

      await connection.start();
      await connection.invoke("JoinRoom", { userName, roomId });

      connection.on("ReceiveMessage", (userName, message) => {
        console.log(`receive a message from ${userName}: ${message}`);
      });
    } catch (e) {
      console.error(e);
    }
  };
  joinRoom({ userName: "Hey", roomId: "ads" });
  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid xs={3}>List</Grid>
        <Grid xs={9}>
          <Box>
            <Stack>Chat</Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
