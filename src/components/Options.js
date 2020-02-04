import React from 'react';

const Options = (props) => {

    const { option, selected } = props;

    return (
        <React.Fragment>
            <div className="columns">
                <div class="column">
                    <div className={ selected ? "ans-options bg-blue" : "ans-options bg-white" }>
                        <label class={ selected ? "chZpAy wht-bg" : "chZpAy wht-bg" }>
                            <input className="hide" type="checkbox" />
                        </label>
                        <p className="opt-text">{option}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Options;
