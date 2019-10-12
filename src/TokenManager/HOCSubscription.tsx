import * as React from 'react';
import TokenManager from "./index";

export function connectToTokenChange<TComponent>(WrappedComponent: TComponent) {


    class TokenSubscribedComponent extends React.Component<any> {
        constructor(props: any) {
            super(props);
            this._handleTokenChange = this._handleTokenChange.bind(this);

            TokenManager.addEventListener('change', this._handleTokenChange)
        }

        componentWillUnmount() {
            TokenManager.addEventListener('change', this._handleTokenChange)
        }

        _handleTokenChange() {
            this.setState({})
        }

        render() {
            const {forwardedRef, ...rest} = this.props;
            return React.createElement(WrappedComponent as any, {...rest, ref: forwardedRef});
        }
    }

    const forwardRef = React.forwardRef((props: any, ref) => {
        return <TokenSubscribedComponent {...props} forwardedRef={ref}/>;
    });

    const name = (WrappedComponent as any).displayName || (WrappedComponent as any).name;
    forwardRef.displayName = `SubscribedToTokenEvents(${name})`;
    return forwardRef as any as TComponent;
}