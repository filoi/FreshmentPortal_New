import React, { Component } from 'react'
import "antd/dist/antd.css";
import withAuth from '../../components/withAuth';
import AuthService from '../../components/AuthService';
import RequestHandle from '../../components/RequestHandle';
import IconButton from '@material-ui/core/IconButton';
import FileIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import createHistory from 'history/createBrowserHistory'
import { Card, CardBody, Progress, Button, CardTitle, CardText } from 'reactstrap';

const history = createHistory();
const Auth = new AuthService();
const Request = new RequestHandle();

  export default class University extends withAuth(Component) {
    constructor(props) {
      super(props);
      this.state = {
        dataSource: [],
        statusCount: {},
        notifications: []   
      }
      this.printData = this.printData.bind(this);
      this.getNotificationData = this.getNotificationData.bind(this);
    }

    componentDidMount = () => {
      Request.RequestHandle('employer/dashboard/page','GET',null,this.printData); 
      Request.RequestHandle('employer/notification/all','GET',null,this.getNotificationData); 
    }

    printData(Result){

      if(Result.status){
        var statusCount = {};
        Result.data.results.map(item => { 
          statusCount[item.status] = item.total;
        });
        this.setState({ statusCount });
      }

    }

    getNotificationData(Result){

      if(Result.status){
        var notifications = [];
        Result.data.results.map(item => { 
          notifications.push(item);
        });
        this.setState({ notifications });
      }

    }

  render() { 
    var notificationTrs  = this.state.notifications.map(function(noti){
      if(noti.stu_doc.length === 0){
        noti.stu_doc[0] = ''
      }
      if(noti.vacancy_doc.length === 0){
        noti.vacancy_doc[0] = ''
      }
      return <tr><td><a href={"#/vacancy/view/" + noti.vacancy_doc[0]._id}><b>{noti.vacancy_doc[0].job_title} - { noti.msg } </b> {"| Student: " + noti.stu_doc[0].fname + " " + noti.stu_doc[0].lname + " | Date: " + noti.date.split("T")[0]}</a></td></tr>;
    });
    
    return (
      <div className="animated fadeIn">
       <div className="title-bar" id="title-cont">
                Dashboard & Notifications
        </div>
        <div class="row" style={{margin:"20px 10px", background: "#fff", padding: "20px"}}>
          <div class="col-md-8">
              <table class="table table-condensed table-hover table-striped">
                <thead>
                  <tr>
                      <th>Notifications</th>
                  </tr>
                </thead>
                <tbody>
                  {notificationTrs}
                </tbody>
              </table>
          </div>

          <div class="col-md-4 col-sm-12">
            <div class="row">
              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#31B338"}}>
                  <h1>{this.state.statusCount["1"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><a className="title-link" href="#/vacancy">Pending Interview Invitations</a></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#31B38F"}}>
                  <h1>{this.state.statusCount["2"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><a className="title-link" href="#/vacancy">Accepted Invitations</a></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#3191B3"}}>
                  <h1>{this.state.statusCount["3"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><a className="title-link" href="#/vacancy">Rejected Invitations</a></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#4931B3"}}>
                  <h1>{this.state.statusCount["4"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><a className="title-link" href="#/vacancy">Interview Rejections</a></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#7831B3"}}>
                  <h1>{this.state.statusCount["5"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><a className="title-link" href="#/vacancy">Pending Offer Invitations</a></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#B33176"}}>
                  <h1>{this.state.statusCount["6"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><a className="title-link" href="#/vacancy">Rejected Offers</a></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#B33D31"}}>
                  <h1>{this.state.statusCount["7"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><a className="title-link" href="#/vacancy">Given Offers</a></h4> 
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#B37031"}}>
                  <h1>{(this.state.statusCount["1"] || 0) + (this.state.statusCount["2"] || 0) + (this.state.statusCount["3"] || 0) + (this.state.statusCount["4"] || 0) + (this.state.statusCount["5"] || 0) + (this.state.statusCount["6"] || 0) + (this.state.statusCount["7"] || 0)}</h1>
                  <div class="container">
                    <h4 class="title"><a className="title-link" href="#/vacancy">Total</a></h4> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    )
  }
}
