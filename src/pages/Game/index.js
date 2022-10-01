import React, { Fragment, useEffect, useState, useRef } from "react";
import './game.css';
import { Row, Col, Card, CardTitle, CardText, Button, Label } from "reactstrap";
import Timer from "../../components/Timer";
import Question from "../../components/Question";

export default function Game() {
    const [question, setQuestion] = useState(1);
    const [players, setPlayers] = useState([{}]);
    const [selectedPlayer, setSelectedPlayer] = useState([{ name: '' }]);
    const [score, setScore] = useState(0)

    const Counter = useRef(null);

    function timeOut() {
        console.log("timeOut")
        if (question === 10) {
            return endgame();
        } else {
            return nextQuestion();
        }
    }

    function nextQuestion(value) {
        if(question===10){
            return endgame();
        }else{
            value = value?value:0;
            console.log("nextQuestion");
            setQuestion(question + 1);
            Counter.current.restartTimer();
            setScore(score+parseInt(value));
        }
        
    }

    function endgame() {
        console.log("endgame")
    }

    useEffect(() => {
    }, [])

    useEffect(() => {
        console.log(players);
        if(question>1000){
            setPlayers(true)
            setSelectedPlayer(true)
        }
    }, [question])
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
                                                <Timer timeOut={timeOut} ref={Counter} />
                                            </Col>
                                        </Row>
                                    </CardTitle>
                                    <CardText>
                                        <Row>
                                            <Col>
                                                <Label>
                                                    <h3>Sobre o jogador {selectedPlayer.name} </h3>
                                                </Label>
                                            </Col>
                                        </Row>
                                        <img className='img' alt={`Jogador ${selectedPlayer.name}`} src={'https://conteudo.imguol.com.br/c/esporte/eb/2022/09/27/neymar-comemora-gol-marcado-pela-selecao-brasileira-contra-a-tunisia-1664308063053_v2_450x600.jpg'} />

                                        <Row>
                                            <Col>
                                                <Question dataPlayer={selectedPlayer} />
                                                <br />
                                            </Col>
                                        </Row>
                                    </CardText>
                                </Card>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Row>
                                    <Button onClick={e=>nextQuestion(e.target.value)} value={1} className="Button" color="primary" >
                                        1
                                    </Button>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Button onClick={e=>nextQuestion(e.target.value)} value={0} className="Button" color="success" >
                                        2
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Row>
                                    <Button onClick={e=>nextQuestion(e.target.value)}  value={0} className="Button" color="warning" >
                                        3
                                    </Button>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Button onClick={e=>nextQuestion(e.target.value)}  value={0} className="Button" color="danger" >
                                        4
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div >
        </Fragment >
    )
}

