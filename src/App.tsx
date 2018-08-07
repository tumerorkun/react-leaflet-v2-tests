import * as React from 'react';
import { Map, TileLayer, withLeaflet } from 'react-leaflet';
import { ReactLeafletSearch } from 'react-leaflet-search'
import { ReactLeafletZoomIndicator } from 'react-leaflet-zoom-indicator-ts'
import './App.css';
import './leaflet-v1.3.3.css';


interface IState {
  bounds: Array<[number, number]>;
  count: number;
  maxBounds: Array<[number,number]>;
  maxZoom: number;
}

interface IProps {
  position?: string;
}

const WrappedZoomIndicator = withLeaflet(ReactLeafletZoomIndicator);
const WrappedSearch = withLeaflet(ReactLeafletSearch);

class App extends React.Component<IProps, IState> {
  public props: IProps;
  public state: IState = {
    bounds: [
      [33.100745405144245,
        24.510498046875],
      [33.100745405144245,
        46.48315429687501],
      [44.55916341529184,
        46.48315429687501],
      [44.55916341529184,
        24.510498046875],
    ],
    count: 0,
    maxBounds: [
      [-90, -180],
      [90, 180]
    ],
    maxZoom: 13,
  };

  public render() {
    return (
        <Map
          className="simpleMap"
          scrollWheelZoom={false}
          bounds={this.state.bounds}
          maxZoom={this.state.maxZoom}
          maxBounds={this.state.maxBounds}>
          <TileLayer noWrap={true} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <WrappedZoomIndicator head={'Zoom'} position={'topleft'} />
        <WrappedSearch position='topleft' zoom={5} search={[56,45.656]}/>
        </Map>
    );
  }
}

export default App;
