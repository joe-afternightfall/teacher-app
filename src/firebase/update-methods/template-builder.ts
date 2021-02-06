import { Store } from 'redux';
import { getTemplateBuilder } from '../../services/template-builder/get-template-builder';
import { loadTemplate } from '../../creators/template-builder/load-templates';
import { LessonPlanner } from '../../configs/models/LessonPlanner';

export const updateTemplateBuilder = async (store: Store) => {
  const template = await getTemplateBuilder();
  if (template !== undefined && template !== null) {
    //todo:  rip out to common util for lesson planner
    const templates = Object.keys(template).map(
      (key: string): LessonPlanner => {
        return {
          firebaseId: key,
          updatedAt: template[key].updatedAt,
          id: template[key].id,
          title: template[key].title,
          weekdays: {
            monday: template[key].weekdays.monday,
            tuesday: template[key].weekdays.tuesday,
            wednesday: template[key].weekdays.wednesday,
            thursday: template[key].weekdays.thursday,
            friday: template[key].weekdays.friday,
          },
          notes: template[key].notes,
        };
      }
    );

    store.dispatch(loadTemplate(templates[0]));
  } else {
    store.dispatch(loadTemplate(null));
  }
};
