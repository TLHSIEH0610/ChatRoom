import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";

interface IFormContent {
  userName: string;
  roomId: string;
}

export default ({
  joinRoom,
}: {
  joinRoom: (arg: IFormContent) => Promise<void>;
}) => {
  const [formContent, setFormContent] = useState<IFormContent>({
    userName: "",
    roomId: "",
  });
  const disabled = !formContent.userName || !formContent.roomId;
  const onSubmit = async () => {
    if (disabled) return;
    console.log(formContent);
    await joinRoom(formContent);
  };

  return (
    <Stack
      sx={{
        margin: "auto",
        width: "400px",
      }}
      spacing={2}
    >
      <TextField
        fullWidth
        id="userName"
        label="UserName"
        variant="outlined"
        onChange={({ target: { value } }) =>
          setFormContent((prev) => ({ ...prev, userName: value }))
        }
      />
      <TextField
        fullWidth
        id="roomId"
        label="RoomId"
        variant="outlined"
        onChange={({ target: { value } }) =>
          setFormContent((prev) => ({ ...prev, roomId: value }))
        }
      />
      <Button variant="contained" disabled={disabled} onClick={onSubmit}>
        Join
      </Button>
    </Stack>
  );
};
