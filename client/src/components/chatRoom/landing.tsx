import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
    <Box>
      <TextField
        id="userName"
        label="UserName"
        variant="outlined"
        onChange={({ target: { value } }) =>
          setFormContent((prev) => ({ ...prev, userName: value }))
        }
      />
      <TextField
        id="roomId"
        label="RoomId"
        variant="outlined"
        onChange={({ target: { value } }) =>
          setFormContent((prev) => ({ ...prev, roomId: value }))
        }
      />
      <Button disabled={disabled} onClick={onSubmit}>
        Join
      </Button>
    </Box>
  );
};
