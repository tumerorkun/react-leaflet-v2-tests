
interface IState {
  bounds: Array<[number, number]>;
  count: number;
  maxBounds: Array<[number, number]>;
  maxZoom: number;
  baseLayerMaps: { [key: string]: string };
  baseLayers: Array<{ name: string; title: string;}>
  checkedBaseLayer: string;
}

interface IProps {
  position?: string;
}

export {
  IProps,
  IState
}
