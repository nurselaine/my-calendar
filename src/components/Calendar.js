import React from 'react';
import Day from './Day.js';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer'
import { TableBody } from '@mui/material';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December']

    this.state = {
      month: dayjs().month(),
      daysInMonth: dayjs(dayjs().month() + 1).daysInMonth(),
      weekday: dayjs().day(), // Su-Sa
      dayInMonth: dayjs().$D, // 1-31
      // days: Array(this.state.daysInMonth), 
      day: [],
    }
  }

  componentDidMount() {
    this.formatData();
  }

  formatData = () => {
    let day = [];
    let rowCount = 1;

    for (let i = 1; i <= this.state.daysInMonth; i++) {
      let todayDate = dayjs().set('date', i).set('month', dayjs().month());
      if (todayDate.$W === 0) {
        rowCount++;
      }

      day.push({
        day: i,
        dayInWeek: todayDate.$W,
        tableRow: rowCount,
      })
    }
    console.log(day.dayInWeek);
    this.setState({
      day: day,
    })
  }

  render() {
    console.log(this.state.day);
    return (
      <TableContainer>
        <Table>
          <TableBody>
            <Day
              weekdayArr={this.weekDays}
              weekday={this.state.weekday}
              dayInMonth={this.state.dayInMonth}
              daysInMonth={this.state.daysInMonth}
              day={this.state.day}
            />
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}



export default Calendar;