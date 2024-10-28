import { render, screen } from '@testing-library/react';

// Components
import ArticleList from './ArticleList';

describe('<ArticleList />', () => {
  test('renders articles properly', () => {
    const mockedArticles = [
      {
        id: 1,
        title: 'Mocked Title',
        content: 'Mocked Content',
      },
    ];

    render(<ArticleList articles={mockedArticles} />);

    const title = screen.getByText(new RegExp(mockedArticles[0].title, 'i'));
    const content = screen.getByText(
      new RegExp(mockedArticles[0].content, 'i'),
    );

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
