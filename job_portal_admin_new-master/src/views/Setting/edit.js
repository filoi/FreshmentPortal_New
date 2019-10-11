import React, { Component } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Col, 
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Alert,
  } from 'reactstrap';
import createHistory from 'history/createBrowserHistory';
import Button from '@material-ui/core/Button';
import RequestHandle from '../../components/RequestHandle';
import swal from 'sweetalert'
const Request = new RequestHandle();
const history = createHistory();
 
export default class add extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapse: true,
          fadeIn: true,
          timeout: 300,
          formdata:'',
          visible: false,
          alerttext:'',
          name:'',
          key:'',
          value:'',
          code:'',
          status:'active',     
          description:'' 

        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.getData = this.getData.bind(this);
        //this.onDismiss = this.onDismiss.bind(this);
      }

      componentDidMount = () => {
        Request.RequestHandle('keyvalue/'+this.props.match.params.id,'GET',null,this.getData); 
      }

      getData(result){
       
        if(result.status){
         
          var data = result.data.results[0];
          if(data.key === "send_mail_password"){
            data.value = "********";
          }

          // if(data.key === "send_mail_host"){
          //   data.value = "********";
          // }

          this.setState({
          name : data.name,
          value : data.value,
          key : data.key,
          });
        }
      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        const universityData ={
          value : this.state.value
          }
        
        Request.RequestHandle('keyvalue/'+this.props.match.params.id,'POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){

        if(Result.status){
            swal("Success!", "Your information has been submitted.", "success");
            window.location.assign("/#/setting");
        }else{
            this.setState({alerttext:Result.msg,visible:true})
        }
       }
     
    // validation(){
    //     var x = true;
    //     if(this.state.name ==""){
    //         x= false;
    //     }
    //     if(this.state.email ==""){
    //         x= false;
    //     }
    //     if(this.state.contact_no ==""){
    //         x= false;
    //     }
    //     if(this.state.website ==""){
    //         x= false;
    //     }
    //     if(this.state.year ==""){
    //         x= false;
    //     }
    //     return x;
    // }

    resetForm(){
        this.setState({
            question : '',
        })

    }

    

  render() {
    const {alerttext} = this.state;
    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Setting
              </div>
          <Row >
          <Col>
          <Card>
          
          <Form  ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                
                <CardBody>
                   <Alert color="light" isOpen={this.state.visible} >
                   {alerttext}
                  </Alert>
                  
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Name</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.name}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Value</Label>
                      </Col>
                      <Col xs="12" md="9">
                      {this.state.key === 'page_limit' || this.state.key ==='question_limit' ?
                        <Input type="number" id="value" name="value" value={this.state.value} onChange ={this.onChange}  placeholder="Question"  />
                        :
                        <Input type="text" id="value" name="value" value={this.state.value} onChange ={this.onChange}  placeholder="Question"  />
                       }

                      </Col>
                    </FormGroup>
                </CardBody>
                <CardFooter>
                      <Button type="reset" variant="contained" color="secondary" className="left-margin" onClick={()=>{this.resetForm()}}  >Reset</Button>
                      <Button type="submit" variant="contained" color="primary" className="left-margin rightbtn"  >Save</Button>
                      <Button type="button" variant="contained"  className="left-margin rightbtn" onClick={()=>{history.goBack()}}  >Cancel</Button>
  
                </CardFooter>
                </Form>
              </Card>
              </Col>
          </Row>
          <div>
        </div>
        </div>
    )
  }
}
