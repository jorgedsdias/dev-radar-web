import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit, currentDev }) {
    const [id, setId] = useState('');
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            if(!currentDev) {
                setLatitude(latitude);
                setLongitude(longitude);
            } else {
                setId(currentDev._id);
                setGithubUsername(currentDev.github_username);
                setTechs(currentDev.techs.join(", "));
                setLatitude(currentDev.location.coordinates[1]);
                setLongitude(currentDev.location.coordinates[0]);
            }
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
        );
    }, [currentDev]);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit(id,
        {
            github_username,
            techs,
            latitude,
            longitude,
        });

        setId('');
        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input 
                    name="github_username" 
                    id="github_username" 
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)}
                    required
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Técnologias</label>
                <input 
                    name="techs" 
                    id="techs" 
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input 
                    type="number" 
                    name="latitude" 
                    id="latitude" 
                    required 
                    value={latitude} 
                    onChange={e => setLatitude(e.target.value)}
                />
                </div>

                <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input 
                    type="number" 
                    name="longitude" 
                    id="longitude" 
                    required 
                    value={longitude} 
                    onChange={e => setLongitude(e.target.value)}
                />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm;