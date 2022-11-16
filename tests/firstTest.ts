import assert from 'assert';
import { describe, it } from 'mocha';

const array = [1, 2, 3];

//muutujaga
describe('Array', () => {
    describe('#indexOf()', () => {
      it('should return -1 when the value is not present', () => {
        assert.equal(array.indexOf(4), -1);
      });
      it('should return 0 when the value is present', () => {
          assert.equal(array.indexOf(1), 0);
        });
    });
  });


//alguse näide 
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
    it('should return 0 when the value is present', () => {
        assert.equal([4, 2, 3].indexOf(4), 0);
      });
  });
});

describe('String', () => {
    describe('#includes()', () => {
      it('should return true when the value is present', () => {
        assert.equal('test1'.includes('test'), true);
      });
      it('should return false when the value is not present', () => {
          assert.equal('tst'.includes('test'), false);
        });
    });
  });

  describe('String', () => {
    describe('===', () => {
      it('should return true when the value ===', () => {
        assert.equal('test', 'test');
      });
    });
    describe('!==', () => {
        it('should return true when the value !==', () => {
          assert.notEqual('test1', 'test');
        });
      });
  });