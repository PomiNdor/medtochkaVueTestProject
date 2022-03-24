export default {
  async fetchItems(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      return null;
    }
  }
}