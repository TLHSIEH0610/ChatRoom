import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";

export default ({
  sendMessage,
}: {
  sendMessage: (arg: string) => Promise<void>;
}) => {
  const [message, setMessage] = useState("");
  return (
    <Box>
      <TextField
        id="message"
        label="Message"
        variant="outlined"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
      />
      <Button
        disabled={!message}
        onClick={() => {
          sendMessage(message);
          setMessage("");
        }}
      >
        Send
      </Button>
    </Box>
  );
};
