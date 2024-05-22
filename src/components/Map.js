import React, { useEffect, useState, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { useUser } from './UserContext'; // Import the useUser hook

const Map = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        service_type: '',
        street_address: '',
        phone_number: '',
        latitude: null,
        longitude: null
    });
    const mapRef = useRef(null);
    const tempMarkerRef = useRef(null);
    const initialCoordinatesRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [reloadMap, setReloadMap] = useState(false);
    const { user } = useUser(); // Destructure user from useUser hook

    const fetchUserLocation = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3003/api/users/zipcode', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user location');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching user location:', error);
            return null;
        }
    }, []);

    const fetchCoordinates = useCallback(async (zipcode) => {
        try {
            const response = await fetch(`https://api.zippopotam.us/us/${zipcode}`);
            if (!response.ok) {
                throw new Error('Failed to fetch coordinates');
            }
            const data = await response.json();
            const latitude = parseFloat(data.places[0]['latitude']);
            const longitude = parseFloat(data.places[0]['longitude']);
            return { latitude, longitude };
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            return { latitude: 0, longitude: 0 };
        }
    }, []);

    const fetchLocations = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3003/api/locations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data && Array.isArray(response.data.locations)) {
                return response.data.locations;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
            return [];
        }
    }, []);

    const addMarkersToMap = useCallback((map, locations) => {
        if (!map) return;
        locations.forEach(location => {
            if (!isNaN(location.longitude) && !isNaN(location.latitude)) {
                new mapboxgl.Marker()
                    .setLngLat([location.longitude, location.latitude])
                    .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3><p>${location.service_type}</p><p>${location.street_address}</p><p>${location.phone_number}</p>`))
                    .addTo(map);
            }
        });
    }, []);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidGV0cmlzZ3V5MjYzIiwiYSI6ImNsdnpmbWZ1ZTEwaWIyamxvdXNiOXk1MXkifQ.x2ci54k96f5LlRuUws9Qww';

        const map = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.5, 40], // Default center coordinates
            zoom: 9 // Default zoom level
        });

        map.on('load', () => {
            setMapLoaded(true);
        });

        mapRef.current = map;

        fetchUserLocation().then(location => {
            setUserLocation(location);
            if (location) {
                fetchCoordinates(location.zipcode).then(coords => {
                    map.flyTo({
                        center: [coords.longitude, coords.latitude],
                        zoom: 10
                    });
                    initialCoordinatesRef.current = coords; // Store initial coordinates
                });
            }
        });

        const handleMapClick = (e) => {
            const { lng, lat } = e.lngLat;
            if (tempMarkerRef.current) {
                tempMarkerRef.current.remove();
            }
            const marker = new mapboxgl.Marker({ color: 'red' })
                .setLngLat([lng, lat])
                .addTo(map);
            tempMarkerRef.current = marker;
            setFormData(prevFormData => ({
                ...prevFormData,
                latitude: lat,
                longitude: lng
            }));
        };

        map.on('click', handleMapClick);

        return () => {
            map.off('click', handleMapClick);
            map.remove();
        };
    }, [fetchUserLocation, fetchCoordinates, reloadMap]);

    useEffect(() => {
        if (mapLoaded) {
            fetchLocations().then(locations => {
                setLocations(locations);
                addMarkersToMap(mapRef.current, locations);
            });
        }
    }, [mapLoaded, fetchLocations, addMarkersToMap, reloadMap]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.latitude && formData.longitude) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:3003/api/locations', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const newLocation = response.data;
                setLocations(prevLocations => [...prevLocations, newLocation]);
                if (mapRef.current) {
                    addMarkersToMap(mapRef.current, [newLocation]);
                }
                setFormData({ name: '', service_type: '', street_address: '', phone_number: '', latitude: null, longitude: null });
                if (tempMarkerRef.current) {
                    tempMarkerRef.current.remove();
                    tempMarkerRef.current = null;
                }
                setReloadMap(prev => !prev); // Toggle reloadMap to trigger a re-render
            } catch (error) {
                console.error('Error adding location:', error);
            }
        } else {
            console.error('Latitude and longitude are required');
        }
    };

    const handleDelete = async (locationId, locationName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${locationName}"?`);
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3003/api/locations/${locationId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setLocations(prevLocations => prevLocations.filter(location => location.id !== locationId));
                setReloadMap(prev => !prev); // Toggle reloadMap to trigger a re-render
            } catch (error) {
                console.error('Error deleting location:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'phone_number') {
            // Format phone number as 215-276-2132
            formattedValue = value.replace(/\D/g, '');
            if (formattedValue.length > 3 && formattedValue.length <= 6) {
                formattedValue = formattedValue.replace(/(\d{3})(\d+)/, '$1-$2');
            } else if (formattedValue.length > 6) {
                formattedValue = formattedValue.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
            }
        }

        setFormData({ ...formData, [name]: formattedValue });
    };

    const handleCancel = () => {
        if (tempMarkerRef.current) {
            tempMarkerRef.current.remove();
            tempMarkerRef.current = null;
        }
        setFormData({ name: '', service_type: '', street_address: '', phone_number: '', latitude: null, longitude: null });
    };

    const resetMapView = () => {
        if (mapRef.current && initialCoordinatesRef.current) {
            mapRef.current.flyTo({
                center: [initialCoordinatesRef.current.longitude, initialCoordinatesRef.current.latitude],
                zoom: 10
            });
        }
    };

    const handleListItemClick = (location) => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [location.longitude, location.latitude],
                zoom: 14
            });
        }
    };

    return (
        <div className="p-4">
            <div id="map-container" className="w-full h-96 mb-4"></div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Location Name"
                    required
                    className="border p-2 w-full"
                />
                <select
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full"
                >
                    <option value="">Select Service Type</option>
                    <option value="In patient NA">In patient NA</option>
                    <option value="In patient AA">In patient AA</option>
                    <option value="Out Patient NA">Out Patient NA</option>
                    <option value="Out patient AA">Out patient AA</option>
                    <option value="Sober Living">Sober Living</option>
                    <option value="NA Meetings">NA Meetings</option>
                    <option value="AA Meetings">AA Meetings</option>
                </select>
                <input
                    type="text"
                    name="street_address"
                    value={formData.street_address}
                    onChange={handleChange}
                    placeholder="Street Address"
                    className="border p-2 w-full"
                />
                <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    pattern="\d{3}-\d{3}-\d{4}"
                    title="Phone number must be in the format: 215-276-2132"
                    className="border p-2 w-full"
                />
                <div className="space-x-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Location</button>
                    {tempMarkerRef.current && <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>}
                </div>
            </form>
            <button onClick={resetMapView} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Reset Map View</button>
            <ul className="mt-4 space-y-2">
                {locations.map(location => (
                    <li key={location.id} className="flex justify-between items-center">
                        <div onClick={() => handleListItemClick(location)} className="cursor-pointer text-blue-600 underline">
                            {location.name} - {location.service_type} - {location.street_address} - {location.phone_number}
                        </div>
                        {user && user.isAdmin && (
                            <button
                                onClick={() => handleDelete(location.id, location.name)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Map;
