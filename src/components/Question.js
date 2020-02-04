import React, { useState } from 'react';
import Options from './Options';

const Question = () => {

    const [modalStatus, toggleModal] = useState(1);

    return (
        <div className={modalStatus ? "modal is-active" : "modal"}>
            <div className="modal-background"></div>
            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={() => toggleModal(!toggleModal)}
            ></button>
            <div className="modal-content">
                <p className="is-size-3 mb-1">
                    Q: Which two country flags differ only in the tint of blue?
                </p>
                <Options
                    option="First"
                    selected={true}
                />

                <Options
                    option="Second"
                    selected={false}
                />

                <Options
                    option="Third"
                    selected={false}
                />

                <Options
                    option="Fourth"
                    selected={false}
                />
            </div>
        </div>
    );
}

export default Question;
