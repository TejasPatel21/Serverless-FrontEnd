import axios from 'axios';
import React, { useEffect, useState } from 'react';

  const App = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const [post, setPost] = React.useState([]);


  useEffect(()=>{
   getLocation();
    axios.get("https://www.mikenpatel.click/database").then((response) => {
      setPost(response.data)
      console.log(response.data)
    });
  },[])
  
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  return (
    <div className="App">
      {/* <button onClick={getLocation}>Get Location</button> */}
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
      <form action="https://www.mikenpatel.click/insert" method="post">
        <label for="fname">first Name:</label>
        <input type="text" id="fname" name="fname"/><br></br>
        <input type="submit" value="Submit"/>
      </form>
     <ul>
       {post.map(post => (
        <li key={post._id}>{post.Name} &nbsp; &nbsp;   {post.region}</li>  
       ))}
   </ul>
    </div>
  );
}

export default App;