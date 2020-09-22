import { CSSProperties } from 'react';
import { RouteProps } from 'react-router-dom';

export interface Route {
  path: string;
  page: RouteProps['component'];
  title?: string;
}

export interface Redirect {
  from?: string;
  to: string;
}

export interface Palette {
  [key: string]: CSSProperties['color'];
}

export type Primitive = string | number | boolean | null | undefined;

export interface PrimitiveObject {
  [field: string]: Primitive;
}
