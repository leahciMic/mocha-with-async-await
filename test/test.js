'use strict';

const chai = require('chai');
const expect = chai.expect;

const getAsyncValue = (value) => {
  return new Promise(r => setTimeout(r.bind(r, value), 20));
};

const getError = (value) => {
  return new Promise((resolve, reject) => reject(new Error('example error')));
};

describe('A test suite', () => {
  it('an example error', async () => {
    let a = getError();

    try {
      await a;
      expect.fail('should have thrown');
    } catch(e) {
      // i don't like the fact that the above expect.fail will trigger this catch
      // and then you're relying upon testing the right error object, with the
      // right message
      expect(e).to.be.an('error');
      expect(e.message).to.equal('example error');
    }
  });

  it('async and sequential', async () => {
    let foo = await getAsyncValue('bar');
    let bar = await getAsyncValue(foo);

    expect(foo).to.equal('bar');
    expect(bar).to.equal('bar');
  });

  it('async and paralell', async () => {
    let foo = getAsyncValue('bar');
    let bar = getAsyncValue('foo');

    expect(await foo).to.equal('bar');
    expect(await bar).to.equal('foo');
  });
});
