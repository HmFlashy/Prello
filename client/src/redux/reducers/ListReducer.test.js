import listReducer, { defaultListReducer } from './ListReducer';

describe('Unreferenced action', () => {
    it('should return the default state', () => {
        const newState = listReducer(defaultListReducer, { type: 'blabla ' });
        expect(newState).toEqual(defaultListReducer);
    });
});