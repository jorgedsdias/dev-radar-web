import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import './styles.css';

function DevItem({ dev, handleEditDev, handleRemoveDev }) {
    return (
        <li key={dev._id} className="dev-item">
            <header> 
                <img src={dev.avatar_url} alt={dev.name} />              
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                    <p>{dev.bio}</p>
                    <p><a href={`https://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Access github profile</a></p>
                </div>
            </header>
            <div className="user-actions">
                <button onClick={() => handleEditDev(dev)} type="button">
                    <FiEdit size={18} color="#8e4dff" />
                </button>
                <button onClick={() => { if(window.confirm('Do you really want to delete this Dev?')) { handleRemoveDev(dev._id) }} } type="button">
                    <FiTrash2 size={18} color="#8e4dff" />
                </button>
            </div>
        </li>
    )
}

export default DevItem;