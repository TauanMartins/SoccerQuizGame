import React, { Fragment } from "react";
import './game.css';
import { Container, Row, Col, Label } from "reactstrap";

export default function Game() {
    return (
        <Fragment>
            <div className="Game">
                <Container fluid>
                    <Row>
                        <Col>
                            <Label>
                                <h2>Jogando</h2>
                            </Label>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}