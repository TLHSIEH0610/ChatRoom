import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default ({ users }: { users: string[] }) => {
  return (
    <List>
      {users.map((user, key) => (
        <ListItem key={key} disablePadding>
          <ListItemText primary={user} />
        </ListItem>
      ))}
    </List>
  );
};
