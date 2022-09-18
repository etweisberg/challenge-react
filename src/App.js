import { useState } from "react";
import "./App.css";
import Question from "./components/question.js";
import data from "./data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

const questions = data.questions;
const resultMap = {};
Object.keys(questions[0].options).forEach(
  (o, i) => (resultMap[o] = data.results[i])
);

function App() {
  const [answers, setAnswers] = useState([]);
  const [validated, setValidated] = useState(false);

  const getResult = (answers) => {
    var modeMap = {};
    var maxEl = answers[0],
      maxCount = 1;
    for (var i = 0; i < answers.length; i++) {
      var el = answers[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return resultMap[maxEl];
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    } else {
      event.preventDefault();

      const results = [];
      questions.forEach((q) => {
        Object.keys(q.options).forEach((o, i) => {
          if (form.elements[q.prompt][i].checked) {
            results.push(o);
          }
        });
      });

      setAnswers(results);
    }
    setValidated(true);
  };
  if (answers.length === 0) {
    return (
      <Container>
        <h2 style={{ textAlign: "center" }}>
          Quiz: Do Your Parents Miss You or Do They Just Feel Obligated to Talk
          to You?
        </h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {questions.map((q, i) => (
            <Form.Group key={i} className="mb-3" controlId="questionForm">
              <Question key={i} prompt={q.prompt} options={q.options} />
            </Form.Group>
          ))}
          <Row>
            <Col className="text-center">
              <Button size="lg" variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="text-center" style={{ color: "gray" }}>
              Made by Ethan Weisberg
            </Col>
          </Row>
        </Form>
      </Container>
    );
  } else {
    return (
      <Container>
        <Modal
          show={true}
          onHide={() => {
            setAnswers([]);
            setValidated(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>{getResult(answers)}</Modal.Body>
        </Modal>

        {/* {getResult(answers)}

        <Row>
          <Col className="text-center">
            <Button
              size="lg"
              variant="primary"
              onClick={() => {
                setAnswers([]);
                setValidated(false);
              }}
            >
              Go Back
            </Button>
          </Col>
        </Row> */}
      </Container>
    );
  }
}

export default App;
