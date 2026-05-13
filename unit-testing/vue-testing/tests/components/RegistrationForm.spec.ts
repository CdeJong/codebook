import {shallowMount} from '@vue/test-utils';
import RegistrationForm from '@/components/RegistrationForm.vue';

describe('RegistrationForm', () => {
    describe('Initial state', () => {
        it('should have empty input fields', async () => {
            // Arrange
            const wrapper = shallowMount(RegistrationForm);

            // Act & Assert
            expect(wrapper.find('#email').text()).toBe('');
            expect(wrapper.find('#password').text()).toBe('');
            expect(wrapper.find('#confirmPassword').text()).toBe('');
        });

        it('should have an unchecked checkbox', async () => {
            // Arrange
            const wrapper = shallowMount(RegistrationForm);

            // Act & Assert
            expect(wrapper.find('#acceptTerms').element.checked).toBeFalsy();
        });

        it('should NOT have the error message loaded', async () => {
            // Arrange
            const wrapper = shallowMount(RegistrationForm);

            // Act & Assert
            expect(wrapper.find('.error').exists()).toBe(false);
        });
    });

    describe('Validation', () => {
        it('should show error when email, password or confirmPassword is empty', async () => {
            // Arrange
            const wrapper = shallowMount(RegistrationForm);
            const form = wrapper.find('form');

            // Act
            await form.trigger('submit');

            // Assert
            expect(wrapper.find('.error').text()).toBe('Vul alle velden in');
            expect(wrapper.emitted('submit')).toBeFalsy();
        });

        it('should show error when the email field is empty', async () => {
            // Arrange
            const wrapper = shallowMount(RegistrationForm);
            const form = wrapper.find('form');
            const passwordInput = wrapper.find('#password');
            const confirmPasswordInput = wrapper.find('#confirmPassword');

            // Act
            await passwordInput.setValue('secret123');
            await confirmPasswordInput.setValue('secret123');
            await form.trigger('submit');

            // Assert
            expect(wrapper.find('.error').text()).toBe('Vul alle velden in');
            expect(wrapper.emitted('submit')).toBeFalsy();
        });

        it('should show error when the password field is empty', async () => {
            // Arrange
            const wrapper = shallowMount(RegistrationForm);
            const form = wrapper.find('form');
            const emailInput = wrapper.find('#email');
            const confirmPasswordInput = wrapper.find('#confirmPassword');

            // Act
            await emailInput.setValue('test@example.com');
            await confirmPasswordInput.setValue('secret123');
            await form.trigger('submit');

            // Assert
            expect(wrapper.find('.error').text()).toBe('Vul alle velden in');
            expect(wrapper.emitted('submit')).toBeFalsy();
        });

        it('should show error when the password confirm field is empty', async () => {
            // Arrange
            const wrapper = shallowMount(RegistrationForm);
            const form = wrapper.find('form');
            const emailInput = wrapper.find('#email');
            const passwordInput = wrapper.find('#password');

            // Act
            await emailInput.setValue('test@example.com');
            await passwordInput.setValue('secret123');
            await form.trigger('submit');

            // Assert
            expect(wrapper.find('.error').text()).toBe('Vul alle velden in');
            expect(wrapper.emitted('submit')).toBeFalsy();
        });

        it('should show error when the password length is less than 8 characters long', async () => {
            // Arrange
            const wrapper = shallowMount(RegistrationForm);
            const form = wrapper.find('form');
            const emailInput = wrapper.find('#email');
            const passwordInput = wrapper.find('#password');
            const confirmPasswordInput = wrapper.find('#confirmPassword');
            // set other fields so it passes the ealier validations
            await emailInput.setValue('test@example.com');
            await confirmPasswordInput.setValue('secret123');

            // Act
            await passwordInput.setValue('secret');
            await form.trigger('submit');

            // Assert
            expect(wrapper.find('.error').text()).toBe('Wachtwoord moet minimaal 8 karakters zijn');
            expect(wrapper.emitted('submit')).toBeFalsy();
        });

        it('should show error when the password and confirm password aren\'t equal to eachother', async () => {
            // Arrange
            const wrapper = shallowMount(RegistrationForm);
            const form = wrapper.find('form');
            const emailInput = wrapper.find('#email');
            const passwordInput = wrapper.find('#password');
            const confirmPasswordInput = wrapper.find('#confirmPassword');
            // set other fields so it passes the ealier validations
            await emailInput.setValue('test@example.com');

            // Act
            await passwordInput.setValue('123secret');
            await confirmPasswordInput.setValue('secret123');
            await form.trigger('submit');

            // Assert
            expect(wrapper.find('.error').text()).toBe('Wachtwoorden komen niet overeen');
            expect(wrapper.emitted('submit')).toBeFalsy();
        });

        it('should show error when terms aren\'t accepted', async () => {
            // Arrange
            const wrapper = shallowMount(RegistrationForm);
            const form = wrapper.find('form');
            const emailInput = wrapper.find('#email');
            const passwordInput = wrapper.find('#password');
            const confirmPasswordInput = wrapper.find('#confirmPassword');
            // set other fields so it passes the ealier validations
            await emailInput.setValue('test@example.com');
            await passwordInput.setValue('secret123');
            await confirmPasswordInput.setValue('secret123');

            // Act
            // checkbox should be unchecked by default as tested before
            await form.trigger('submit');

            // Assert
            expect(wrapper.find('.error').text()).toBe('Je moet de voorwaarden accepteren');
            expect(wrapper.emitted('submit')).toBeFalsy();
        });
    });

    describe('Submission', async () => {

        // Arrange
        const wrapper = shallowMount(RegistrationForm);
        const form = wrapper.find('form');
        const emailInput = wrapper.find('#email');
        const passwordInput = wrapper.find('#password');
        const confirmPasswordInput = wrapper.find('#confirmPassword');
        const acceptTermsInput = wrapper.find('#acceptTerms');

        // set valid input fields
        await emailInput.setValue('test@example.com');
        await passwordInput.setValue('secret123');
        await confirmPasswordInput.setValue('secret123');
        await acceptTermsInput.setChecked(true);

        // Act
        await form.trigger('submit');

        it('should emit submit event when valid input is used', () => {
            // Assert
            expect(wrapper.emitted('submit')).toBeTruthy();
        });

        it('should not load error when valid input is used', () => {
            // Assert
            expect(wrapper.find('.error').exists()).toBe(false);
        });

        it('should emit the correct values on successful submit', () => {
            // Assert
            expect(wrapper.emitted('submit')?.[0]).toStrictEqual([{
                email: 'test@example.com', 
                password: 'secret123',
                confirmPassword: 'secret123',
                acceptTerms: true
            }]);

        });
    });
});