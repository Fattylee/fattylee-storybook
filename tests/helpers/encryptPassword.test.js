import encryptPassword from '../../helpers/encryptPassword';
const debug = require('debug')('test');


describe('encryptPassword test', () => {
  it('should be a function', () => {
    expect(typeof encryptPassword).toBe('function');
  });
  
  it('should return a hash', async (done) => {
    const hash = await encryptPassword('123456');
    expect(hash).toMatch('$2a$10$'); 
    done()
  })
})