import { FirstLetterPipe } from './first-letter.pipe';

describe('FirstLetterPipe', () => {

  let pipe: FirstLetterPipe;

  beforeEach(() => {
    pipe = new FirstLetterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
    expect(pipe.transform).toBeDefined();
  });

  it(`should return uppercase one first letter`, () => {
    const result = pipe.transform('uppercase');
    expect(result).toEqual('U.');
  });
});
