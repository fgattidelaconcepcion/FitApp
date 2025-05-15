export const WebStorage = {
    setItem: (key, value) => {
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        }
        return false;
      } catch (err) {
        console.log("Error setting item in web storage", err);
        return false;
      }
    },
    getItem: (key) => {
      try {
        if (typeof window !== "undefined") {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        }
        return null;
      } catch (err) {
        console.log("Error getting item from web storage", err);
        return null;
      }
    },
    removeItem: (key) => {
      try {
        if (typeof window !== "undefined") {
          localStorage.removeItem(key);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error removing from localStorage:", error);
        return false;
      }
    },
  };