import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './Login.js';
import Logout from './Logout.js';
import Profile from './Profile.js';
import './Appbar.css';

class Appbar extends React.Component {
  render() {
    return (
      <Box id='appbar-container' sx={{ flexGrow: 1 }}>
        <AppBar id='appbar' position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {/* {
                this.props.auth0.isAuthenticated ? <Profile updateUserEmail={this.updateUserEmail} /> : <h2>Login to account</h2>
              } */}
            </Typography>
            {
              this.props.auth0.isAuthenticated
                ? <Logout /> : <Login />
            }
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default withAuth0(Appbar);