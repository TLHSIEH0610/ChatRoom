import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
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
  return (
    <List
      sx={{ width: "100%", border: "1px lightgray solid", minHeight: "600px" }}
    >
      {messages.map((message, key) => (
        <ListItem alignItems="flex-start" key={key}>
          <ListItemText
            primary={message.message}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {message.userName}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
