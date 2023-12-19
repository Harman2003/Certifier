import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const ManagersContainer = () => {
  return (
    <div className="h-fit col-span-1 row-span-4 rounded-2xl bg-white p-4">
      <div className="flex justify-between items-center text-gray-600">
        <div className="font-bold text-2xl font-Poppins text-gray-800">
          Our Managers
        </div>
        <div className="bg-gray-100 hover:bg-gray-200 rounded-xl px-2 cursor-pointer">
          view all
        </div>
      </div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Harman Singh"
              src="https://eu.ui-avatars.com/api/?name=Harman+Singh&size=460"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Harman Singh"
            secondary={<React.Fragment>Active Now</React.Fragment>}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Nitin Mittal"
              src="https://eu.ui-avatars.com/api/?name=Nitin+Mittal&size=460"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Nitin Mittal"
            secondary={<React.Fragment>Active 10min ago</React.Fragment>}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Travis Howard"
              src="https://eu.ui-avatars.com/api/?name=Travis+Howard&size=460"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Travis Howard"
            secondary={<React.Fragment>Active 35min ago</React.Fragment>}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Harsh Goyal"
              src="https://eu.ui-avatars.com/api/?name=Harsh+Goyal&size=460"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Harsh Goyal"
            secondary={<React.Fragment>Active 1hr ago</React.Fragment>}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Sujal Aggarwal"
              src="https://eu.ui-avatars.com/api/?name=Sujal+Aggarwal&size=460"
            />
          </ListItemAvatar>
          <ListItemText
            primary="Sujal Aggarwal"
            secondary={<React.Fragment>Active 10hr ago</React.Fragment>}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
}

export default ManagersContainer
