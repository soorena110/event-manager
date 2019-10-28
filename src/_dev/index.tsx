import {ModeManagement, TokenManager} from "../index";
import * as React from "react";
import {render} from 'react-dom';
import {connectToTokenChange} from "..";

ModeManagement.add('socket', true);
ModeManagement.add('direct', false);
ModeManagement.add('url', 'https://google.com');

ModeManagement.addEventListener('socket', e=> console.log('socket', e));
ModeManagement.addEventListener('direct', e=> console.log('direct', e));
ModeManagement.addEventListener('url', e=> console.log('url', e));



// TokenManager.addEventListener('change', e => console.log('token is : ', e));
//
//
// class MainApplication extends React.Component {
//     render() {
//         return new Date().toString();
//     }
// }
//
// const ConnectedMainApplication = connectToTokenChange(MainApplication);
//
// render(
//     <ConnectedMainApplication/>,
//     document.getElementById("root")
// );

// let i = 0;
// setInterval(() => {
//     TokenManager.setToken((i++).toString());
// }, 1000);

declare const module: any;
module.hot.accept();