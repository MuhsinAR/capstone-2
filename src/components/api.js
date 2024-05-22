// api.js

export const fetchClosestGroups = async (latitude, longitude) => {
    try {
      const response = await fetch(`/api/closest-groups?latitude=${latitude}&longitude=${longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch closest groups');
      }
      const data = await response.json();
      return data.closestGroups;
    } catch (error) {
      console.error('Error fetching closest groups:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };
  