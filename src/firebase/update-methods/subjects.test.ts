import { updateSubjects } from './subjects';
import actions from '../../creators/actions';
import { getStore } from '../../configs/test-utils/mock-redux';
import { getSubjects } from '../../services/subject-list/get-subjects';
import { buildSubjectDAOList } from '../../configs/test-utils/test-util';

jest.mock('../../services/subject-list/get-subjects');

const getSubjectsMock = getSubjects as jest.Mock;

describe('subject update method', () => {
  it('should dispatch subjects', async () => {
    const builtList = buildSubjectDAOList(3);
    const store = getStore({});

    getSubjectsMock.mockResolvedValue(builtList);

    await updateSubjects(store);

    const expected = builtList.map((subject, index) => {
      return {
        firebaseId: index.toString(),
        id: subject.id,
        subjectName: subject.subjectName,
        primaryColorId: subject.primaryColorId,
        primaryColor: subject.primaryColor,
        secondaryColor: subject.secondaryColor,
        iconId: subject.iconId,
      };
    });

    expect(store.getActions()).toStrictEqual([
      {
        type: actions.LOAD_SUBJECT_LIST,
        subjectList: expected,
      },
    ]);
  });

  it('should dispatch empty', async () => {
    const store = getStore({});

    getSubjectsMock.mockResolvedValue(null);

    await updateSubjects(store);

    expect(store.getActions()).toStrictEqual([
      {
        type: actions.LOAD_SUBJECT_LIST,
        subjectList: [],
      },
    ]);
  });
});
