import { render, screen, fireEvent } from '@testing-library/react';

// Components
import ArticleForm from './ArticleForm';

describe('<ArticleForm />', () => {
  test('adds an article...', async () => {
    const mockedArticle = {
      title: 'Mocked Title',
      content: 'Mocked Content',
    };

    const handleSubmit = jest.fn();

    render(<ArticleForm addArticle={handleSubmit} />);

    const form = screen.getByTestId('article-form');
    const titleInput = screen.getByTestId('article-form.title');
    const contentInput = screen.getByTestId('article-form.content');

    fireEvent.change(titleInput, {
      target: {
        value: mockedArticle.title,
      },
    });
    fireEvent.change(contentInput, {
      target: {
        value: mockedArticle.content,
      },
    });
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledWith(mockedArticle);
  });
});
