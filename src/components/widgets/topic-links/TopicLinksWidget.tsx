import React from 'react';
import { connect } from 'react-redux';
import {
  deleteLink,
  updateLink,
  UpdateLinkProps,
} from '../../../services/topic-links-service';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from '../../../configs/types/Link';
import { State } from '../../../configs/redux/store';
import NewLinkDialog from './components/NewLinkDialog';
import { Subject } from '../../../configs/types/Subject';
import { getSubjectName } from '../../../utils/subject-name';
import { openNewLinkDialog } from '../../../creators/topic-links/links-dialog';

const TopicLinksWidget = (props: LinksWidgetProps): JSX.Element => {
  // todo: rip out to util
  const data = props.links.map((link: Link, index: number) => {
    index += 1;

    return {
      number: index,
      firebaseId: link.firebaseId,
      id: link.id,
      linkUrl: link.linkUrl,
      linkTitle: link.linkTitle,
      subjectId: link.subjectId,
      plannerItemIds: link.plannerItemIds,
    };
  });

  const subjects = props.links.reduce((obj: any, item: Link) => {
    obj[item.subjectId] = getSubjectName(props.subjectList, item.subjectId);
    return obj;
  }, {});

  return (
    <React.Fragment>
      <NewLinkDialog />

      <MaterialTable
        data={data}
        // icons={tableIcons}
        title={'Links List'}
        options={{
          pageSize: 6,
          draggable: false,
          pageSizeOptions: [6, 12, 18],
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newData, oldData): Promise<void> =>
            new Promise((resolve, reject) => {
              props.updateClickHandler({
                firebaseId: newData.firebaseId,
                linkUrl: newData.linkUrl,
                linkTitle: newData.linkTitle,
                subjectId: newData.subjectId,
              });
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
          onRowDelete: (newData): Promise<void> =>
            new Promise((resolve, reject) => {
              props.deleteClickHandler(newData.firebaseId);
              setTimeout(() => {
                resolve();
              }, 1500);
            }),
        }}
        columns={[
          {
            title: '#',
            field: 'number',
            editable: 'never',
            cellStyle: {
              width: '10%',
            },
          },
          {
            title: 'Link Title',
            field: 'linkTitle',
          },
          {
            title: 'URL',
            field: 'linkUrl',
          },
          {
            title: 'Subject',
            field: 'subjectId',
            lookup: subjects,
          },
        ]}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add Link',
            isFreeAction: true,
            onClick: () => props.addNewClickHandler(),
          },
        ]}
      />
    </React.Fragment>
  );
};

interface LinksWidgetProps {
  links: Link[];
  subjectList: Subject[];
  addNewClickHandler: () => void;
  deleteClickHandler: (id: string) => void;
  updateClickHandler: (link: UpdateLinkProps) => void;
}

const mapStateToProps = (state: State): LinksWidgetProps => {
  return ({
    links: state.topicLinksState.links ? state.topicLinksState.links : [],
    subjectList: state.subjectListState.subjectList
      ? state.subjectListState.subjectList
      : [],
  } as unknown) as LinksWidgetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LinksWidgetProps =>
  (({
    addNewClickHandler: () => {
      dispatch(openNewLinkDialog());
    },
    deleteClickHandler: (id: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(deleteLink(id));
    },
    updateClickHandler: (link: UpdateLinkProps) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(updateLink(link));
    },
  } as unknown) as LinksWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(TopicLinksWidget);
