export const getBase64 = async (file: Blob): Promise<any> => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

export const throttle = (cb: Function, delay: number = 1000) => {
  let lastCall: number = 0;
  return (...args: any): void => {
    const now: number = Date.now();
    if (now - lastCall >= delay) {
      cb(...(args as []));
      lastCall = now;
    }
  };
};

export const debounce = (cb: Function, delay: number = 1000) => {
  let timeout: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...(args as []));
    }, delay);
  };
};

export const trimEllip = (string: string, maxString: number = 25): string => {
  let strings = string.split("");
  let newString = "";

  for (let i = 0; i < strings.length; i++) {
    if (maxString < i) return (newString += "...");
    newString += strings[i];
  }

  return string;
};

export const handleNativeName = (nativeName: object): string => {
  let native: string = "";
  for (const [key, value] of Object.entries(nativeName)) {
    if (key === "nld") return value.common;
    native = value.common;
  }
  return native;
};

export const handleCurrencies = (currencies: object) => {
  for (const value of Object.values(currencies)) {
    return value.name;
  }
  return null;
};

export const handleLanguages = (languages: object) => {
  const langs = [];
  for (const value of Object.values(languages)) {
    langs.push(value);
  }
  return langs;
};

export const concatSentence = (array: any[]): string => {
  let sentence = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i + 1] === undefined) {
      sentence += array[i] + ".";
    } else sentence += array[i] + ", ";
  }
  return sentence;
};
