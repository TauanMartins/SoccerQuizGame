import React, { Fragment, useEffect, useState, useRef } from "react";
import './game.css';
import { Row, Col, Card, CardTitle, CardText, Button, Label } from "reactstrap";
import Timer from "../../components/Timer";
import Question from "../../components/Question";
import api from "../../services/api";
import loading from "../../assets/loading.gif";
import Endgame from "../../components/Endgame";

export default function Game() {
    const [question, setQuestion] = useState(1);
    const [validate, setValidate] = useState(false);

    const [selectedPlayer, setSelectedPlayer] = useState([{ name: '' }]);
    const [selectedPlayerIMG, setSelectedPlayerIMG] = useState(undefined);

    const [correctAnswer, setCorrectAnswer] = useState();
    const [answers, setAnswers] = useState([]);

    const [score, setScore] = useState(0);


    const rawParameters = ['height', 'weight', 'birthDate', 'age', 'nation', 'foot', 'position', 'defending', 'dribbling']
    const rawQuestions = {
        height: 'Qual é sua altura em cm?',
        weight: 'Qual seu peso médio em kg?',
        birthDate: 'Qual sua data de nascimento?',
        age: 'Qual sua idade?',
        nation: 'Por qual seleção o jogador atua?',
        foot: 'Qual seu pé dominante?',
        position: 'Em que posição joga no campo?',
        defending: 'Qual dos atributos o jogador tem mais destaque: Defesa ou Drible?',
        dribbling: 'Qual dos atributos o jogador tem mais destaque: Defesa ou Drible?'
    }

    var totalPages = 811;
    var currentPage = getRandomInt(1, totalPages)

    const CounterRef = useRef(null);
    const QuestionRef = useRef(null);
    const EndgameRef = useRef(null);

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
        QuestionRef.current.setList(json);

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
                document.getElementById(question).style.backgroundColor = 'green'
                return setScore(score + 1)
            }else{
                document.getElementById(question).style.backgroundColor = 'red'
            }
        } else if (!validate) {
            if (String(value) === String(correctAnswer)) {
                document.getElementById(question).style.backgroundColor = 'green'
                return setScore(score + 1)
            }else{
                document.getElementById(question).style.backgroundColor = 'red'
            }
        }
    }

    function nextQuestion() {
        console.log("nextQuestion");
        document.getElementById('img').src = loading;
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
        EndgameRef.current.endgame(score)
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
                                            <Col>
                                                <b>Questão {question}/10</b>
                                            </Col>
                                            <Col>
                                                <Col>
                                                    <Row>
                                                        <Col>
                                                            <b>Score: {score}</b>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                    <Row id='geral'>
                                                        <Col id="1">
                                                            1
                                                        </Col>
                                                        <Col id="2">
                                                            2
                                                        </Col>
                                                        <Col id="3">
                                                            3
                                                        </Col>
                                                        <Col id="4">
                                                            4
                                                        </Col>
                                                        <Col id="5">
                                                            5
                                                        </Col>
                                                        <Col id="6">
                                                            6
                                                        </Col>
                                                        <Col id="7">
                                                            7
                                                        </Col>
                                                        <Col id="8">
                                                            8
                                                        </Col>
                                                        <Col id="9">
                                                            9
                                                        </Col>
                                                        <Col id="10">
                                                            10
                                                        </Col>
                                                    </Row>
                                                </Col>
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
                                        <img className='img' id="img" alt={`Jogador ${selectedPlayer.name}`} src={selectedPlayerIMG === undefined ? loading : selectedPlayerIMG} />
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
            <Endgame ref={EndgameRef} />
        </Fragment >

    )
}

