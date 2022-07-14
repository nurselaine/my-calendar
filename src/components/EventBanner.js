import React from 'react';
import './EventBanner.css';

class EventBanner extends React.Component {
  render() {
    return (
      <>
        <div className='banner-div'>
          {/* {this.props.holiday && this.props.holidayEvent.name} */}
          {this.props.event.name}
        </div>
      </>
    )
  }
}

export default EventBanner;