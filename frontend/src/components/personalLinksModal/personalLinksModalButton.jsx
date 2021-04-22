import React from 'react';
import {connect} from 'react-redux';
import {openModal} from '../../actions/modal_actions';


const PersonalLinksButton = ({openModal}) => {
    return (
        <div className='button-container'>
            <button onClick={() => openModal('personal-links')} className='personal-links-button'>Developers</button>
        </div>
    )
}




const mSTP = () => ({
    
})

const mDTP = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

export default connect(mSTP, mDTP)(PersonalLinksButton);

