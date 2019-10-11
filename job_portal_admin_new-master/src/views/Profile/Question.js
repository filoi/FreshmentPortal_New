import React from 'react'
import {Card,CardBody,CardFooter,CardTitle,CardText,Col,Form,FormGroup,Input,Label,Row,Alert,ListGroup, ListGroupItem} from "reactstrap";
import Button from '@material-ui/core/Button';

const Question = ({
  question,
  index,
  onAnswerSelected,
  onSubmit,
  lastIndex,
  onPreview
}) => {
  return (
    <div>
    <hr/>
      <h3>{question.question}</h3>
      <ol type="a">
      {question.answer1 !=="" &&
      <li key={`${index}-1`}>
          <input type="checkbox" name={`${index}-check_answer1`} id={`question_${index}_answer_1`}  value={question.check_answer1} onChange={onAnswerSelected} />
          {' '}
          <label htmlFor={`question_${index}_answer_1`}>{question.answer1}</label>
      </li>
      }
      {question.answer2 !=="" &&        
        <li key={`${index}-2`}>
          <input type="checkbox" name={`${index}-check_answer2`} id={`question_${index}_answer_2`}  value={question.check_answer2} onChange={onAnswerSelected} />
          {' '}
          <label htmlFor={`question_${index}_answer_2`}>{question.answer2}</label>
        </li>
      }
      {question.answer3 !=="" &&
        <li key={`${index}-3`}>
          <input type="checkbox" name={`${index}-check_answer3`} id={`question_${index}_answer_3`}  value={question.check_answer3} onChange={onAnswerSelected} />
          {' '}
          <label htmlFor={`question_${index}_answer_3`}>{question.answer3}</label>
        </li>
      }
      {question.answer4 !=="" &&
        <li key={`${index}-4`}>
          <input type="checkbox" name={`${index}-check_answer4`} id={`question_${index}_answer_4`}  value={question.check_answer4} onChange={onAnswerSelected} />
          {' '}
          <label htmlFor={`question_${index}_answer_4`}>{question.answer4}</label>
        </li>
      }
      {question.answer5 !=="" &&
        <li key={`${index}-5`}>
          <input type="checkbox" name={`${index}-check_answer5`} id={`question_${index}_answer_5`}  value={question.check_answer5} onChange={onAnswerSelected} />
          {' '}
          <label htmlFor={`question_${index}_answer_5`}>{question.answer5}</label>
        </li>
      }
      {question.answer6 !=="" &&
        <li key={`${index}-6`}>
          <input type="checkbox" name={`${index}-check_answer6`} id={`question_${index}_answer_6`}  value={question.check_answer6} onChange={onAnswerSelected} />
          {' '}
          <label htmlFor={`question_${index}_answer_4`}>{question.answer6}</label>
        </li>
      }
      </ol>
    <hr/>
    <Button type="submit" variant="contained" color="secondary" className="left-margin" onClick={onPreview}  > Preview</Button>
    {lastIndex ===true ?
    <Button type="submit" variant="contained" color="primary" className="left-margin rightbtn"  onClick={onSubmit}  >Submit</Button>
    :
    <Button type="submit" variant="contained" color="primary" className="left-margin rightbtn"  onClick={onSubmit}  >Next</Button>
    }
    </div>
  )
}

export default Question