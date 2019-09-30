const createSlug = require('../../helpers/createSlug');
const debug = require('debug')('test');

describe('Home page route GET /', () => {
    it('should GET /', (done) => {
   /* request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);
        done();
      });*/
      done();
  }); // end it
  test('next one', () => {
    
  });
  test('nice one', () => {
    const sum = (a,b) => a + b;
    debug('testing...');
    console.log(createSlug('abu.png', 526628263538));
    expect(sum(2,4)).toBe(6);
  })
});