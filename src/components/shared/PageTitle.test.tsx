import PageTitle from './PageTitle';
import { renderWithTheme } from '../../configs/test-utils/mock-redux';

describe('Page Title Component', () => {
  it('should render with info', () => {
    const pageTitle = renderWithTheme(<PageTitle title={'Test Title'} />);

    expect(pageTitle.getByText('Test Title')).toBeInTheDocument();
  });
});
