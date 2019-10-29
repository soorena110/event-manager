import * as React from 'react';
import ModeManagement from ".";

export function connectToModeChange(modeName:string){

    return function<TComponent>(WrappedComponent: TComponent) {

        class ModeSubscribedComponent extends React.Component<any> {
            constructor(props: any) {
                super(props);
                this._handleModeChange = this._handleModeChange.bind(this);

                ModeManagement.addEventListener(modeName, this._handleModeChange)
            }

            componentWillUnmount() {
                ModeManagement.addEventListener(modeName, this._handleModeChange)
            }

            _handleModeChange() {
                this.setState({})
            }

            render() {
                const {forwardedRef, ...rest} = this.props;
                return React.createElement(WrappedComponent as any, {...rest, ref: forwardedRef});
            }
        }

        const forwardRef = React.forwardRef((props: any, ref) => {
            return <ModeSubscribedComponent {...props} forwardedRef={ref}/>;
        });

        const name = (WrappedComponent as any).displayName || (WrappedComponent as any).name;
        forwardRef.displayName = `SubscribedToModeEvents(${name})`;
        return forwardRef as any as TComponent;
    }

}