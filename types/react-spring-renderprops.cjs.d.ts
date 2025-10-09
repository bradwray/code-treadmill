declare module 'react-spring/renderprops.cjs' {
  import * as React from 'react';

  export interface SpringConfig {
    tension?: number;
    friction?: number;
    precision?: number;
    mass?: number;
    clamp?: boolean;
  }

  export interface SpringProps<T extends object = any> {
    from?: T;
    to?: T;
    config?: SpringConfig | SpringConfig[];
    children: (styles: T) => React.ReactNode;
  }

  export class Spring<T extends object = any> extends React.Component<SpringProps<T>> {}
}
