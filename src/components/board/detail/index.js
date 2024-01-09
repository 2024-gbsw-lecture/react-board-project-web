import { useEffect, useState } from 'react';
import boardAPI from '../../../api/board';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserId } from '../../../utils/user';
import styled from 'styled-components';
import SubmitButton from '../../common/SubmitButton';

const BoardDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const userId = getUserId();

  const [postDetail, setPostDetail] = useState(null);

  const onDelete = async () => {
    try {
      const id = Number(params.id);

      await boardAPI.deletePost(id);
      alert('글이 삭제되었습니다.');

      navigate('/');
    } catch (error) {}
  };

  useEffect(() => {
    const fetchBoard = async (id) => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await boardAPI.fetchDetail(id);

        setPostDetail(response.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    const id = Number(params.id);

    fetchBoard(id);
  }, [params.id]);

  if (isLoading) {
    return <p>로딩중..</p>;
  }

  if (isError) {
    return <p>오류가 발생했습니다.</p>;
  }

  return (
    <div>
      <div>
        <h1>제목: {postDetail.title}</h1>

        <BoardContent>내용: {postDetail.content}</BoardContent>

        <span>
          작성자:{' '}
          {postDetail.user === null ? '탈퇴된 사용자' : postDetail.user.name}
        </span>
      </div>

      {postDetail.user === null || postDetail.user.id !== userId ? (
        <></>
      ) : (
        <div>
          <Link to={`/posts/${postDetail.id}/edit`}>
            <SubmitButton>수정하기</SubmitButton>
          </Link>

          <SubmitButton
            backgroundColor='red'
            onClick={onDelete}
          >
            삭제하기
          </SubmitButton>
        </div>
      )}
    </div>
  );
};

const BoardContent = styled.p`
  white-space: pre-line;
  line-height: 1.3;
`;

export default BoardDetail;
