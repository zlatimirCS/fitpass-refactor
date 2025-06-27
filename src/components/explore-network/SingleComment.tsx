import moment from 'moment';

const SingleComment = ({ comment }: { comment: any }) => {
  const date = moment(comment.comment_time).format('DD.MM.YYYY / HH:mm');
  return (
    <article className='single-comment'>
      <p>{date}</p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <span className='grade'>{comment.total_score}</span>
        <span>&quot;{comment.comment}&quot;</span>
      </div>
    </article>
  );
};
export default SingleComment;
