import * as React from 'react';
import {useEffect} from 'react';
import {render} from "react-dom";
import {ModeManagement, TraceLogger, useMode} from "../index";

ModeManagement.add('test', 'this is a sample mode');

const tracer = new TraceLogger('test', ['verbose']);

function DemoApplication() {
    const mode = useMode('test');

    useEffect(() => {
        const to = setInterval(() => {
            if (tracer.get('verbose'))
                console.log('Tracer : verbose is on !')
        }, 3000);
        clearInterval(to);
    }, [])

    return <>
        <div>mode: {mode}</div>
    </>
}

render(
    <DemoApplication/>,
    document.getElementById("root")
);


// @ts-ignore
module.hot.accept();
