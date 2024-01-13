import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default ({
  messages,
}: {
  messages: {
    userName: string;
    message: string;
  }[];
}) => {
  return messages.map((message, key) => (
    <List
      key={key}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={message.userName}
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {message.message}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  ));
};
