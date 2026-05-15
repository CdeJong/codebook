export type WeatherData = {
    temperature: number;
    description: string;
};

export const fetchWeather = async (city: string) : Promise<WeatherData> => {
    // In a real app, this would make an actual API call
    // For this exercise, we'll simulate an API call with a delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Simulate API response
    return {
        temperature: Math.floor(Math.random() * 30) + 10,
        description: ['Sunny', 'Cloudy', 'Rainy', 'Windy'][Math.floor(Math.random() * 4)],
    };
}