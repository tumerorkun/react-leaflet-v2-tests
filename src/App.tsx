import * as React from 'react';
import { Map, TileLayer, withLeaflet } from 'react-leaflet';
// my Components
import { GridCanvas } from 'react-leaflet-gridcanvas'
import { ReactLeafletGroupedLayerControl } from 'react-leaflet-grouped-layer-control'
import { ReactLeafletSearch as RLSearch } from 'react-leaflet-search'
import { ReactLeafletZoomIndicator as RLZoomIndicator } from 'react-leaflet-zoom-indicator'
// css
import './App.css';
// interfaces
import { IProps, IState } from './interfaces'

// context map wrappers
const WrappedZoomIndicator = withLeaflet(RLZoomIndicator);
const WrappedSearch = withLeaflet(RLSearch);
const WrappedGridCanvas = withLeaflet(GridCanvas);
const WrappedGroupedLayer = withLeaflet(ReactLeafletGroupedLayerControl);

class App extends React.Component<IProps, IState> {
  public props: IProps;
  public state: IState = {
    bounds: [
      [33.100745405144245, 24.510498046875],
      [33.100745405144245, 46.48315429687501],
      [44.55916341529184, 46.48315429687501],
      [44.55916341529184, 24.510498046875],
    ],
    count: 0,
    maxBounds: [ [-90, -180], [90, 180] ],
    maxZoom: 13,
  };

  public render() {
    return (
      <Map
        className="simpleMap"
        scrollWheelZoom={false}
        bounds={this.state.bounds}
        maxZoom={this.state.maxZoom}
        maxBounds={this.state.maxBounds} >

        <TileLayer noWrap={true} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <WrappedZoomIndicator head={'Zoom'} position={'topleft'} />

        <WrappedSearch position='topleft' zoom={10} search={[56,45.656]}/>

        <WrappedGridCanvas color={'red'} />

        <WrappedGroupedLayer
          position={'topleft'}
          baseLayers={[
            { name: 'test', title: 'BASE-1' },
          ]}
          checkedBaseLayer={'test'} />

      </Map>
    );
  }
}

export default App;
