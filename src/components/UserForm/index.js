import React from 'react';

function UserForm(props) {
    const { actionAdd, actionEdit, firstName, lastName, mode, onCancel, updateInfo } = props;
    return(
        <div>
            <div className="overlay"></div>
            <div id="UserForm">
                <input type="text" name="first_name" placeholder="First Name" value={firstName} onChange={e => updateInfo(e)}/>
                <input type="text" name="last_name" placeholder="Last Name" value={lastName} onChange={e => updateInfo(e)}/>
                <div className="actions">
                    { mode === 'add' && <button className="primary" onClick={actionAdd}>Add</button> }
                    { mode === 'edit' && <button className="primary" onClick={actionEdit}>Edit</button> }
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default UserForm;
