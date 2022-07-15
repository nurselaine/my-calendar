import React from 'react';
import axios from 'axios';
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
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
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
      eventNameEdit: '',
      descriptionEdit: '',
      timeEdit: '',
      date: '',
      showEditForm: false,
    })

    this.handleAddEvent = this.handleAddEvent.bind(this);
  }

  postEventData = async (eventObj) => {
    let url = `${process.env.REACT_APP_URL}/events`;
    await axios.post(url, eventObj);
    this.props.updateData();
    this.handleClose();
  }

  deleteEventData = async (event) => {
    try {
      const id = event._id;
      let url = `${process.env.REACT_APP_URL}/events/${id}`;
      await axios.delete(url); // returns id of deleted obj
      this.props.updateData();
    } catch (error) {
      console.log(error.message);
    }
    this.handleClose();
  }

  editEventData = async (obj) => {
    try {
      const id = obj._id;
      let url = `${process.env.REACT_APP_URL}/events/${id}`;
      axios.put(url, obj);
      this.props.updateData();
    } catch (error) {
      console.log(error.message);
    }
  }

  handleEditedEvent = (event) => {
    const eventObj = {
      title: this.state.eventNameEdit || this.state.eventName,
      description: this.state.descriptionEdit || this.state.description,
      time: this.state.timeEdit || this.state.time,
      date: this.state.date,
      user: '',
      _id: event._id,
      __v: event.__v,
    }
    console.log(eventObj);

    this.editEventData(eventObj);
    this.setState({
      showEditForm: false,
      showModal: false,
    })
  }

  handleAddEvent = (e) => {
    e.preventDefault();
    const eventObj = {
      title: this.state.eventName,
      description: this.state.description,
      time: this.state.time,
      date: this.state.date,
      user: '',
    }
    // this.props.updateEvents(eventObj);
    this.postEventData(eventObj);

    this.state.events.push(eventObj);
    // console.log(this.state.events);
    this.setState({
      events: this.state.events,
      eventName: '',
      description: '',
      time: '',
      date: this.state.date,
    })
    // console.log(this.state.events);
  }

  handleClose = () => {
    this.setState({
      showModal: false,
    })
  }

  handleOpen = (day) => {
    console.log(day);
    this.setState({
      showModal: true,
      date: day,
    })
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
    // console.log(this.props.day);
    let today = dayjs();
    let renderRows = groups.map((row, i) => {
      return (
        <TableRow key={i}>
          {
            row.map((day, j) => {
              // console.log(day.event);
              // console.log(!!day.event);
              if (this.props.month.indexOf(this.props.day[0].month) === today.$M && day.day === today.$D) {
                return (
                  <TableCell
                    key={j}
                    sx={{ color: 'success' }}
                    className='day-block'
                    onClick={() => this.handleOpen(day)}
                  >
                    <p id='today-marker' >{day.day}</p>
                    {
                      !!day.event &&
                      day.event.map((event, i) => {
                        return (
                          <EventBanner
                            key={i}
                            event={event}
                            showModal={this.state.showModal}
                          />
                        )
                      })
                    }
                  </TableCell>
                )
              } else {
                return (
                  <TableCell
                    className='day-block'
                    key={j}
                    onClick={() => this.handleOpen(day)}
                  >

                    <p id='day-marker'>{day.day}</p>
                    {
                      day && !!day.event &&
                      day.event.map((event, i) => {
                        // console.log(event);
                        return (
                          <EventBanner
                            key={i}
                            event={event}
                            showModal={this.state.showModal}
                          />
                        )
                      })
                    }
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
                {
                  !!this.state.date.event &&
                  this.state.date.event.map(event => {
                    // console.log(event);
                    return (
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{`${event.name} at ${event.time}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {
                            this.state.showEditForm ?
                              <form>
                                <label>Name of Event</label><br />
                                <input
                                  type='text'
                                  name='name'
                                  placeholder={event.name}
                                  value={this.state.eventNameEdit}
                                  onChange={(e) => { this.setState({ eventNameEdit: e.target.value }) }}
                                /><br />
                                <label>Description</label><br />
                                <input
                                  type='text'
                                  name='description'
                                  placeholder={event.description}
                                  value={this.state.descriptionEdit}
                                  onChange={(e) => { this.setState({ descriptionEdit: e.target.value }) }}
                                /><br />
                                <label>Time</label><br />
                                <input
                                  type='time'
                                  min='00:00'
                                  max='2330'
                                  name='time'
                                  placeholder={event.time}
                                  value={this.state.timeEdit}
                                  onChange={(e) => { this.setState({ timeEdit: e.target.value }) }}
                                /><br />
                                <Button onClick={() => this.handleEditedEvent(event)}>Update Event</Button>
                              </form>
                            : <p>{`${event.description}`}</p>
                          }
                          <Button onClick={() => this.deleteEventData(event)}><ClearIcon id='delete-icon' /></Button>
                          <Button onClick={() => this.setState({showEditForm: true})}><EditIcon id='delete-icon' /></Button>
                        </AccordionDetails>
                      </Accordion>
                    )
                  })
                }
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<AddIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Add Event</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <form>
                  <label>Name of Event</label><br />
                  <input
                    type='text'
                    name='name'
                    value={this.state.eventName}
                    onChange={(e) => { this.setState({ eventName: e.target.value }) }}
                  /><br />
                  <label>Description</label><br />
                  <input
                    type='text'
                    name='description'
                    value={this.state.description}
                    onChange={(e) => { this.setState({ description: e.target.value }) }}
                  /><br />
                  <label>Time</label><br />
                  <input
                    type='time'
                    min='00:00'
                    max='2330'
                    name='time'
                    value={this.state.time}
                    onChange={(e) => { this.setState({ time: e.target.value }) }}
                  /><br />
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