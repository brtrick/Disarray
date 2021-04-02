import React from 'react';
import { connect } from 'react-redux';
import '../../stylesheets/modal.css';
import '../../stylesheets/reset.css';

const NewGameModal = ({modal}) => {
    let component;
    switch (modal) {
        case 'new-game':
            component = <NewGameContainer/>;
            break;
        default:
            return null;
    }

    return (
        <div>
            <div>
                {component}
            </div>
        </div>
    )
}

const mSTP = state => ({
    modal: state.ui.modal
})

const mDTP = dispatch => ({

});

export default connect(mSTP, mDTP)(NewGameModal);