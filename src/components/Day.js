import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

class Day extends React.Component {
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
    // console.log(groups);
    groups = groups.map((week, i) => {
      if(week.length < 7){
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
    let renderRows = groups.map((row, i) => {
      return (
        <TableRow key={i}>
          {
            row.map((day, j) => {
              return <TableCell key={j}>{day.day}</TableCell>
            })
          }
        </TableRow>
      )
    });
    return renderRows;
  }

  render() {
    // console.log(this.props.day);
    let numberOfRows = this.getRows();
    let groups = this.organizeByTableRow();
    // this.renderDaysByRow(groups);
    // let monthStart = this.props.day[0].dayInWeek;
    let renderRows = numberOfRows.map((elem, i) => {
      return (
        <TableRow>
          {this.props.day.map((day, i) => {
            return (
              <TableCell>{i}</TableCell>
            )
          })}
        </TableRow>
      )
    })

    return (
      <>
        {this.renderDaysByRow(groups)}
      </>
    )
  }
}

export default Day;