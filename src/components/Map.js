import React, { useEffect, useState, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

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
  const [mapLoaded, setMapLoaded] = useState(false);
  const [reloadMap, setReloadMap] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserLocation = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3003/api/users/zipcode', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching user location:', error);
      return null;
    }
  }, []);

  const fetchCoordinates = useCallback(async (zipcode) => {
    try {
      const response = await axios.get(`https://api.zippopotam.us/us/${zipcode}`);
      const data = response.data;
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
      return response.data.locations;
    } catch (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
  }, []);

  const fetchUserDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3003/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const user = response.data.user;
      setIsAdmin(user.username === 'tetrisguy263');
    } catch (error) {
      console.error('Error fetching user details:', error);
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
    const initializeMap = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

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

      const locationData = await fetchUserLocation();
      if (locationData) {
        const coords = await fetchCoordinates(locationData.zipcode);
        map.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: 10
        });
        setUserLocation(coords);
      }

      fetchUserDetails();

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
    };

    initializeMap();
  }, [fetchUserLocation, fetchCoordinates, fetchUserDetails, reloadMap]);

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
    if (mapRef.current && userLocation) {
      mapRef.current.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
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

  const handleDelete = async (locationId, locationName) => {
    if (window.confirm(`Are you sure you want to delete "${locationName}"?`)) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3003/api/locations/${locationId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setLocations(prevLocations => prevLocations.filter(location => location.id !== locationId));
        setReloadMap(prev => !prev); // Trigger a re-render to update map
      } catch (error) {
        console.error('Error deleting location:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div id="map-container" style={{ width: '80%', height: '600px' }}></div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Location Name"
          required
          className="block mb-2"
        />
        <select
          name="service_type"
          value={formData.service_type}
          onChange={handleChange}
          required
          className="block mb-2"
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
          className="block mb-2"
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
          className="block mb-2"
        />
        <button type="submit" className="block mb-2">Add Location</button>
        {tempMarkerRef.current && <button type="button" onClick={handleCancel} className="block mb-2">Cancel</button>}
      </form>
      <button onClick={resetMapView} className="block mb-2">Reset Map View</button>
      <ul>
        {locations.map(location => (
          <li key={location.id} onClick={() => handleListItemClick(location)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
            {location.name} - {location.service_type} - {location.street_address} - {location.phone_number}
            {isAdmin && <button onClick={() => handleDelete(location.id, location.name)} className="ml-2 text-red-500">Delete</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Map;
