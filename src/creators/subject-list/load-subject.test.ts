import { loadSubjectList } from './load-subjects';

describe('load subject creator', () => {
  it('should return load subject action', () => {
    const list = [
      {
        firebaseId: 'firebase-1',
        id: 'id-1',
        subjectName: 'name-1',
        primaryColorId: 'primary-1',
        primaryColor: 'color-1',
        secondaryColor: 'secondary-1',
        iconId: 'icon-id-1',
      },
      {
        firebaseId: 'firebase-2',
        id: 'id-2',
        subjectName: 'name-2',
        primaryColorId: 'primary-2',
        primaryColor: 'color-2',
        secondaryColor: 'secondary-2',
        iconId: 'icon-id-2',
      },
    ];

    const action = loadSubjectList(list);

    expect(action).toStrictEqual({
      type: 'LOAD_SUBJECT_LIST',
      subjectList: list,
    });
  });
});
