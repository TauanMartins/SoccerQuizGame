import React, { Fragment } from "react";
import './home.css';
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

export default function Home() {
    return (
        <Fragment>
            <div className="Home">
                <Container fluid>
                    <Row>
                        <Col>
                            <Link to="/game" >
                                <Button className="Button" size="lg" color="primary" >

                                    {"Jogar"}
                                    <br />
                                    {"Nível difícil - Descubra sobre jogadores"}
                                </Button>
                                </Link>
                                <Link to="/game2" >
                                <Button className="Button" size="lg" color="primary" >

                                    {"Jogar"}
                                    <br />
                                    {"Nível médio - Descubra bandeiras"}

                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}