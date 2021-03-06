import * as React from 'react';
import { Map, Popup, TileLayer, withLeaflet } from 'react-leaflet';
// my Components
import { GridCanvas } from 'react-leaflet-gridcanvas'
import { overlay, ReactLeafletGroupedLayerControl } from 'react-leaflet-grouped-layer-control'
import { ReactLeafletSearch as RLSearch } from 'react-leaflet-search'
import { ReactLeafletZoomIndicator as RLZoomIndicator } from 'react-leaflet-zoom-indicator'

// interfaces
import { IProps, IState } from './interfaces'

// context map wrappers
const WrappedZoomIndicator = withLeaflet(RLZoomIndicator);
const WrappedSearch = withLeaflet(RLSearch);
const WrappedGridCanvas = withLeaflet(GridCanvas);
const WrappedGroupedLayer = withLeaflet(ReactLeafletGroupedLayerControl);

class App extends React.Component<IProps, IState> {
  public props: IProps;
  public state: IState;
  private baseLayerMaps: {[key:string]: string};
  constructor(props:IProps) {
    super(props);

    // bind this to methods
    this.baseLayerChanged = this.baseLayerChanged.bind(this);
    this.overlayChanged = this.overlayChanged.bind(this);
    this.centerText = this.centerText.bind(this);

    this.baseLayerMaps = {
        'esrimap': 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        'googlemap':'https://www.google.cn/maps/vt?lyrs=s@189&gl=tr&x={x}&y={y}&z={z}',
        'openstreetmap': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      },

    // init state
    this.state = {
      baseLayers: [
        { name: 'esrimap', title: 'Esri Map' },
        { name: 'openstreetmap', title: 'Open Street Map' },
        { name: 'googlemap', title: 'Google Map' }
      ],
      bounds: [
        [33.100745405144245, 24.510498046875],
        [33.100745405144245, 46.48315429687501],
        [44.55916341529184, 46.48315429687501],
        [44.55916341529184, 24.510498046875],
      ],
      centerTextFunc: this.centerText,
      checkedBaseLayer: 'openstreetmap',
      count: 0,
      gridColor: 'black',
      gridShow: true,
      maxBounds: [ [-90, -180], [90, 180] ],
      maxZoom: 13,
      overlays: [
        {
          checked: true,
          groupTitle: 'Grids',
          name: 'grid-1',
          title: ' Grid'
        }
      ]
    };
  }

  public customPopup(info: string): JSX.Element {
    return (
      <Popup>
        <div>
          <p> Custom PopUp </p>
          {info}
        </div>
      </Popup>
    )
  }

  public render() {
    return (
      <Map
        className="simpleMap"
        scrollWheelZoom={false}
        bounds={this.state.bounds}
        maxZoom={this.state.maxZoom}
        maxBounds={this.state.maxBounds} >

        <TileLayer noWrap={true} url={this.baseLayerMaps[this.state.checkedBaseLayer]} />

        <WrappedZoomIndicator head={'Zoom'} position={'topleft'} />

        <WrappedSearch
          position='topleft'
          zoom={10}
          search={[56, 45.656]}
          showMarker={true}
          showPopup={true}
          inputPlaceholder={'Search Latitude, Longitude'}
          closeResultsOnClick={true}
          // popUp={this.customPopup}
        />
        {
          !this.state.gridShow ||
          <WrappedGridCanvas color={this.state.gridColor} centerText={ this.state.centerTextFunc } />
        }

        <WrappedGroupedLayer
          position={'topleft'}
          baseLayers={this.state.baseLayers}
          checkedBaseLayer={this.state.checkedBaseLayer}
          onBaseLayerChange={this.baseLayerChanged}
          exclusiveGroups={[]}
          overlays={this.state.overlays}
          onOverlayChange={this.overlayChanged}
        />

      </Map>
    );
  }

  private getNextColor(nextBaseLayerTitle: string) {
    return  (nextBaseLayerTitle === 'openstreetmap') ? 'black' :
            (nextBaseLayerTitle === 'esrimap') ? 'white' :
            (nextBaseLayerTitle === 'googlemap') ? 'yellow' : 'red';
  }

  private centerText(): string {
    return `zoom: #z`
  }

  private baseLayerChanged(nextBaseLayerTitle: string): void {
    if (this.state.checkedBaseLayer !== nextBaseLayerTitle) {
      this.setState({
        checkedBaseLayer: nextBaseLayerTitle,
        gridColor: this.getNextColor(nextBaseLayerTitle),

      });
    }
  }

  private overlayChanged(newOverlays: overlay[]) {
    const grid = newOverlays.find((e: overlay) => e.name === 'grid-1');
    this.setState({
      gridShow: typeof grid !== 'undefined' ? grid.checked : false
    });
  }

}

export default App;
