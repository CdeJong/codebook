import { shallowMount } from '@vue/test-utils';
import { formatDate } from '@/utils/formatDate';
import UserProfile from '@/components/UserProfile.vue';

// Mock de formatDate helper
vi.mock('@/utils/formatDate', () => ({
    formatDate: vi.fn(),
}));

// clear all mock calls, or they will persist between tests, making 'times' functions fail 
beforeEach(() => vi.clearAllMocks());

describe('UserProfile with mocked formatDate', () => {
    it('should render user name and email', () => {
        // Arrange: configureer mock en user data
        vi.mocked(formatDate).mockReturnValue('1 januari 2024');
        const user = {
            name: 'John Doe',
            email: 'john@example.com',
            createdAt: new Date('2024-01-01'),
        };

        // Act: mount component
        const wrapper = shallowMount(UserProfile, {
            props: { user },
        });

        // Assert: controleer dat naam en email worden getoond
        expect(wrapper.findByDataTest('user-name').text()).toBe('John Doe');
        expect(wrapper.findByDataTest('user-email').text()).toBe('john@example.com');
    });

    it('should use mocked formatDate for created date', () => {
        // Arrange: mock formatDate met custom return value
        vi.mocked(formatDate).mockReturnValue('Mocked Date');
        const user = {
            name: 'Jane Smith',
            email: 'jane@example.com',
            createdAt: new Date('2024-01-15'),
        };

        // Act: mount component
        const wrapper = shallowMount(UserProfile, {
            props: {user},
        });

        // Assert: controleer dat de gemockte date wordt gebruikt
        expect(wrapper.findByDataTest('user-created-at').text()).toContain('Mocked Date');
        expect(wrapper.text()).toContain('Member since: Mocked Date');
    });

    it('should call formatDate with correct Date argument', () => {
        // Arrange: mock formatDate en user data
        vi.mocked(formatDate).mockReturnValue('20 januari 2024');
        const createdAt = new Date('2024-01-20');
        const user = {
            name: 'Alice Brown',
            email: 'alice@example.com',
            createdAt,
        };

        // Act: mount component (formatDate wordt aangeroepen tijdens setup)
        const wrapper = shallowMount(UserProfile, {
            props: {user},
        });

        // Assert: controleer dat formatDate werd aangeroepen met de juiste datum
        expect(formatDate).toHaveBeenCalledWith(createdAt);
        expect(formatDate).toHaveBeenCalledTimes(1);
    });
});