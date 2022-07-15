import React from 'react';
import { Button } from '@mui/material';
import './EventBanner.css';

class EventBanner extends React.Component {
  render() {
    // console.log(this.props.showModal);
    return (
      // <section>
      //   {
      //     this.props.showModal ?
            <div id='banner-div'>
              <p>{this.props.event.name}</p>
            </div>
        //     :
        //     <div id='modal-banner-div'>
        //       {this.props.event.name}
        //     </div>
        // }
      // </section>
    )
  }
}

export default EventBanner;