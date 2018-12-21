import ColorHash from 'color-hash'

const colorHash = new ColorHash();

const getUniqueValueList = (geoJSON, property) => {
  return geoJSON.features.reduce((x, y) => {
      const value = y.properties[property];
      return x.includes(value) ? x : [...x, value]
    }, []);
};

export const getColorMapFromProperty = (geoJSON, property) => {
  let valueList = getUniqueValueList(geoJSON, property);

  valueList = valueList.length > 0 ? valueList : [''];

  return valueList.reduce((colorMap, property) => {
    colorMap[property] = colorHash.hex(property);
    return colorMap;
  }, {});
};

export const convertColorMapToColorStops = (colorMap) => {
  return Object.keys(colorMap).map((property) => [property, colorMap[property]]);
};
