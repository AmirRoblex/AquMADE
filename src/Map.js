import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import OatAhp from "./oat_ahp.js";
import OWA_w, {owa_w} from "./owa.js";
import Aahp from "./aahp.js";
import Anorm from "./ahp_norm.js";
import geoJson from "./wells.json";
import SaSimplex from "./f_simplex.js";
import IwqiAhp, {Na, Cl, HCO3, EC, SAR} from "./normalized.js";
import MIWQI, {m_iwqi} from "./miwqi.js";
import Ahp_Weights from "./ahp_weights";
import AhpNorm, { iwqi } from "./ahp_norm.js";
import ClassDiff from "./cls_dif.js";
import * as turf from "@turf/turf";
import { ceil } from "mathjs";
import cat from './drilled(1).png';

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW1pcnJvYmxleCIsImEiOiJjbDhsbTljbDUwMGVuM29wNmptNG1kZ2k5In0.iiNislZvDPPmIF__MJ7D2w";

for ( let j = 0; j < geoJson.features.length; j++) {
  geoJson.features[j].properties.miwqi = SAR[j]*1;
};
console.log(geoJson)
const newJsonB = JSON.parse(JSON.stringify(geoJson));

var options2 = {gridType: 'square', property: 'miwqi', units: 'meters'};
export const grid = turf.interpolate(newJsonB, 500, options2);


console.log(grid);
console.log(owa_w);

var val = [];
for ( let i = 0; i < grid.features.length; i++) {
  val.push(grid.features[i].properties.miwqi);
};
val.sort(function(a, b){return a-b});

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

const val_sliced = sliceIntoChunks(val, ceil(grid.features.length / 5));
console.log((val_sliced));
console.log(grid);

const Map = () => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [45,38.6],
      zoom: 9.4,
    });


map.on('load', () => {
  map.addSource('inter_polate', {
    type: 'geojson',
    data: grid
  });
  map.addLayer({
    'id': 'inp_lyr',
    'type': 'fill',
    'source': 'inter_polate', // reference the data source
    'layout': {},
    'paint': {
      'fill-color': [
        'interpolate', ['linear'],
        ['get', 'miwqi'],
        0, '#a6cee3', //0-40
        0.344, '#49ab46', //40-55
        2.987,'#e4f52c', //55-70
        16.25, '#ff0000', //70-85
      ],
      'fill-opacity' : 0.85,
    }
  });

  map.loadImage(cat, (error, image) => {
    if (error) throw error;
    // Add the loaded image to the style's sprite with the ID 'kitten'.
    map.addImage('kitten', image);
  });

  map.addLayer({
    id: 'plus',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: geoJson
    },
    layout: {
      'icon-image': 'kitten',
      'icon-allow-overlap': true
    },
    paint: {}
  });
});

const popup = new mapboxgl.Popup();

map.on('mousemove', (event) => {
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['plus']
  });
  if (!features.length) {
    popup.remove();
    return;
  }
  const feature = features[0];

  popup
    .setLngLat(feature.geometry.coordinates)
    .setHTML(feature.properties.title)
    .addTo(map);

  map.getCanvas().style.cursor = features.length ? 'pointer' : '';
});
    // Create default markers
    // geoJson.features.map((feature) =>
    //   new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
    // );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
