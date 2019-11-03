import {ModeManagement} from "../index";
import * as React from "react";

ModeManagement.addFlag('socket', true);
console.warn(ModeManagement.get('socket'));
console.warn(ModeManagement.getFlag('socket'));
ModeManagement.addFlag('socket', false);
console.warn(ModeManagement.get('socket'));
console.warn(ModeManagement.getFlag('socket'));
ModeManagement.addFlag('socket', true);
console.warn(ModeManagement.get('socket'));
console.warn(ModeManagement.getFlag('socket'));
ModeManagement.set('socket', true);
console.warn(ModeManagement.get('socket'));
console.warn(ModeManagement.getFlag('socket'));

ModeManagement.addFlag('direct', false);
ModeManagement.add('url', 'https://google.com');

ModeManagement.events.addEventListener('socket', e => console.log('socket', e));
ModeManagement.events.addEventListener('direct', e => console.log('direct', e));
ModeManagement.events.addEventListener('url', e => console.log('url', e));


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