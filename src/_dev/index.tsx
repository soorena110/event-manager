import {TokenManager} from "../index";
import * as React from "react";
import {render} from 'react-dom';
import {connectToTokenChange} from "../TokenManager/HOCSubscription";

TokenManager.addEventListener('change', e => console.log('token is : ', e));


declare const module: any;

class MainApplication extends React.Component {
    render() {
        return new Date().toString();
    }
}

const ConnectedMainApplication = connectToTokenChange(MainApplication);

render(
    <ConnectedMainApplication/>,
    document.getElementById("root")
);

let i = 0;
setInterval(() => {
    TokenManager.setToken((i++).toString());
}, 1000);

module.hot.accept();