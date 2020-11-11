import React from 'react';

export default function Error(props) {

    return (
        <div className="error">
            <span className="error-msg">{props.message}</span>
        </div>
    )
}