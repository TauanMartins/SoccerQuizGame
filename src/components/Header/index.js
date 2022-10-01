import React, { Fragment } from "react";
import { Row, Col, Label, Container } from "reactstrap";
import './header.css';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Fragment>
            <div className="Header">
                <Container fluid>
                    <Row>
                        <Col>
                            <Link to="/" >
                                Início
                            </Link>

                        </Col>
                        <Col>
                            <Label>
                                <h1>
                                    Quizz Ball
                                </h1>
                            </Label>
                        </Col>
                        <Col>
                            <Label>Sobre</Label>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}