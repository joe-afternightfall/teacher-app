import { Store } from 'redux';
import { getSubjects } from '../../services/subject-list/get-subjects';
import { loadSubjectList } from '../../creators/subject-list/load-subjects';
import { Subject } from '../../configs/models/Subject';

export const updateSubjects = async (store: Store): Promise<void> => {
  const subjects = await getSubjects();
  if (subjects !== null) {
    const output = Object.keys(subjects).map(
      (key: string): Subject => {
        return {
          firebaseId: key,
          id: subjects[key].id,
          subjectName: subjects[key].subjectName,
          primaryColorId: subjects[key].primaryColorId,
          primaryColor: subjects[key].primaryColor,
          secondaryColor: subjects[key].secondaryColor,
          iconId: subjects[key].iconId,
        };
      }
    );

    store.dispatch(loadSubjectList(output));
  } else {
    store.dispatch(loadSubjectList([]));
  }
};
