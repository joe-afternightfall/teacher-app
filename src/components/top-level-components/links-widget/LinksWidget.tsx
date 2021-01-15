import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import NewLinkDialog from './NewLinkDialog';
import { Link } from '../../../configs/types/Link';
import { State } from '../../../configs/redux/store';
import { openLinkDialog } from '../../../creators/link-dialog';
import { getSubjectName } from '../../../utils/subject-name';
import { Subject } from '../../../configs/types/Subject';

const LinksWidget = (props: LinksWidgetProps): JSX.Element => {
  const data = props.links.map((link: Link, index: number) => {
    return {
      number: index,
      firebaseId: link.firebaseId,
      id: link.id,
      linkUrl: link.linkUrl,
      linkTitle: link.linkTitle,
      subjectId: link.subjectId,
      subjectName: getSubjectName(props.subjectList, link.subjectId),
    };
  });

  return (
    <React.Fragment>
      <NewLinkDialog />

      <MaterialTable
        title={'Links List'}
        data={data}
        options={{
          // pageSize: 8,
          draggable: false,
          pageSizeOptions: [5, 10, 20, 30],
          actionsColumnIndex: -1,
        }}
        // style={{
        // borderTop: '1px solid #000',
        // }}
        columns={[
          {
            title: '#',
            field: 'number',
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
            // headerStyle: {
            //   textAlign: 'center',
            // },
            // cellStyle: {
            //   textAlign: 'center',
            // },
          },
          {
            title: 'Subject',
            field: 'subjectName',
          },
        ]}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add Link',
            isFreeAction: true,
            onClick: () => props.addNewClickHandler(),
          },
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event) => alert('You want to EDIT row'),
          },
          (rowData) => ({
            icon: 'delete',
            tooltip: 'Delete Link',
            onClick: () => {
              alert(JSON.stringify(rowData));
            },
          }),
        ]}
      />
    </React.Fragment>
  );
};

interface LinksWidgetProps {
  title: string;
  links: Link[];
  subjectList: Subject[];
  addNewClickHandler: () => void;
}

const mapStateToProps = (state: State): LinksWidgetProps => {
  return ({
    links: state.applicationState.links ? state.applicationState.links : [],
    subjectList: state.subjectListState.subjectList
      ? state.subjectListState.subjectList
      : [],
  } as unknown) as LinksWidgetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LinksWidgetProps =>
  (({
    addNewClickHandler: () => {
      dispatch(openLinkDialog());
    },
  } as unknown) as LinksWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(LinksWidget);
