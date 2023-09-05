import { useState, useEffect } from 'react';

function ArticleForm(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    props.addArticle({
      title,
      content,
    });

    setTitle('');
    setContent('');
  };

  return (
    <form className='w-100' onSubmit={handleSubmit}>
      <input
        className='border border-gray-700 rounded px-3 py-2 mb-3 w-full'
        type='text'
        name='title'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className='border border-gray-700 rounded px-3 py-2 mb-3 w-full'
        name='content'
        placeholder='Content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className='block border border-gray-700 rounded px-5 py-2'
        type='submit'
      >
        Submit
      </button>
    </form>
  );
}

export default ArticleForm;
