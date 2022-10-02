import React, { forwardRef, useEffect, useMemo, useState } from "react";


function Timer({ timeOut }, ref) {
    var seconds = 59;
    const [counter, setCounter] = useState(seconds)
    var timer = '';

    ref.current = {
        stopTimer: function(){
            clearTimeout(timer);
            return setCounter(0);
            
        },
        restartTimer: function () {
            clearTimeout(timer);
            return setCounter(seconds);
        },
        ...{ counter: counter }
    }

    useEffect(() => {
        if (counter > 0) {
            timer = setTimeout(() => {
                setCounter(counter - 1)
            }, 1000)
        }
        else if (counter === 0) {
            return timeOut();
        }
    }, [counter])

    const counterDisplayer = useMemo(() => counter, [counter])

    return (
        <span>
            <b>Tempo:  0:{counterDisplayer} segundos</b>
        </span>
    )
}

export default forwardRef(Timer)