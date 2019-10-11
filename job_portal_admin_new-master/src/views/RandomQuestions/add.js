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
    FormFeedback
  } from 'reactstrap';
import createHistory from 'history/createBrowserHistory';
import Button from '@material-ui/core/Button';
import RequestHandle from '../../components/RequestHandle';
import swal from 'sweetalert';
import Select from 'react-select';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Add';
const Request = new RequestHandle();
  
  const history = createHistory();
  const ColoredLine = ({ color }) => (
    <hr
        style={{ 
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
  );
  
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
          duration:'',
          description:'',      
          status:'active',  
          specialization:'', 
          selectedOption: null,
          selectedArry:[],
          spOptions:[],
          question:'',
          category:'',
          check_answer0:false,
          check_answer1:false,        
          check_answer2:false,        
          check_answer3:false,        
          check_answer4:false,
          answer:[], 
          currect_answer:[],       
          answerCount:2
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.answerCheck = this.answerCheck.bind(this);
        this.onChangeAnswer = this.onChangeAnswer.bind(this);
        this.plusInput = this.plusInput.bind(this);
      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
       
      }

      onChangeAnswer(e){
        let name = e.target.name;
        let value = e.target.value;
        let answer = this.state.answer;
        let currect_answer = this.state.currect_answer;
        answer[name] = value;

        if (value === "" || value ===undefined || value ===null) {
          answer[name] = "";
          currect_answer[name] =""
        }

        if (currect_answer[name] === undefined || currect_answer[name] ==="" || currect_answer[name] ===null) {
          currect_answer[name] =""
        }else{
          currect_answer[name] =value
        }
     
        this.setState({answer});
        this.setState({currect_answer});
      }

      answerCheck(e,id){
       
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let currect_answer = this.state.currect_answer;
        if(value && this.state.answer[id] !== undefined && this.state.answer[id] !== ""){
          currect_answer[id]=this.state.answer[id]; 
        }else{
          currect_answer[id] = "";
          //delete currect_answer[]
        }
        this.setState({currect_answer});
      
        this.setState({
          [name]: value
        });
      }


    

      handleSubmit(event) {
        event.preventDefault();
        let answer = this.state.answer;
        let currect_answer = this.state.currect_answer;
        let submit_answer = "";
        let submit_currect_answer = "";
        for (let index = 0; index < this.state.answerCount; index++) {
          let sitex = "&&";
          if (index === this.state.answerCount-1) {
            sitex  ="";
          }

          if (answer[index] === undefined || answer[index] ==="" || answer[index] ===null) {
           
          }else{
            submit_answer = submit_answer+answer[index]+sitex;
          }

          if (currect_answer[index] === undefined || currect_answer[index] ==="" || currect_answer[index] ===null) {
           
          }else{
            submit_currect_answer = submit_currect_answer+currect_answer[index]+sitex;
          }
          
        }

      
        const universityData ={
          question:this.state.question,
          topic:this.state.category,
          ans:submit_answer,        
          correct_ans:submit_currect_answer        
        
          }
       
      
        Request.RequestHandle('question','POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
     
        if(Result.status){
            swal("Success!", "Your information has been submitted.", "success");
            window.location.assign("/#/questions");

        }else{
            this.setState({alerttext:Result.msg,visible:true})
        }
       }
     
 

    resetForm(){
        this.setState({
            name:'',
            code:'',
            duration:'',
            marking_criteria:'',
            academic_term:'',
            description:'',      
            status:'active',
        })

    }

    plusInput(){
      let answerCount = this.state.answerCount+1;
      this.setState({answerCount})
      
    }

  render() {
    const {alerttext} = this.state;
    const { selectedOption } = this.state;

    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Add Random Question
              </div>
          <Row >
          <Col>
          <Card>
          
          <Form  ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                
                <CardBody>
                  <Alert className="alert alert-danger" isOpen={this.state.visible} >
                   {alerttext}
                  </Alert>
                  <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Topic:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select"  name="category" defaultValue="" value={this.state.category} onChange ={this.onChange} placeholder="Topic">
                        <option value="" disabled>Select One</option>
                        <option value="sample topic 1">sample topic 1</option>
                        <option value="sample topic 2">sample topic 2</option>
                        <option value="sample topic 3">sample topic 3</option>
                        </Input>
                      </Col>
                    </FormGroup>     
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Question:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="question" name="question" value={this.state.question} onChange ={this.onChange}  placeholder="Question"  />
                      </Col>
                    </FormGroup>
                    {this.state.answerCount >= 1 &&
                      <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Answers:*</Label>
                      </Col>
                      <Col xs="11" md="8">
                        <Input type="textarea"   name="0" value={this.state.answer[0]} onChange ={this.onChangeAnswer} placeholder="Answer" />
                      </Col>
                      <Col xs="1" md="1">
                      <Label check>
                        <Input type="checkbox" onChange={(e) => this.answerCheck(e,0)} name="check_answer0" checked={this.state.check_answer0} />
                      </Label>
                      </Col>
                    </FormGroup>
                    }
                    {this.state.answerCount >= 2 &&
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input"></Label>
                      </Col>
                      <Col xs="11" md="8">
                        <Input type="textarea"   name="1" value={this.state.answer[1]} onChange ={this.onChangeAnswer} placeholder="Answer" />
                      </Col>
                      <Col xs="1" md="1">
                      <Label check>
                        <Input type="checkbox" onChange={(e) => this.answerCheck(e,1)} name="check_answer1" checked={this.state.check_answer1} />
                      </Label>
                      </Col>
                    </FormGroup>
                    }
                    {this.state.answerCount >= 3 &&
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input"></Label>
                      </Col>
                      <Col xs="11" md="8">
                        <Input type="textarea"   name="2" value={this.state.answer[2]} onChange ={this.onChangeAnswer} placeholder="Answer" />
                      </Col>
                      <Col xs="1" md="1">
                      <Label check>
                        <Input type="checkbox" onChange={(e) => this.answerCheck(e,2)} name="check_answer2" checked={this.state.check_answer2} />
                      </Label>
                      </Col>
                    </FormGroup>
                    }
                    {this.state.answerCount >= 4 &&
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input"></Label>
                      </Col>
                      <Col xs="11" md="8">
                        <Input type="textarea"   name="3" value={this.state.answer[3]} onChange ={this.onChangeAnswer} placeholder="Answer" />
                      </Col>
                      <Col xs="1" md="1">
                      <Label check>
                        <Input type="checkbox" onChange={(e) => this.answerCheck(e,3)} name="check_answer3" checked={this.state.check_answer3} />
                      </Label>
                      </Col>
                    </FormGroup>
                    }
                    {this.state.answerCount >= 5 &&
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input"></Label>
                      </Col>
                      <Col xs="11" md="8">
                        <Input type="textarea"   name="4" value={this.state.answer[4]} onChange ={this.onChangeAnswer} placeholder="Answer" />
                      </Col>
                      <Col xs="1" md="1">
                      <Label check>
                        <Input type="checkbox" onChange={(e) => this.answerCheck(e,4)} name="check_answer4" checked={this.state.check_answer4} />
                      </Label>
                      </Col>
                    </FormGroup>
                    }
                    <FormGroup row>
                      <Col xs="11" md="11">
                      <Button variant="contained" color="default" className=" rightbtn" onClick={()=>{this.plusInput()}} >
                        <DeleteIcon  />
                      </Button>
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
