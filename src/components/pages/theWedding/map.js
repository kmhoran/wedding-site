import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

let map;

const mapStyles = {
    width: "100%",
    height: "100%",

}

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 39.1031, lng: -84.512 },
//     zoom: 15,
//     styles: 
//   });

class MapContainer extends React.Component{
render () {
    var points = [
        { lat: 39.104, lng: -84.508 },
        {lat: 39.104, lng: -84.52},
        {lat: 39.1029, lng: -84.515},
        {lat: 39.1030, lng: -83.510}
    ]
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    return (
        <Map google={{

            ...this.props.google}} 
             style={mapStyles}
             initialCenter={{lat: 39.1031, lng: -84.512}}
             bounds={bounds}>

<Marker onClick={this.onMarkerClick}
        name={'Current location'} />

<InfoWindow onClose={this.onInfoWindowClose}>
    <div>
      <h1>PLACE</h1>
    </div>
</InfoWindow>
</Map>
    )
}
}


export default GoogleApiWrapper({
    apiKey: "MY-API-KEY"
})(MapContainer);
