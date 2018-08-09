
interface IState {
  bounds: Array<[number, number]>;
  count: number;
  maxBounds: Array<[number, number]>;
  maxZoom: number;
}

interface IProps {
  position?: string;
}

export {
  IProps,
  IState
}
