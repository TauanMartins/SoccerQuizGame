import React, { Fragment, useEffect, useState, useRef } from "react";
import './game2.css';
import { Row, Col, Card, CardTitle, CardText, Button, Label } from "reactstrap";
import Timer from "../../components/Timer";
import api from "../../services/api";
import loading from "../../assets/loading.gif";
import Endgame from "../../components/Endgame";
import { countries } from "../../components/Countries";

export default function Game2() {
    const [question, setQuestion] = useState(1);
    const [validate, setValidate] = useState(false);


    const [correctAnswer, setCorrectAnswer] = useState();
    const [answers, setAnswers] = useState([]);

    const [score, setScore] = useState(0);

    const rawQuestions = { nationFlag: 'A que nação ela pertence pertence?' }

    var totalPages = 8;
    var totalNations = 20;
    var nation;
    var nations = countries;
    var nationsShuffled = shuffleArray(nations)
    function shuffleArray(arr) {
        // Loop em todos os elementos
        for (let i = arr.length - 1; i > 0; i--) {
            // Escolhendo elemento aleatório
            const j = Math.floor(Math.random() * (i + 1));
            // Reposicionando elemento
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        // Retornando array com aleatoriedade
        return arr;
    }
    const CounterRef = useRef(null);
    const EndgameRef = useRef(null);

    async function getCountriesName(page) {
        const response = await api.get(`https://futdb.app/api/nations?page=${page}`).then(value => {
            const json = value;
            var idnation = getRandomInt(1, totalNations);
            nation = json.data.items[idnation]
            setCorrectAnswer(nation.name)
            setAnswers(shuffleArray([nation.name, String(nationsShuffled[83]) === String(nation.name) ? nationsShuffled[84] : nationsShuffled[83]]))
            async function getFlag(id) {
                const response = await fetch(`https://futdb.app/api/nations/${id}/image`, {
                    headers: {
                        'Content-Type': 'image/png',
                        "x-auth-token": '4c79e552-34cb-44cc-bcc7-518299c8e98a'
                    }
                });
                const imageBlob = await response.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                document.getElementById('img2').style.height = '90px';
                document.getElementById('img2').src = imageObjectURL;
            }
            getFlag(nation.id)
        })
        return response;
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
            document.getElementById(question).style.backgroundColor = 'red'
            return nextQuestion();
        }
    }

    function evaluator(value) {
        if (question === 10 && !validate) {
            if (String(value) === String(correctAnswer)) {
                document.getElementById(question).style.backgroundColor = 'green'
                return setScore(score + 1)
            } else {
                document.getElementById(question).style.backgroundColor = 'red'
            }
        } else if (!validate) {
            if (String(value) === String(correctAnswer)) {
                document.getElementById(question).style.backgroundColor = 'green'
                return setScore(score + 1)
            } else {
                document.getElementById(question).style.backgroundColor = 'red'
            }
        }
    }

    function nextQuestion() {
        console.log("nextQuestion");
        document.getElementById('img2').src = loading;
        document.getElementById('img2').style.height = '160px';
        if (question !== 10) {
            setQuestion(question + 1);
            let page = getRandomInt(1, totalPages);
            getCountriesName(page)
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
        let page = getRandomInt(1, totalPages);
        getCountriesName(page)
    }, [])

    return (
        <Fragment>
            <div className="Game2">

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
                                                        <Col>
                                                            <Row>
                                                                <Col className="coluna" id="1">
                                                                    1
                                                                </Col>
                                                                <Col className="coluna" id="2">
                                                                    2
                                                                </Col>
                                                                <Col className="coluna" id="3">
                                                                    3
                                                                </Col>
                                                                <Col className="coluna" id="4">
                                                                    4
                                                                </Col>
                                                                <Col className="coluna" id="5">
                                                                    5
                                                                </Col>
                                                                <Col className="coluna" id="6">
                                                                    6
                                                                </Col>
                                                                <Col className="coluna" id="7">
                                                                    7
                                                                </Col>
                                                                <Col className="coluna" id="8">
                                                                    8
                                                                </Col>
                                                                <Col className="coluna" id="9">
                                                                    9
                                                                </Col>
                                                                <Col className="coluna" id="10">
                                                                    10
                                                                </Col>
                                                            </Row>
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
                                                    <b>Sobre a bandeira abaixo </b>
                                                </Label>
                                            </Col>
                                        </Row>
                                        <img className='img2' id="img2" alt={`Bandeira do país achou q eu ia dizer né`} src={loading} />
                                        <Row>
                                            <Col>
                                                <Label>{rawQuestions.nationFlag}</Label>
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

