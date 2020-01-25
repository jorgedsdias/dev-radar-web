import React from 'react';

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
                <p><a href={`https://github.com/${dev.github_username}`}>Acessar perfil no github</a></p>
                <p>
                    <a href='#' onClick={() => editDev(dev)}><b>Editar</b></a>&nbsp;-&nbsp;
                    <a href='#' onClick={() => { if(window.confirm('Você quer mesmo deletar esse Dev?')) { removeDev(dev._id) }} }><b>Excluir</b></a>
                </p>
            </div>
            </header>
        </li>
    )
}

export default DevItem;