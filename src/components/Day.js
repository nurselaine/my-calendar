import React from 'react';
import {
  TableCell,
  TableRow,
  Box,
  Modal
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import EventBanner from './EventBanner';
import './Day.css';

class Day extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      showModal: false,
      events: [],
      eventName: '',
      description: '',
      time: '',
      date: '',
    })

    this.handleAddEvent = this.handleAddEvent.bind(this);
  }

  handleAddEvent = (e) => {
    e.preventDefault();

    const eventObj = {
      name: this.state.eventName,
      description: this.state.description,
      time: this.state.time,
      date: this.state.date,
    }
    // console.log(eventObj);
    this.state.events.push(eventObj);
    this.setState({
      events: this.state.events,
      eventName: '',
      description: '',
      time: '',
      date: this.state.date,
    })

  }

  handleClose = () => {
    this.setState({
      showModal: false,
    })
  }

  handleOpen = () => {
    this.setState({
      showModal: true,
    })
    console.log('open modal');
  }

  handleDayEvent = (day) => {
    this.setState({
      date: day,
    })
    this.handleOpen();
  }

  getRows = () => {
    let max = 0;
    this.props.day.map(obj => {
      if (obj.tableRow > max) {
        max = obj.tableRow;
      }
    })
    let rowArr = Array(max).fill(null);
    return rowArr;
  }

  handleEventBanners = (day) => {
    let newArr = this.props.day;
    if(this.state.events.length){
      newArr = this.props.day.map(day => {
        return this.state.events.map(event => {
          if(day.day === event.date.day && day.month === event.date.month){
            return day.event = event;
          }
        })
      })
    }
    console.log(newArr);
    return newArr;
  }

  organizeByTableRow = () => {
    let groups = [];
    /*
    [
      [{1}, {2}],
      [{}, {}],
    ]

    6 arrays for the 6 tabel rows
    */
    this.props.day.forEach((d) => {
      let tableRow = d.tableRow;
      if (groups[tableRow - 1]) {
        groups[tableRow - 1].push(d);
      } else {
        let newArray = [];
        newArray.push(d);
        groups[tableRow - 1] = newArray;
      }
    })
    // console.log(groups);
    groups = groups.map((week, i) => {
      if (week.length < 7) {
        let newArr = Array(7).fill('');
        week.map(day => {
          newArr[day.dayInWeek] = day;
          week = newArr;
          return newArr;
        })
      }
      return week;
    })

    return groups;
  }

  renderDaysByRow = (groups) => {
    let today = dayjs();
    console.log(this.state.events);
    let renderRows = groups.map((row, i) => {
      return (
        <TableRow key={i}>
          {
            row.map((day, j) => {
              // console.log(day.day);
              if (this.props.month.indexOf(this.props.day[0].month) === today.$M && day.day === today.$D) {
                return (
                  <TableCell
                    key={j}
                    sx={{ color: 'success' }}
                    className='day-block'
                    onClick={() => this.handleDayEvent(day)}
                  >
                    <p id='today-marker' >{day.day}</p>
                    {day.event && <EventBanner event={day.event}/>}
                  </TableCell>
                )
              } else {
                return (
                  <TableCell
                    className='day-block'
                    key={j}
                    onClick={() => this.handleDayEvent(day)}
                  >
                    <p id='day-marker'>{day.day}</p>
                    {day.event && <EventBanner event={day.event}/>}
                  </TableCell>
                )
              }
              // return <TableCell key={j}>{day.day}</TableCell>
            })
          }
        </TableRow>
      )
    });
    return renderRows;
  }

  render() {
    let groups = this.organizeByTableRow();
    console.log(this.handleEventBanners());
    // console.log(this.state.events);
    console.log(this.props.day);
    return (
      <>
        {this.renderDaysByRow(groups)}
        <Modal
          open={this.state.showModal}
          onClose={this.handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box id='event-modal'>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Events Happening Today</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<AddIcon/>}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Add Event</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <form>
                  <label>Name of Event</label><br/>
                  <input 
                    type='text' 
                    name='name' 
                    value={this.state.eventName}
                    onChange={(e) => {this.setState({eventName: e.target.value})}}
                  /><br/>
                  <label>Description</label><br/>
                  <input 
                    type='text' 
                    name='description' 
                    value={this.state.description}
                    onChange={(e) => {this.setState({description: e.target.value})}}
                  /><br/>
                  <label>Time</label><br/>
                  <input 
                    type='time' 
                    min='00:00' 
                    max='2330' 
                    name='time' 
                    value={this.state.time}
                    onChange={(e) => {this.setState({time: e.target.value})}}
                  /><br/>
                  <Button onClick={this.handleAddEvent}>Create Event</Button>
                </form>
              </AccordionDetails>
            </Accordion>
            <Button onClick={this.handleClose}>Close</Button>
          </Box>
        </Modal>
      </>
    )
  }
}

export default Day;