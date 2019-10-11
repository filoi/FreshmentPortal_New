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
import { Card, CardBody, Progress, Button, CardTitle, CardText,Row,Col } from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Modal from 'react-responsive-modal';
import Vacancy from "../StudentDashbord/Student_View_Vacancy_popup";
import {Table} from 'antd';
import "antd/dist/antd.css";
import Common from '../../components/Common';
import Tooltip from '@material-ui/core/Tooltip';

const CommonRequest = new Common();

const history = createHistory();
const Auth = new AuthService();
const Request = new RequestHandle();

const columns = [ {
  title: 'SIno',
  dataIndex: 'no',
  key: 'np',
  width: '5%',
}, {
  title: 'Designation',
  dataIndex: 'designation',
  key: 'designation',
},{
  title: 'Location',
  dataIndex: 'location',
  key: 'location',
}, {
  title: 'Employer',
  dataIndex: 'employer',
  key: 'employer',
  width: '15%',
}, {
  title: 'Max CTC •',
  dataIndex: 'ctc',
  key: 'ctc',
}, {
  title: 'Min CTC •',
  dataIndex: 'ctc2',
  key: 'ctc2',
}, {
  title: 'App Closing Date •',
  dataIndex: 'closing_date',
  key: 'closing_date',
}];


const columns1 = [ {
  title: 'SIno',
  dataIndex: 'no',
  key: 'np',
  width: '5%',
}, {
  title: 'Designation',
  dataIndex: 'designation',
  key: 'designation',
},{
  title: 'Location',
  dataIndex: 'location',
  key: 'location',
}, {
  title: 'Employer',
  dataIndex: 'employer',
  key: 'employer',
  width: '15%',
}, {
  title: 'Max CTC •',
  dataIndex: 'ctc',
  key: 'ctc',
},{
  title: 'Min CTC •',
  dataIndex: 'ctc2',
  key: 'ctc2',
}, {
  title: 'App Closing Date •',
  dataIndex: 'closing_date',
  key: 'closing_date',
}, {
  title: '',
  dataIndex: 'fave',
  key: 'fave',
}];


  export default class University extends withAuth(Component) {
    constructor(props) {
      super(props);
      this.state = {
        dataSource: [],
        dataSourceOpportunitie: [],
        statusCount: {},
        notifications: [] ,
        opportunities:[],
        tabIndex:0,
        openVacancy:false,
        vacancy_id:"" 
      }
      this.printData = this.printData.bind(this);
      this.getNotificationData = this.getNotificationData.bind(this);
      this.tagSelect = this.tagSelect.bind(this);
      this.interestVacancy = this.interestVacancy.bind(this);
      this.onCloseModal = this.onCloseModal.bind(this);
    }

    onCloseModal = () => {
      this.setState({ openVacancy:false});
    };

    viewAcceptStudent(id){
      this.setState({openVacancy:true,vacancy_id:id});
    //   this.props.history.push({
    //     pathname: '/Student/Vacancies/View/'+id,
    //  })
      }

    interestVacancy(vacancy,status){
   
      const quesData = {
        status:status
      }
      let that = this;
     Request.RequestHandle('students/interest/'+vacancy,'POST', JSON.stringify(quesData),function(result) {

        if(result.status){
          
          that.notificationData();
        }
     })
    }

    tagSelect(tagSelect) {
      this.setState({ tabIndex: tagSelect });
      if (tagSelect === 1) {
        this.setState({ footerButton: false });
      } else {
        this.setState({ footerButton: true });
      }
    }

    componentDidMount = () => {
      Request.RequestHandle('students/dashboard/page','GET',null,this.printData); 
      this.notificationData();
    }


    notificationData(){
      Request.RequestHandle('students/notification/all','GET',null,this.getNotificationData); 
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


    userExists(arr,id) {
      return arr.some(function(el) {
        return el.vacancy[0]._id === id;
      }); 
    }

    getNotificationData(Result){

      if(Result.status){
        var notifications = [];
        var opportunities = [];
        var dataSource = [];
        var i  = 0;
       
        Result.data.results.map(item => { 
          notifications.push(item);
          dataSource.push({
                    no:++i,
                    location:item.vacancy_doc[0].job_location,
                    employer:item.employer_doc[0].name,
                    closing_date:item.vacancy_doc[0].closing_date,
                    ctc:item.vacancy_doc[0].max_ctc,
                    ctc2:item.vacancy_doc[0].min_ctc,
                    designation:<a style={{color: "#000"}} href onClick={()=>{this.viewAcceptStudent(item.vacancy_doc[0]._id)}}>{item.vacancy_doc[0].job_title}</a>
                  })
        });

        this.setState({dataSource});
       let dataSourceOpportunitie = [];
      
        Result.data.vacancy.map(item => { 
        
          if(!this.userExists(opportunities,item.vacancy[0]._id)){

            var like = "fa fa-star fave-str ";
            var statuses = "active";
           
            if(item.is_like >= 1){
              like = 'fa fa-star star fave-str';
              statuses = "";
            }

            opportunities.push(item);
            dataSourceOpportunitie.push({
              no:++i,
              location:item.vacancy[0].job_location,
              ctc:item.vacancy[0].max_ctc,
              ctc2:item.vacancy[0].min_ctc,
              employer:item.employer[0].name,
              closing_date:item.vacancy[0].closing_date,
              designation:<a style={{color: "#000"}} href onClick={()=>{this.viewAcceptStudent(item.vacancy[0]._id)}}>{item.vacancy[0].job_title}</a>,
              fave:<Tooltip title="Click to Apply"><a href onClick={()=>{this.interestVacancy(item.vacancy[0]._id,statuses)}} className="fave"><span className={like}></span></a></Tooltip>
            })
          }
        });
        this.setState({dataSource});
        this.setState({dataSourceOpportunitie});

        this.setState({ notifications });
        this.setState({ opportunities });
      }

    }

  render() {
    var that = this;
    var notificationTrs  = this.state.notifications.map(function(noti){
      if(noti.employer_doc.length === 0){
        noti.employer_doc[0] = ''
      }
      if(noti.vacancy_doc.length === 0){
        noti.vacancy_doc[0] = ''
      }
      return <tr><td><a style={{color: "#000"}} href onClick={()=>{that.viewAcceptStudent(noti.vacancy_doc[0]._id)}}><b>  {noti.vacancy_doc[0].job_title} - { noti.msg } </b> {"| Employer: " + noti.employer_doc[0].name + " | Date: " + noti.date.split("T")[0]}</a></td></tr>;
    });

    var opportunitiesTrs  = this.state.opportunities.map(function(noti){
      
      if(noti.employer.length === 0){
        noti.employer[0] = ''
      }

      if(noti.vacancy.length === 0){
        noti.vacancy[0] = ''
      }
     
      var like = "fave-str icon-star";
      var statuses = "active";
     
      if(noti.is_like >= 1){
        like = 'star fave-str icon-star';
        statuses = "";
      }
      
      return <tr><td><a style={{color: "#000"}} href onClick={()=>{that.viewAcceptStudent(noti.vacancy[0]._id)}}><b>  {noti.vacancy[0].job_title} - { noti.vacancy[0].job_location } </b> {"| Employer: " + noti.employer[0].name + " | Application Closing Date: " + noti.vacancy[0].closing_date.split("T")[0]}</a> </td></tr>;
    });
    
    return (
      <div className="animated fadeIn">

      <Modal open={this.state.openVacancy} onClose={this.onCloseModal} center>
        <Row>
          <Col>
            <Card>
            <CardBody>
            <Vacancy id={this.state.vacancy_id}/>
           </CardBody>
            </Card>
          </Col>
        </Row>
        </Modal>


       <div className="title-bar" id="title-cont">
                Dashboard & Notifications
        </div>
        <div class="row" style={{margin:"20px 10px", background: "#fff", padding: "20px"}}>
          <div class="col-md-8">


          <Tabs
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => this.tagSelect(tabIndex)}
          >
            <TabList style={{marginBottom: "20px"}}>
            <Tab>Notifications ({notificationTrs.length})</Tab>
              <Tab>Opportunities ({opportunitiesTrs.length})</Tab>
            </TabList>
            <TabPanel>
            <Table
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                  />
            </TabPanel>
            <TabPanel>
            <Table
                    columns={columns1}
                    dataSource={this.state.dataSourceOpportunitie}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                  />
            </TabPanel>
            </Tabs>

             <p>• ;- These values are subject to change without notice/ intimation, as per the employer's discretion and business requirement</p>
          </div>

          <div class="col-md-4 col-sm-12">
            <div class="row">
              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#31B338"}}>
                  <h1>{this.state.statusCount["1"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><b>Pending Interview Invitations</b></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#31B38F"}}>
                  <h1>{this.state.statusCount["2"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><b>Accepted Invitations</b></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#3191B3"}}>
                  <h1>{this.state.statusCount["3"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><b>Rejected Invitations</b></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#4931B3"}}>
                  <h1>{this.state.statusCount["4"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><b>Interview Rejections</b></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#7831B3"}}>
                  <h1>{this.state.statusCount["5"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><b>Pending Offer Invitations</b></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#B33176"}}>
                  <h1>{this.state.statusCount["6"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><b>Rejected Offers</b></h4> 
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#B33D31"}}>
                  <h1>{this.state.statusCount["7"] || 0}</h1>
                  <div class="container">
                    <h4 class="title"><b>Given Offers</b></h4> 
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="portal-card"  style={{background: "#B37031"}}>
                  <h1>{(this.state.statusCount["1"] || 0) + (this.state.statusCount["2"] || 0) + (this.state.statusCount["3"] || 0) + (this.state.statusCount["4"] || 0) + (this.state.statusCount["5"] || 0) + (this.state.statusCount["6"] || 0) + (this.state.statusCount["7"] || 0)}</h1>
                  <div class="container">
                    <h4 class="title"><b>Total</b></h4> 
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
