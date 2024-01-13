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
    <Box sx={{ display: "flex", marginTop: "20px" }}>
      <TextField
        id="message"
        label="Message"
        variant="outlined"
        value={message}
        fullWidth
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
