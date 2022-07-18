import { withAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Appbar from './components/Appbar.js';
import Calendar from './components/Calendar.js';
// import Login from './components/Login.js';
// import Logout from './components/Logout.js';
// import Profile from './components/Profile.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth0.isAuthenticated !== this.props.auth0.isAuthenticated) {
      if (this.props.auth0.isAuthenticated) {
        console.log(this.props.auth0.user)
        this.setState({
          userEmail: this.props.auth0.user.email,
        })
      }
    }
  }

  updateUserEmail = (email) => {
    this.setState({
      userEmail: email,
    })
  }

  render() {
    // console.log(this.state.userEmail);
    return (
      <div className="App">
        <Appbar />
        {/* {
          this.props.auth0.isAuthenticated ? <Logout /> : <Login />
        }
  
        {
          this.props.auth0.isAuthenticated ? <Profile updateUserEmail={this.updateUserEmail}/> : <h2>Login to account</h2>
        } */}
        <Calendar user={this.state.userEmail}/>
      </div>
    );
  }
}

export default withAuth0(App);
