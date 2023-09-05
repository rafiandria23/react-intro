function ArticleItem(props) {
  return (
    <div className='mb-5'>
      <h1 className='text-2xl uppercase font-semibold italic'>
        {props.article.title}
      </h1>

      <p>{props.article.content}</p>
    </div>
  );
}

export default ArticleItem;
