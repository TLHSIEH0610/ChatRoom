import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";

export default ({
  sendMessage,
}: {
  sendMessage: (arg: string) => Promise<void>;
}) => {
  const [message, setMessage] = useState("");
  return (
    <Stack spacing={2} direction="row">
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
        variant="contained"
        size="small"
      >
        Send
      </Button>
    </Stack>
  );
};
