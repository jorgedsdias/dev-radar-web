import React from 'react';
import { FiEdit, FiTrash2, FiTrash } from 'react-icons/fi';
import './styles.css';

function DevItem({ dev, editDev, removeDev }) {
    return (
        <li key={dev._id} className="dev-item">

            <header> 
                <img src={dev.avatar_url} alt={dev.name} />              
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                    <p>{dev.bio}</p>
                    <p><a href={`https://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Access github profile</a></p>
                    {/* <p>
                        <a href='/#' onClick={() => editDev(dev)}><b>Edit</b></a>&nbsp;-&nbsp;
                        <a href='/#' onClick={() => { if(window.confirm('Do you really want to delete this Dev?')) { removeDev(dev._id) }} }><b>Delete</b></a>
                    </p> */}
                </div>
            </header>

            <div className="user-actions">
                <button onClick={() => editDev(dev)} type="button">
                    <FiEdit size={18} color="#8e4dff" />
                </button>
                <button onClick={() => { if(window.confirm('Do you really want to delete this Dev?')) { removeDev(dev._id) }} } type="button">
                    <FiTrash2 size={18} color="#8e4dff" />
                </button>
            </div>
        </li>
    )
}

export default DevItem;