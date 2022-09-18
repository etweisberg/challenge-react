import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function Question(props) {
  const answerLetters = Object.keys(props.options);
  return (
    <Card>
      <Card.Header>{props.prompt}</Card.Header>
      <Card.Body>
        {answerLetters.map((l, i) => (
          <Form.Check
            required
            key = {i}
            name= {props.prompt}
            type="radio"
            id="default-radio"
            label={`${l}: ${props.options[l]}`}
          />
        ))}
      </Card.Body>
    </Card>
  );
}

export default Question;
