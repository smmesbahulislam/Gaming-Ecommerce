import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListSubheader,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function AdminMenu() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListSubheader component="div" id="nested-list-subheader">
        Supplier panel
      </ListSubheader>

      <ListItemButton
        component={NavLink}
        to="/supplier/order-info"
      >
        <ListItemIcon>
          <CreateNewFolderIcon />
        </ListItemIcon>
        <ListItemText primary="Confirmed order" />
      </ListItemButton>
      
      <ListItemButton
        component={NavLink}
        to="/supplier/order-info-shipping"
      >
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Shipping order" />
      </ListItemButton>

      <ListItemButton
        component={NavLink}
        to="/supplier/order-info-shipped"
      >
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Shipped order" />
      </ListItemButton>


      

      {/* <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Hello" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="There" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </List>
  );
}