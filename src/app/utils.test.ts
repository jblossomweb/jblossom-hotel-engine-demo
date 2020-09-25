import { randomInteger } from '../core/utils/test-utils';
import { requestTimeout, trimWords } from './utils';

describe('utils', () => {
  describe('requestTimeout', () => {
    it('should always reject with "Request Timeout" error', async () => {
      try {
        await requestTimeout(randomInteger(1, 1000));
      } catch (error) {
        expect(error.message).toEqual('Request Timeout');
      }
    });
    it('should reject after specified delay', async () => {
      const first = jest.fn();
      const second = jest.fn();
      await Promise.race([
        requestTimeout(1000).catch(first),
        requestTimeout(2000).catch(second),
      ]);
      expect(first).toHaveBeenCalled();
      expect(second).not.toHaveBeenCalled();
    });
  });

  describe('trimWords', () => {
    it('should always trim words to single spaces', () => {
      const expected = 'foo bar buzz';
      expect(trimWords('foo bar buzz')).toEqual(expected);
      expect(trimWords('foo bar buzz ')).toEqual(expected);
      expect(trimWords(' foo bar buzz')).toEqual(expected);
      expect(trimWords('foo  bar buzz')).toEqual(expected);
      expect(trimWords('foo bar  buzz')).toEqual(expected);
      expect(trimWords(' foo    bar    buzz ')).toEqual(expected);
    });
  });
});
