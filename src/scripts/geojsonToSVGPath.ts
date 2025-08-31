export interface MapParams {
  /**
   * ズームレベル (0-22 くらいまで)
   */
  zoom: number;
  /**
   * マップの中心座標 (経度, 緯度)
   */
  center: {
    lon: number;
    lat: number;
  };
  /**
   * マップ画像の幅 (px)
   */
  width: number;
  /**
   * マップ画像の高さ (px)
   */
  height: number;
}

/**
 * GeoJSON の座標から SVG path 文字列を生成
 * @returns SVG path 文字列 ( d属性の値 )
 */
export function geojsonToSVGPath(geojson: GeoJSON.FeatureCollection, map: MapParams): string {
  let path = '';
  geojson.features.forEach((feature) => {
    const coordsArray = feature.geometry.coordinates;
    if (feature.geometry.type === 'Polygon') {
      coordsArray.forEach((ring) => {
        ring.forEach((coord, i) => {
          const [x, y] = lonLatToPixel({ lon: coord[0], lat: coord[1], map });
          path += i === 0 ? `M${x},${y}` : `L${x},${y}`;
        });
        path += 'Z ';
      });
    } else if (feature.geometry.type === 'LineString') {
      coordsArray.forEach((coord, i) => {
        const [x, y] = lonLatToPixel({ lon: coord[0], lat: coord[1], map });
        path += i === 0 ? `M${x},${y}` : `L${x},${y}`;
      });
    }
  });
  return path;
}

/**
 * 緯度経度をピクセル座標に変換する
 * @returns ピクセル座標 [x, y]
 */
function lonLatToPixel(params: { lon: number; lat: number; map: MapParams }): [number, number] {
  const { lon, lat, map } = params;
  const { zoom, center, width, height } = map;
  const tileSize = 512;
  const scale = (tileSize * Math.pow(2, zoom)) / 2 / Math.PI;

  const lambda0 = (center.lon * Math.PI) / 180;
  const phi0 = (center.lat * Math.PI) / 180;

  // 中心座標の WebMercator ピクセル
  const x0 = scale * lambda0;
  const y0 = scale * Math.log(Math.tan(Math.PI / 4 + phi0 / 2));

  // 対象座標の WebMercator ピクセル
  const x1 = scale * ((lon * Math.PI) / 180);
  const y1 = scale * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2));

  // 画像上のピクセル座標
  const x = width / 2 + (x1 - x0);
  const y = height / 2 - (y1 - y0);

  return [x, y];
}
