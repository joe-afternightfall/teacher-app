import { Store } from 'redux';
import { getLessonPlanners } from '../../services/lesson-planner/get-planners';
import { loadLessonPlanners } from '../../creators/lesson-planner/load-lesson-planners';

export const updateLessonPlanners = async (store: Store) => {
  const planner = await getLessonPlanners();

  if (planner !== undefined && planner !== null) {
    const allPlanners = Object.keys(planner).map((key) => {
      return {
        firebaseId: key,
        updatedAt: planner[key].updatedAt,
        id: planner[key].id,
        title: planner[key].title,
        startDate: planner[key].startDate,
        endDate: planner[key].endDate,
        weekdays: {
          monday: planner[key].weekdays.monday,
          tuesday: planner[key].weekdays.tuesday,
          wednesday: planner[key].weekdays.wednesday,
          thursday: planner[key].weekdays.thursday,
          friday: planner[key].weekdays.friday,
        },
        notes: planner[key].notes,
      };
    });

    store.dispatch(loadLessonPlanners(allPlanners));
  } else {
    store.dispatch(loadLessonPlanners(null));
  }
};
