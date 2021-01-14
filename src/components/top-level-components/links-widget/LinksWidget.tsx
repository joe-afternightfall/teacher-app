import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import NewLinkDialog from './NewLinkDialog';
import { State } from '../../../configs/redux/store';
import { openLinkDialog } from '../../../creators/link-dialog';

const LinksWidget = (props: LinksWidgetProps): JSX.Element => {
  const dataList = [
    {
      number: '1',
      firebaseId: '',
      id: '',
      linkUrl: 'www.google.com',
      linkTitle: 'My Link',
      subject: 'Science',
    },
    {
      number: '2',
      firebaseId: '',
      id: '',
      linkUrl: 'www.google.com',
      linkTitle: 'My Other Link',
      subject: 'Math',
    },
  ];

  return (
    <React.Fragment>
      <NewLinkDialog />

      <MaterialTable
        title={'Links List'}
        data={dataList}
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
            field: 'subject',
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
  addNewClickHandler: () => void;
}

const mapStateToProps = (state: State): LinksWidgetProps => {
  return ({} as unknown) as LinksWidgetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LinksWidgetProps =>
  (({
    addNewClickHandler: () => {
      dispatch(openLinkDialog());
    },
  } as unknown) as LinksWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(LinksWidget);
