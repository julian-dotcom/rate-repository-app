export const parseNumber = (key: string, obj: any) => {
  if (isObj(obj) && key in obj && obj[key] !== undefined && typeof obj[key] === "number") {
    return obj[key];
  } else throw new Error(`Invalid or missing property for key: ${key}`);
};

export const parseString = (key: string, obj: any) => {
  if (isObj(obj) && key in obj && !!obj[key] && typeof obj[key] === "string") {
    return obj[key];
  } else throw new Error(`Invalid or missing property for key: ${key}`);
};

const isObj = (obj: any) => {
  if (typeof obj === "object" && !Array.isArray(obj) && obj !== null) {
    return true;
  } else return false;
};
