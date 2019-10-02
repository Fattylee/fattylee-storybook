import createSlug from '../../helpers/createSlug';
const debug = require('debug')('test');


describe('createSlug test /', () => {
   
  test('should throw invalid filename for a bad input', () => {
    expect(() => {
      createSlug('abupng', 526628263538)
    }).toThrowError('Invalid filename');
  });
  test('should return a slug name', () => {
    
    const res = createSlug('abu.png', 526628263538)
   
    expect(res).toMatch(/^526628263538\/.*\.png$/);
  
  });
  
  test('should be a function', () => {
    expect(typeof createSlug).toBe('function');
  });
  
  it('should throw error for empty userId field', () => {
    expect(() => {
      createSlug('filename.app');
    }).toThrowError('userId is required');
  })
  
});