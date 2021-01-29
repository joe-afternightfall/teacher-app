import { connect } from 'react-redux';
import App, { AppProps } from './App';
import { State } from './configs/redux/store';

const mapStateToProps = (state: State, ownProps: any): AppProps => {
  return ({
    open: state.applicationState.openSideDrawer,
  } as unknown) as AppProps;
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
