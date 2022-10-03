import React, { Fragment, useEffect, useState, useRef } from "react";
import './game.css';
import { Row, Col, Card, CardTitle, CardText, Button, Label } from "reactstrap";
import Timer from "../../components/Timer";
import Question from "../../components/Question";
import api from "../../services/api";

export default function Game() {
    const [question, setQuestion] = useState(1);
    const [validate, setValidate] = useState(false);

    const [selectedPlayer, setSelectedPlayer] = useState([{ name: '' }]);
    const [selectedPlayerIMG, setSelectedPlayerIMG] = useState(undefined);

    const [correctAnswer, setCorrectAnswer] = useState();
    const [answers, setAnswers] = useState([]);

    const [score, setScore] = useState(0)


    const rawParameters = ['height', 'weight', 'birthDate', 'age', 'nation', 'foot', 'position']
    const rawQuestions = {
        height: 'Qual é sua altura em cm?',
        weight: 'Qual seu peso médio em kg?',
        birthDate: 'Qual sua data de nascimento?',
        age: 'Qual sua idade?',
        nation: 'Por qual seleção o jogador atua?',
        foot: 'Qual seu pé dominante?',
        position: 'Em que posição joga no campo?'
    }

    var totalPages = 811;
    var currentPage = getRandomInt(1, totalPages)

    const CounterRef = useRef(null);
    const QuestionRef = useRef(null);

    async function getImage(id) {
        const response = await fetch(`https://futdb.app/api/players/${id}/image`, {
            headers: {
                'Content-Type': 'image/png',
                "x-auth-token": '4c79e552-34cb-44cc-bcc7-518299c8e98a'
            }
        });
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setSelectedPlayerIMG(imageObjectURL)

    }
    async function getPlayers() {
        const response = await api.get("api/players", {
            params: {
                page: currentPage
            }
        });
        const json = await response.data.items;
        QuestionRef.current.setList(json)

    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function timeOut() {
        console.log("timeOut")
        if (question === 10) {
            return endgame();
        } else {
            return nextQuestion();
        }
    }

    function evaluator(value) {
        if (question === 10 && !validate) {
            if (String(value) === String(correctAnswer)) {
                return setScore(score + 1)
            }
        } else if (!validate) {
            if (String(value) === String(correctAnswer)) {
                return setScore(score + 1)
            }
        }
    }

    function nextQuestion() {
        console.log("nextQuestion");
        if (question !== 10) {
            setQuestion(question + 1);
            QuestionRef.current.nextQuestion();
            CounterRef.current.restartTimer();
        } else {
            setValidate(true);
            CounterRef.current.stopTimer();
            return endgame();
        }

    }

    function endgame() {
        console.log("endgame")
    }

    useEffect(() => {
        getPlayers()
    }, [])

    return (
        <Fragment>
            <div className="Game">
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Card>
                                    <CardTitle>
                                        <Row>
                                            <Col><b>Questão {question}/10</b></Col>
                                            <Col>
                                                <b>Score: {score}</b>
                                            </Col>
                                            <Col>
                                                <Timer timeOut={timeOut} ref={CounterRef} />
                                            </Col>
                                        </Row>
                                    </CardTitle>
                                    <CardText>
                                        <Row>
                                            <Col>
                                                <Label>
                                                    <b>Sobre o jogador {selectedPlayer.name} </b>
                                                </Label>
                                            </Col>
                                        </Row>
                                        <img className='img' id="img" alt={`Jogador ${selectedPlayer.name}`} src={selectedPlayerIMG} />
                                        <Row>
                                            <Col>
                                                <Question
                                                    player={dataPlayer => { setSelectedPlayer(dataPlayer); getImage(dataPlayer.id) }}
                                                    rawQuestions={rawQuestions}
                                                    rawParameters={rawParameters}
                                                    answersF={e => setAnswers(e)}
                                                    correctAnswerF={e => setCorrectAnswer(e)}
                                                    ref={QuestionRef} />
                                                <br />
                                            </Col>
                                        </Row>
                                    </CardText>
                                </Card>
                            </Col>
                        </Row>
                        {
                            answers.length === 0 ? '' :
                                <>
                                    <Row >
                                        <Col>
                                            <Row>
                                                <Button onClick={e => { evaluator(e.target.value); nextQuestion(answers[0]) }} value={answers[0]} key={answers[0]} className="Button" color="primary" >
                                                    {answers[0]}
                                                </Button>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Button onClick={e => { evaluator(e.target.value); nextQuestion(answers[1]) }} value={answers[1]} key={answers[1]} className="Button" color="success" >
                                                    {answers[1]}
                                                </Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {answers.length === 2 ? '' :
                                        <Row >
                                            <Col>
                                                <Row>
                                                    <Button onClick={e => { evaluator(e.target.value); nextQuestion(answers[2]) }} value={answers[2]} key={answers[2]} className="Button" color="warning" >
                                                        {answers[2]}
                                                    </Button>
                                                </Row>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <Button onClick={e => { evaluator(e.target.value); nextQuestion(answers[3]) }} value={answers[3]} key={answers[3]} className="Button" color="danger" >
                                                        {answers[3]}
                                                    </Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                    }
                                </>
                        }
                    </Col>
                </Row>
            </div >
        </Fragment >
    )
}

