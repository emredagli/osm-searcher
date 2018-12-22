import osmToGeoJSON from 'osmtogeojson'
import { center as turfCenter} from '@turf/turf'

const filterNoNamedFeatures = (geoJSON = {features:[]}) => {
  geoJSON.features = geoJSON.features.filter(feature => feature.properties.name);
  return geoJSON;
}

export const convertOSMOverpassResultToGeoJSON = (searchResult = {elements: []}) => {
  const geoJSONResult = osmToGeoJSON(searchResult);
  return filterNoNamedFeatures(geoJSONResult);
};

export const getCenterOfGeoJSONFeature = (feature) => {
  const center = turfCenter(feature);
  return center.geometry.coordinates;
}

export const sortGeoJSONFeaturesByProperty = (geoJSON, property) => {
  if (!property) {return;}
  geoJSON.features.sort(
    (feature1, feature2) => (feature1.properties[property] || '').localeCompare(feature2.properties[property] || ''));
}
