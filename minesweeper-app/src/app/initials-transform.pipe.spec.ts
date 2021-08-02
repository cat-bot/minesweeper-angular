import { InitialsTransformPipe } from './initials-transform.pipe';

describe('InitialsTransformPipe', () => {

  const pipe = new InitialsTransformPipe();

  it('create an instance', () => { 
    expect(pipe).toBeTruthy();  
  });

  it('transforms "" to ""', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('transforms "FUCK" to "F"', () => {
    expect(pipe.transform('FUCK')).toBe('F');
  });

  it('transforms "fuck" to "F"', () => {
    expect(pipe.transform('fuck')).toBe('F');
  });

  it('transforms "FUCK You" to "F Y"', () => {
    expect(pipe.transform('FUCK You')).toBe('F Y');
  });

  it('transforms "fuck y30" to "F U"', () => {
    expect(pipe.transform('fuck y30')).toBe('F Y');
  });

});
