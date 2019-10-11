import React, { Component } from 'react'
import "antd/dist/antd.css";
import withAuth from '../../components/withAuth';
import AuthService from '../../components/AuthService';
import RequestHandle from '../../components/RequestHandle';
// import IconButton from '@material-ui/core/IconButton';
// import FileIcon from '@material-ui/icons/Assignment';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import createHistory from 'history/createBrowserHistory'
// import { Card, CardBody, Progress, Button, CardTitle, CardText } from 'reactstrap';

// const history = createHistory();
// const Auth = new AuthService();
const Request = new RequestHandle();

  export default class University extends withAuth(Component) {
    constructor(props) {
      super(props);
      this.state = {
        dataSource: [],
        statusCount: {},
        notifications: [],
        employer:'',
        student:'',
        pending_approvels:''   
      }
      this.printData = this.printData.bind(this);
      this.getNotificationData = this.getNotificationData.bind(this);
    }

    componentDidMount = () => {
      Request.RequestHandle('users/dashboard/page','GET',null,this.printData); 
      Request.RequestHandle('users/notification/all','GET',null,this.getNotificationData); 
    }

    printData(Result){

      if(Result.status){
        var statusCount = {};
        Result.data.res.map(item => { 
          statusCount[item.status] = item.total;
          
        });
        
        this.setState({ statusCount });
        this.setState({ employer:Result.data.employer,student:Result.data.student,pending_approvels:Result.data.pending_approvels });
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
        <div className="row" style={{margin:"20px 10px", background: "#fff", padding: "20px"}}>
          <div className="col-md-8">
              <table className="table table-condensed table-hover table-striped">
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

          <div className="col-md-4 col-sm-12">
            <div className="row">

            <div className="col-sm-6">
                <div className="portal-card"  style={{background: "#B33D31"}}>
                  <h1>{this.state.employer || 0}</h1>
                  <div className="container">
                    <h4 className="title"><a className="title-link" href="#/employee">Employers</a></h4> 
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="portal-card"  style={{background: "#B37031"}}>
                  <h1>{(this.state.student || 0) }</h1>
                  <div className="container">
                    <h4 className="title"><a className="title-link" href="#/student">Students</a></h4> 
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="portal-card"  style={{background: "#E06B0A"}}>
                  <h1>{(this.state.pending_approvels || 0) }</h1>
                  <div className="container">
                    <h4 className="title"><a className="title-link" href="#/student?approvel=pending">Pending Approval</a></h4> 
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="portal-card"  style={{background: "#31B338"}}>
                  <h1>{this.state.statusCount["1"] || 0}</h1>
                  <div className="container">
                    <h4 className="title"><b>Pending Interview Invitations</b></h4> 
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="portal-card"  style={{background: "#31B38F"}}>
                  <h1>{this.state.statusCount["2"] || 0}</h1>
                  <div className="container">
                    <h4 className="title"><b>Accepted Invitations</b></h4> 
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="portal-card"  style={{background: "#3191B3"}}>
                  <h1>{this.state.statusCount["3"] || 0}</h1>
                  <div className="container">
                    <h4 className="title"><b>Rejected Invitations</b></h4> 
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="portal-card"  style={{background: "#4931B3"}}>
                  <h1>{this.state.statusCount["4"] || 0}</h1>
                  <div className="container">
                    <h4 className="title"><b>Interview Rejections</b></h4> 
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="portal-card"  style={{background: "#7831B3"}}>
                  <h1>{this.state.statusCount["5"] || 0}</h1>
                  <div className="container">
                    <h4 className="title"><b>Pending Offer Invitations</b></h4> 
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="portal-card"  style={{background: "#B33176"}}>
                  <h1>{this.state.statusCount["6"] || 0}</h1>
                  <div className="container">
                    <h4 className="title"><b>Rejected Offers</b></h4> 
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="portal-card"  style={{background: "#B33D31"}}>
                  <h1>{this.state.statusCount["7"] || 0}</h1>
                  <div className="container">
                    <h4 className="title"><b>Given Offers</b></h4> 
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="portal-card"  style={{background: "#B37031"}}>
                  <h1>{(this.state.statusCount["1"] || 0) + (this.state.statusCount["2"] || 0) + (this.state.statusCount["3"] || 0) + (this.state.statusCount["4"] || 0) + (this.state.statusCount["5"] || 0) + (this.state.statusCount["6"] || 0) + (this.state.statusCount["7"] || 0)}</h1>
                  <div className="container">
                    <h4 className="title"><b>Total</b></h4> 
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
