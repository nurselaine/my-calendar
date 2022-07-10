import React from 'react';
import Day from './Day.js';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { Paper, TableBody, TableHead, TableRow, TableCell, Button } from '@mui/material';

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
      monthsInYear: this.month,
      // days: Array(this.state.daysInMonth), 
      day: [],
      selectedMonth: dayjs().month(),
    }
  }

  componentDidMount() {
    this.state.monthsInYear.map((month, i) => this.formatData(this.state.monthsInYear.indexOf(month), i))
  }

  incrementSelectedMonth = () => {
    if(this.state.selectedMonth === 11) {
      this.setState({
        selectedMonth: 0,
      })
    } else {
      this.setState({
        selectedMonth: this.state.selectedMonth + 1,
      })
    }
  }
  

  formatData = () => {
    this.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December']
    let monthArr = [];

    for (let i = 0; i < this.month.length; i++) {
      let month = this.month[i];
      let rowCount = 1;
      let newArr = [];
      let date = `${dayjs().year()}-${month + 1}-01`;
      let todayDate = dayjs(date).$W;
      let daysInMonth = dayjs(date).daysInMonth();
      for (let j = 1; j <= daysInMonth; j++) {

        if (todayDate === 0) {
          rowCount++;
        }
        newArr.push({
          day: j,
          month: this.month[i],
          dayInWeek: todayDate,
          tableRow: rowCount,
        })
        if (todayDate === 6) {
          todayDate = 0;
        } else {
          todayDate++;
        }
      }
      monthArr.push(newArr);
    }

    this.setState({
      day: monthArr,
    })
  }

  render() {
    // console.log(dayjs(`${dayjs().year()}-07-05`).$W);
    let month = this.month[this.state.selectedMonth];
    console.log(this.state.selectedMonth);
    return (
      <Paper>
        <h3>{this.month[this.state.selectedMonth]}</h3>
        {console.log(this.month[this.state.selectedMonth])}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {this.weekDays.map(day => {
                  return (
                    <TableCell>{day}</TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {

              }
              {this.state.day.map((montharr, i) => {
                // console.log(montharr[0].month);
                if(montharr[0].month === month)
                return (
                  <>
                    <Day
                      day={montharr}
                      key={i}
                    />
                  </>
                )
              })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={this.incrementSelectedMonth}>></Button>
      </Paper>
    )
  }
}



export default Calendar;