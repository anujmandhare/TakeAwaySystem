import validation from './Validation';
import CONSTANTS from './Constants.json';

describe('validation Tester', () => {
    beforeEach(() => {
        global.window = global;
    });

    afterEach(() => {
        delete global.window;
    });

    it('email address validation', () => {
        const email = 'dummy@dummy.in';
        expect(validation({ type: CONSTANTS.EMAIL, stringToTest: email })).toBe(true);
    });

    it('invalid email id validation', () => {
        const invalidid = 'invalid-email';
        const alert = jest.spyOn(window, 'alert').mockImplementation(() => { });
        expect(validation({ type: CONSTANTS.EMAIL, stringToTest: invalidid })).toBe(false);
        expect(alert).toHaveBeenCalledWith(CONSTANTS.EMAIL_ERROR);
        alert.mockRestore();
    });

    it('number validation', () => {
        const number = '9876543210';
        expect(validation({ type: CONSTANTS.NUMBER, stringToTest: number })).toBe(true);
    });

    it('invalid number validation', () => {
        const invalidnumber = '98765';
        const alert = jest.spyOn(window, 'alert').mockImplementation(() => { });
        expect(validation({ type: CONSTANTS.NUMBER, stringToTest: invalidnumber })).toBe(false);
        expect(alert).toHaveBeenCalledWith(CONSTANTS.NUMBER_ERROR);
        alert.mockRestore();
    });
});
