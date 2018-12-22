import osmToGeoJSON from 'osmtogeojson'
import { center as turfCenter} from '@turf/turf'

export const convertOSMOverpassResultToGeoJSON = (searchResult = {elements: []}) => {
  return osmToGeoJSON(searchResult)
};


export const getCenterOfGeoJSONFeature = (feature) => {
  const center = turfCenter(feature);
  return center.geometry.coordinates;
}
