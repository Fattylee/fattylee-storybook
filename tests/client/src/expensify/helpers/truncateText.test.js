//import truncateText from '../../../../../client/src/expensify/helpers/truncateText';
import truncateText from '../truncateText';


describe('Test truncateText func',() => {
  test('should be a function', () => {
    expect(typeof truncateText).toBe('function');
  })
});