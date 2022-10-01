import React,{ useEffect, useState } from "react";
import { Label } from "reactstrap";


export default function Question({dataPlayer}) {

    const [selectedPlayer, setSelectedPlayer] = useState(dataPlayer)
    useEffect(() => {
        setSelectedPlayer(dataPlayer)
    },[selectedPlayer])
    return (
        
        <Label>
            <h2>Quantos anos ele tem:</h2>
        </Label>
    )
}