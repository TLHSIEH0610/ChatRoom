import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default ({ users }: { users: string[] }) => {
  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemText>User List:</ListItemText>
      </ListItem>
      {users.map((user, key) => (
        <ListItem key={key} disablePadding>
          <ListItemText primary={user} />
        </ListItem>
      ))}
    </List>
  );
};
