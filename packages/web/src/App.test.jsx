import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// App
import App from './App';

describe('<App />', () => {
  test('renders properly...', () => {
    render(<App />);

    const title = screen.getByText(/Post an Article/i);

    expect(title).toBeInTheDocument();
  });

  test('adds an article...', async () => {
    const mockedArticle = {
      title: 'Mocked Title',
      content: 'Mocked Content',
    };

    render(<App />);

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

    const articleTitle = screen.getByText(new RegExp(mockedArticle.title, 'i'));
    const articleContent = screen.getByText(
      new RegExp(mockedArticle.content, 'i'),
    );

    expect(articleTitle).toBeInTheDocument();
    expect(articleContent).toBeInTheDocument();
  });

  test('shows <ChatBox />...', async () => {
    render(<App />);

    const chatBoxVisibilityButton = screen.getByTestId(
      'chat-box-visibility-button',
    );

    userEvent.click(chatBoxVisibilityButton);

    await waitFor(() => {
      const chatBox = screen.getByTestId('chat-box');

      expect(chatBox).toBeInTheDocument();
    });
  });
});
