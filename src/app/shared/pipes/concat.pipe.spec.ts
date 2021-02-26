import { ConcatPipe } from './concat.pipe';

describe('ConcatPipe', () => {
  const pipe = new ConcatPipe();

  it('should be concated string with all elements', () => {
    expect(pipe.transform(['1', '2', '3'])).toEqual('1, 2, 3');
  });

  it('should be concated string without undefined item', () => {
    expect(pipe.transform(['1', '2', undefined])).toEqual('1, 2');
  });

  it('should be concated string without empty item', () => {
    expect(pipe.transform(['1', '2', ''])).toEqual('1, 2');
  });

  it('should be empty string with undefind items', () => {
    expect(pipe.transform([undefined, undefined, undefined])).toEqual('');
  });
});
