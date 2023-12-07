const storage = {
    get(key) {
      const value = localStorage.getItem(key);
      if (!value) {
        return null;
      }
      return JSON.parse(value); // Devuelve el token como un objeto
    },
  
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  
    remove(key) {
      localStorage.removeItem(key);
    },
  
    clear() {
      localStorage.clear();
    },
  };
  
  export default storage;