import React, { useState, useEffect } from 'react';
import { FiMapPin } from 'react-icons/fi';

function DevForm({ onSubmit, currentDev }) {
    const [id, setId] = useState('');
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        if(currentDev) {
            setId(currentDev._id);
            setGithubUsername(currentDev.github_username);
            setTechs(currentDev.techs.join(", "));
            setLatitude(currentDev.location.coordinates[1]);
            setLongitude(currentDev.location.coordinates[0]);
        }
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

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
              console.log(err);
            },
            {
              timeout: 30000,
            }
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Github Username</label>
                <input 
                    name="github_username" 
                    id="github_username" 
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)}
                    required
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Technologies</label>
                <input 
                    name="techs" 
                    id="techs" 
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />
            </div>

            <div className="get-location">
                <a href="/#" onClick={getCurrentLocation}><FiMapPin color="#8e4dff" /> - Get Current Location</a>
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

            <button type="submit">Save</button>
        </form>
    )
}

export default DevForm;