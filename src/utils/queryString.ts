type Encodable = string | number | boolean;

const isEncodable = (val: unknown): val is Encodable => {
  return (
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'boolean'
  );
};

export function createQueryString(params: Record<string, any>) {
  const queryString = Object.keys(params)
    .filter((key) => params[key] !== undefined)
    .map((key) => {
      const val = params[key];

      if (isEncodable(val)) {
        return `${key}=${encodeURIComponent(val)})`;
      }

      return `${key}=${val}`;
    })
    .join('&');

  if (!queryString) {
    return '';
  }

  return `?${queryString}`;
}
