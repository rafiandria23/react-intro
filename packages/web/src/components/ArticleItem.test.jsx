import { render, screen } from '@testing-library/react';

// Components
import ArticleItem from './ArticleItem';

describe('<ArticleItem />', () => {
  test('renders article properly', () => {
    const mockedArticle = {
      title: 'Mocked Title',
      content: 'Mocked Content',
    };

    render(<ArticleItem article={mockedArticle} />);

    const title = screen.getByText(new RegExp(mockedArticle.title, 'i'));
    const content = screen.getByText(new RegExp(mockedArticle.content, 'i'));

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
