import React, { useEffect,useState } from 'react';

import UserForm from './components/UserForm/index';
import './App.css';

function App() {
  const baseUrl = 'http://localhost:8000/api/users';
  const [ state, setState ] = useState({
    users: [],
    id: null,
    operation: '',
    info: {},
    message: ''
  });
  const { id, info, message, operation, users } = state;

  async function getUsers(userId) {
    const users = await fetch(`${baseUrl}/${userId ? userId : ''}`)
      .then(response => response.json());

    await setState({ ...state, users: users});
  }

  async function deleteUser(id) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json());

    await getUsers();

    await setMessage(response.message);
  }

  async function createUserAction() {
    const response = await fetch(`${baseUrl}`,{
      method: 'POST',
      body: JSON.stringify(info)
    })
    .then(response => response.json());

    await getUsers();

    await setMessage(response.message);
  }

  async function editUserAction() {
    const response = await fetch(`${baseUrl}/${id}`,{
      method: 'PUT',
      body: JSON.stringify(info)
    })
    .then(response => {
      

      return response.json();
    });

    //await closeModal();
    
    await getUsers();

    await setMessage(response.message);
  }

  function closeModal() {
    setState({ ...state, operation: '' });
  }

  function updateInfo(e) {
    const { name, value } = e.target;
    setState({ ...state, 
      info: {
        ...state.info,
        [name]: value
      }
    });
  }

  function editUser(id, first_name, last_name) {
    setState({ ...state,
      info: {
        first_name,
        last_name
      },
      id,
      operation: 'edit' 
    });
  }

  function addUser() {
    setState({ ...state,
      info: {
        first_name: '',
        last_name: ''
      },
      operation: 'add' 
    });
  }

  function setMessage(message) {
    setState({ ...state, message });

    setTimeout(()=> {
      setState({...state, message: ''});
    }, 3000);
  }

  useEffect(() => {
    getUsers();
  },[]);

  useEffect(() => {
    closeModal();
  },[message]);

  return (
    <div className="App">
      {
        operation && 
        <UserForm
          actionAdd={createUserAction}
          actionEdit={editUserAction}
          firstName={info.first_name}
          lastName={info.last_name}
          mode={operation}
          onCancel={closeModal}
          updateInfo={updateInfo}
        />
      }
      {
        message && <p className="message">{message}</p>
      }
      <button onClick={addUser} className="primary">Add User</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => {
              const { first_name, id, last_name, created_at } = user;

              return(
                <tr key={id}>
                  <td>{id}</td>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{created_at}</td>
                  <td>
                    <button className="primary" onClick={() => editUser(id, first_name, last_name)}>Edit</button>
                    <button onClick={() => deleteUser(id)}>Delete</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table> 
    </div>
  );
}

export default App;
