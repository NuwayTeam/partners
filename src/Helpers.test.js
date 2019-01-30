import { buildEmailLink, isValid, sortList } from './Helpers';

describe('Helpers', () => {

  describe('buildEmailLink', () => {
    test('should return a link starting with mailto:', () => {
      const input = 'roger@indians.gbg';
      const res = buildEmailLink(input);
      expect(res).toEqual(`mailto:${input}`);
    });
  });

  describe('Validation', () => {
    const assignment = { name: 'Hockeymålvakt', role: 'slips', contact: 'roger', location: 'gbg', description: 'stoppa puckar' }

    test('should return true if all required fields have content', () => {
      const res = isValid(assignment);
      expect(res).toEqual(true);
    });

    test('should return false if name is missing', () => {
      const res = isValid({...assignment, name: ''});
      expect(res).toEqual(false);
    });
  });

  describe('sortList', () => {
    let input = [];
    const expected = [{name: 'Backend', style: 'xyz'}, {name: 'Fullstack', style: 'abc'}, {name: 'UX', style: 'abc'}];

    beforeEach(() => {      
      input = [{name: 'Fullstack', style: 'abc'}, {name: 'UX', style: 'abc'}, {name: 'Backend', style: 'xyz'}];
    });

    test('should sort an array based on passed param', () => {
      const res = input.sort(sortList('name'))
      expect(res).toEqual(expected);
    });

    test('should sort an array desc if passed as param', () => {
      const res = input.sort(sortList('name', 'desc'))
      expect(res).toEqual(expected.reverse());
    });

    test('should leave an already sorted array sortet', () => {
      const sorted = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
      const copy = sorted.slice();
      const res = sorted.sort(sortList('name'))
      expect(res).toEqual(copy);
    });
  });
});