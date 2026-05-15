import { shallowMount, flushPromises } from '@vue/test-utils';
import { fetchWeather, type WeatherData } from '@/services/weather';
import WeatherWidget from '@/components/WeatherWidget.vue';

// Mock de fetchWeather helper
vi.mock('@/services/weather', () => ({
    fetchWeather: vi.fn(),
}));

// clear all mock calls, or they will persist between tests, making 'times' functions fail 
beforeEach(() => vi.clearAllMocks());

describe('WeatherWidget', () => {
    it('should render loading message while loading', async () => {
        // Arrange
        const city = 'New York';

        // Act
        const wrapper = shallowMount(WeatherWidget, {
            props: { city },
        });

        // Assert
        expect(wrapper.findByDataTest('weather-loading').exists()).toBe(true);
        expect(wrapper.findByDataTest('weather-loading').text()).toContain('Loading weather...');

        expect(wrapper.findByDataTest('weather-error').exists()).toBe(false);
        expect(wrapper.findByDataTest('weather-data').exists()).toBe(false);
        expect(wrapper.findByDataTest('weather-empty').exists()).toBe(false);
    });

    it('should render weather data on api resolved', async () => {
        // Arrange
        const city = 'New York';
        const temperature = 20;
        const description = 'Cloudy';
        vi.mocked(fetchWeather).mockResolvedValue({
            temperature,
            description
        });

        // Act
        const wrapper = shallowMount(WeatherWidget, {
            props: { city },
        });

        await flushPromises();

        // Assert
        expect(wrapper.findByDataTest('weather-loading').exists()).toBe(false);
        expect(wrapper.findByDataTest('weather-error').exists()).toBe(false);
        expect(wrapper.findByDataTest('weather-empty').exists()).toBe(false);

        expect(wrapper.findByDataTest('weather-data').exists()).toBe(true);
        expect(wrapper.findByDataTest('weather-data-temperature').text()).toContain(temperature);
        expect(wrapper.findByDataTest('weather-data-description').text()).toContain(description);
    });

    it('should render error message on api reject', async () => {
        // Arrange
        const city = 'New York';
        const errorMessage = '503 : Service Unavailable';
        vi.mocked(fetchWeather).mockRejectedValue(new Error(errorMessage));

        // Act
        const wrapper = shallowMount(WeatherWidget, {
            props: { city },
        });

        await flushPromises();

        // Assert
        expect(wrapper.findByDataTest('weather-loading').exists()).toBe(false);
        expect(wrapper.findByDataTest('weather-empty').exists()).toBe(false);
        expect(wrapper.findByDataTest('weather-data').exists()).toBe(false);

        expect(wrapper.findByDataTest('weather-error').exists()).toBe(true);
        expect(wrapper.findByDataTest('weather-error').text()).toContain(errorMessage);
    });

    it('should fetch weather from the provided city', async () => {
        // Arrange
        const city = 'New York';

        // Act
        const wrapper = shallowMount(WeatherWidget, {
            props: { city },
        });

        // Assert
        expect(fetchWeather).toHaveBeenCalledWith(city);
    });

    it('should render the name of the provided city in the title', async () => {
        // Arrange
        const city = 'New York';

        // Act
        const wrapper = shallowMount(WeatherWidget, {
            props: { city },
        });

        // Assert
        expect(wrapper.findByDataTest('weather-title').text()).toContain(city);
    });

    it('should render empty message when an empty or invalid dataset gets provided', async () => {
        // Arrange
        const city = 'New York';

        // any falsy value
        vi.mocked(fetchWeather).mockResolvedValue(undefined);

        // Act
        const wrapper = shallowMount(WeatherWidget, {
            props: { city },
        });

        await flushPromises();

        // Assert
        expect(wrapper.findByDataTest('weather-loading').exists()).toBe(false);
        expect(wrapper.findByDataTest('weather-error').exists()).toBe(false);
        expect(wrapper.findByDataTest('weather-empty').exists()).toBe(true);
        expect(wrapper.findByDataTest('weather-data').exists()).toBe(false);
    });
});