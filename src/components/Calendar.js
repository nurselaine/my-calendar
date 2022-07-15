import React from 'react';
import axios from 'axios';
import Day from './Day.js';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './Calendar.css';

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
      holidays: [],
      events: [],
    }
  }

  componentDidMount() {

    this.getRenderData();
    // const formatDay = this.state.monthsInYear.map((month, i) => this.formatData(this.state.monthsInYear.indexOf(month), i));
    // this.getHolidayData(formatDay[0]);
    // this.getEventData(formatDay[0]);
  }

  getRenderData = async () => {
    // Goal: Fetch data (holidays + events) + combine/merge data + format data
    // tldr: get data ready to be render

    // 1. Get holiday data
    const holidayData = await this.getHolidayData2();
    // 2. Get Event data
    const eventData = await this.getEventData2();
    // 3. 
    let formatDay = this.state.monthsInYear.map((month, i) => this.formatData(this.state.monthsInYear.indexOf(month), i));
    formatDay = formatDay[0];


    holidayData.forEach((holiday) => {
      // get month index
      const month = holiday.date.month;
      // get day index
      const day = holiday.date.day
      // test if month and day index equals correct holiday date
      const correctDate = formatDay[month - 1][day - 1];
      correctDate.event.push(holiday);
    }
    );


    eventData.forEach(event => {
      const month = this.month.indexOf(event.date.month);
      // console.log(month);

      const day = event.date.day;

      const correctDate = formatDay[month][day - 1];
      correctDate.event.push(event);
      // console.log(correctDate);
    })
    // console.log(formatDay);
    this.setState({
      day: formatDay,
    })

  }

  getHolidayData2 = async () => {
    try {
      let url = `${process.env.REACT_APP_URL}/holidays?country=US&year=2021`;
      // console.log(url);
      let holidays = await axios.get(url);
      holidays = holidays.data;
      return holidays;
    } catch (error) {
      console.log(error)
    }
  }

  getEventData2 = async () => {
    try {
      let url = `${process.env.REACT_APP_URL}/events/collection`;
      let event = await axios.get(url);
      event = event.data;
      event.map(event => {
        event.name = event.title;
      })
      return event;
    } catch (error) {
      console.log(error.message);
    }
  }

  // getEventData = async (formatDay) => {
  //   try {
  //     let newFormatDay = formatDay;
  //     let url = `${process.env.REACT_APP_URL}/events/collection`;
  //     let data = await axios.get(url);
  //     data = data.data;
  //     // console.log(newFormatDay[1])
  //     console.log(data);
  //     data.forEach(event => {
  //       let month = event.date.month;
  //       month = this.month.indexOf(month)
  //       const day = event.date.day;
  //       const correctDate = newFormatDay[month][day - 1];
  //       console.log(correctDate);
  //       correctDate.event.push(event);
  //     })
  //     // console.log(newFormatDay[1]);
  //     this.setState({
  //       events: data,
  //       day: newFormatDay,
  //     })
  //   } catch (error) {
  //     console.log(`oh snap! You ran into an error ${error.message}`);
  //   }
  // }

  // getNewEvent = (eventObj) => {
  //   this.setState({
  //     events: eventObj,
  //   })
  // }

  // getHolidayData = async (formatDay) => {
  //   let newFormatDay = formatDay;
  //   // console.log(formatDay[0])
  //   try {
  //     let url = `${process.env.REACT_APP_URL}/holidays?country=US&year=2021`;
  //     // console.log(url);
  //     let holidays = await axios.get(url);
  //     holidays = holidays.data;

  //     // merge holidays (12 days) with the format data (formatDay)

  //     holidays.forEach((holiday) => {
  //       // get month index
  //       const month = holiday.date.month;
  //       // get day index
  //       const day = holiday.date.day
  //       // test if month and day index equals correct holiday date
  //       const correctDate = newFormatDay[month - 1][day - 1];
  //       if (!correctDate.event.length) {
  //         correctDate.event.push(holiday);
  //       }
  //     })
  //     // console.log(holidays);
  //     this.setState({
  //       holidays: holidays,
  //       day: newFormatDay
  //     })
  //   } catch (error) {
  //     console.log('Oh snap! You got an error ' + error.message);
  //   }
  // }

  decrementSelectedMonth = () => {
    if (this.state.selectedMonth === 0) {
      this.setState({
        selectedMonth: 11,
      })
    } else {
      this.setState({
        selectedMonth: this.state.selectedMonth - 1,
      })
    }
  }

  incrementSelectedMonth = () => {
    if (this.state.selectedMonth === 11) {
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
          event: [],
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
    });

    return monthArr;
  }

  render() {
    // console.log(dayjs(`${dayjs().year()}-07-05`).$W);
    let month = this.month[this.state.selectedMonth];
    // console.log(this.state.selectedMonth);
    // console.log(this.state.holidays);
    // console.log(this.state.events);
    // console.log(this.state.day);
    return (
      <>
        <h3>{this.month[this.state.selectedMonth]}</h3>
        {/* {console.log(this.month[this.state.selectedMonth])} */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {this.weekDays.map((day, i) => {
                  return (
                    <TableCell key={i}>{day}</TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {

              }
              {this.state.day.map((montharr, i) => {
                // console.log(montharr[0].month);
                if (montharr[0].month === month)
                  return (
                    <>
                      <Day
                        month={this.month}
                        day={montharr}
                        holidays={this.state.holidays}
                        key={i}
                        updateEvents={this.getNewEvent}
                      />
                    </>
                  )
              })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div className='arrows'>
          <Button onClick={this.decrementSelectedMonth}><ChevronLeftIcon /></Button>
          <Button onClick={this.incrementSelectedMonth}><ChevronRightIcon /></Button>
        </div>
      </>
    )
  }
}



export default Calendar;