import React from 'react';

export default class Button extends React.Component {
    render() {
        const { style, margin, btnFunction: handleClick, text, children } = this.props;

        const buttonClassName = `btn ${style || "btn-success"} ${margin || "m-1"}`;

        return (
            <button
                className={buttonClassName}
                onClick={handleClick}
            >
                {text || children}
            </button>
        );
    }
}