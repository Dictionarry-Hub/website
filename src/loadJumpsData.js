// loadJumpsData.js
export const loadJumpsData = async () => {
    try {
        const response = await fetch('/jumps.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading jumps data:', error);
        return [];
    }
};