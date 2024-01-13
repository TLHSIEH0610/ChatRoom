import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export default ({ users }: { users: string[] }) => {
  return (
    <List>
      {users.map((user, key) => (
        <ListItem key={key} disablePadding>
          <ListItemButton>
            {/* <ListItemIcon>
              <InboxIcon />
            </ListItemIcon> */}
            <ListItemText primary={user} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
