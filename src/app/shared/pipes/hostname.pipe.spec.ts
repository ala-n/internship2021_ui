import { HostnamePipe } from './hostname.pipe';

describe('HostnamePipe', () => {
  const pipe = new HostnamePipe();

  it('should be returned hostname only', () => {
    expect(pipe.transform('https://exadel.com')).toEqual('exadel.com');
  });

  it('should be returned undefined from empty string', () => {
    expect(pipe.transform('')).toEqual(undefined);
  });

  it('should be returned undefined if string doesn`t have ://', () => {
    expect(pipe.transform('exadel.com')).toEqual(undefined);
  });
});
