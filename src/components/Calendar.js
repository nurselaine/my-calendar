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
      monthsInYear: this.month,
      // days: Array(this.state.daysInMonth), 
      day: [],
    }
  }

  componentDidMount() {
    this.state.monthsInYear.map((month, i) => this.formatData(this.state.monthsInYear.indexOf(month), i))
  }

  formatData = () => {
    this.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December']
    let monthArr = [];

    for(let i = 0; i < this.month.length; i++){
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
        if(todayDate === 6){
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
    console.log(this.state.day);
    // console.log(dayjs(`${dayjs().year()}-07-05`).$W);
    return (
      <TableContainer>
        <Table>
          <TableBody>
            {this.state.day.map((montharr, i) =>{
              return (
                <Day
                  day={montharr}
                />
              )
              })
            })}
            {/* <Day
              weekdayArr={this.weekDays}
              weekday={this.state.weekday}
              dayInMonth={this.state.dayInMonth}
              daysInMonth={this.state.daysInMonth}
              day={this.state.day}
            /> */}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}



export default Calendar;