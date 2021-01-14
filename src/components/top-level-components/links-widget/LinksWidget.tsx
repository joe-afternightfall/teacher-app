import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from '../../../configs/types/Link';
import { State } from '../../../configs/redux/store';
import MaterialTable, { Query } from 'material-table';

const LinksWidget = (props: LinksWidgetProps): JSX.Element => {
  const dataList = [
    {
      number: '1',
      firebaseId: '',
      id: '',
      linkUrl: 'www.google.com',
      linkTitle: 'My Link',
    },
    {
      number: '2',
      firebaseId: '',
      id: '',
      linkUrl: 'www.google.com',
      linkTitle: 'My Other Link',
    },
  ];

  return (
    <MaterialTable
      title={'Links List'}
      data={dataList}
      options={{
        // pageSize: 8,
        draggable: false,
        exportButton: true,
        pageSizeOptions: [10, 20, 30],
      }}
      style={{
        borderTop: '1px solid #E0E0E0',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
      columns={[
        {
          title: '#',
          field: 'number',
        },
        {
          title: 'Link Title',
          field: 'linkTitle',
        },
        {
          title: 'URL',
          field: 'linkUrl',
          // sorting: false,
          // headerStyle: {
          //   textAlign: 'center',
          // },
          // cellStyle: {
          //   textAlign: 'center',
          // },
        },
      ]}
    />
  );
};

interface LinksWidgetProps {
  title: string;
}

const mapStateToProps = (state: State): LinksWidgetProps => {
  return ({} as unknown) as LinksWidgetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LinksWidgetProps =>
  (({} as unknown) as LinksWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(LinksWidget);
