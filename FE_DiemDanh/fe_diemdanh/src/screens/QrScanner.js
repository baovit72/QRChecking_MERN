import React, { Component } from "react";
import QrReader from "react-qr-reader";
import CheckinTable from './CheckinTable' 
const axios = require("axios").default;
const axiosDiemDanh = axios.create({
  baseURL: "http://localhost:2212/api/"
});
class QrScanner extends Component {
  state = {
    result: "No result",
    current_user: {},
    checkins: []
  };
  getUserInfo = async _id => {
    await axiosDiemDanh
      .get(`/user/${_id}`)
      .then(res => {
        console.log(res);
        if (res.data.success) {
          this.setState({ current_user: res.data.data });
        } else this.setState({ current_user: {} });
      })
      .catch(err => console.log(err));
  };
  createCheckin = async _user_id => {
    await axiosDiemDanh
      .post("/checkin", { user_id: _user_id })
      .then(res => {
        if (res.data.success) {
          this.getCheckins();
        }
      })
      .catch(err => console.log(err));
  };
  getCheckins = async () => {
    await axiosDiemDanh
      .get("/checkins")
      .then(res => {
        console.log(res);
        this.setState({ checkins: res.data.data });
      })
      .catch(err => console.log(err));
  };
  handleScan = data => { 
    if (data) {
      this.getUserInfo(data);
      this.createCheckin(data);
      this.setState({
        result: data
      });
    }
  };
  handleError = err => {
    console.error(err);
  };
  componentDidMount(){
    this.getCheckins();
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <QrReader
          delay={5000}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "20%", height: "20%" }}
        />
        <p>{this.state.result}</p>
        <p>{this.state.current_user.name}</p>
        <CheckinTable checkins = {this.state.checkins}/>
      </div>
    );
  }
}
export default QrScanner;
