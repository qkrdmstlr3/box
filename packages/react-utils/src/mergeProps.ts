/* eslint-disable no-param-reassign */
type KeysOfUnion<T> = T extends T ? keyof T : never;

function mergeProp(props: Record<string, any>, key: string, value: unknown) {
  if (typeof value === 'function') {
    const fn = props[key];
    props[key] = fn
      ? (...args: unknown[]) => {
          fn(...args);
          value(...args);
        }
      : value;
    return;
  }
  props[key] = value;
}

export function mergeProps<T extends Record<string, unknown>[]>(
  ...props: T
): {
  [K in KeysOfUnion<T[number]>]: Extract<T[number], { [P in K]: any }>[K];
} {
  return props.reduce((props, current) => {
    Object.keys(current).forEach((key) => mergeProp(props, key, current[key]));
    return props;
  }, {} as any);
}
