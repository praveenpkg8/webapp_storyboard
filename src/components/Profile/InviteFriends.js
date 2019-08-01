import React from 'react';
const URL = 'http://localhost:8080';
const ProductionURL = 'https://full-services.appspot.com'
const InviteFriends = () => {
    return (
        <>
        <a href={ProductionURL +'/api/contact/oauth'} className="btn btn-outline-success">Invite friends</a>
        </>
    )
}

export default InviteFriends;