
interface IState {
  bounds: Array<[number, number]>;
  count: number;
  maxBounds: Array<[number, number]>;
  maxZoom: number;
  baseLayers: Array<{ name: string; title: string;}>
  checkedBaseLayer: string;
  centerTextFunc: () => string;
  gridColor: string;
  gridShow: boolean;
}

interface IProps {
  position?: string;
}

export {
  IProps,
  IState
}
