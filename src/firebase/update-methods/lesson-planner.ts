import { Store } from 'redux';
import { getLessonPlanners } from '../../services/lesson-planner/get-planners';
import { loadLessonPlanners } from '../../creators/lesson-planner/load-lesson-planners';
import { LessonPlanner } from '../../configs/models/LessonPlanner';
import { getTemplateBuilder } from '../../services/template-builder/get-template-builder';
import { loadTemplate } from '../../creators/template-builder/load-templates';

export const updateLessonPlanners = async (store: Store): Promise<void> => {
  const planner = await getLessonPlanners();

  if (planner !== undefined && planner !== null) {
    store.dispatch(loadLessonPlanners(buildPlanner(planner)));
  } else {
    store.dispatch(loadLessonPlanners(null));
  }
};

export const updateTemplateBuilder = async (store: Store): Promise<void> => {
  const template = await getTemplateBuilder();

  if (template !== undefined && template !== null) {
    store.dispatch(loadTemplate(buildPlanner(template)[0]));
  } else {
    store.dispatch(loadTemplate(null));
  }
};

function buildPlanner(planner: any): LessonPlanner[] {
  return Object.keys(planner).map(
    (key: string): LessonPlanner => {
      return {
        firebaseId: key,
        updatedAt: planner[key].updatedAt,
        id: planner[key].id,
        title: planner[key].title,
        weekdays: {
          monday: planner[key].weekdays.monday,
          tuesday: planner[key].weekdays.tuesday,
          wednesday: planner[key].weekdays.wednesday,
          thursday: planner[key].weekdays.thursday,
          friday: planner[key].weekdays.friday,
        },
        notes: planner[key].notes,
      };
    }
  );
}
