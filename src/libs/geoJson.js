import osmToGeoJSON from 'osmtogeojson'

export const convertOSMOverpassResultToGeoJSON = (searchResult = {elements: []}) => {
  return osmToGeoJSON(searchResult)
};
