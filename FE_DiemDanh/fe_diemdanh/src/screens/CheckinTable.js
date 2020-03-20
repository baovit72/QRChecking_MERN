import React, { Component } from "react";

class CheckinTable extends Component {
  render() {
    const checkins = this.props.checkins;
    const checkin_rows = checkins.map((checkin, index) => (
      <tr>
        <th scope="row">{index}</th>
        <td>{checkin.user_id}</td>
        <td>{checkin.status}</td>
        <td>{checkin.createdAt}</td>
      </tr>
    ));
    return (
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Status</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>{checkin_rows}</tbody>
      </table>
    );
  }
}

export default CheckinTable;