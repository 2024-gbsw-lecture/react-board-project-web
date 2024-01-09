import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import boardAPI from '../../../api/board';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SubmitButton from '../../common/SubmitButton';

const BoardList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [boards, setBoards] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [pagesIndex, setPagesIndex] = useState(0);

  const [page, setPage] = useState(1);

  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await boardAPI.fetchAll(page - 1);

        const boards = response.data.content;
        setTotalPages(response.data.totalPages);

        setBoards(boards);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchBoards();
  }, [page]);

  useEffect(() => {
    let result = [];
    let temp = [];

    for (let i = 1; i <= totalPages; i++) {
      temp.push(i);

      if (temp.length % 5 === 0) {
        result.push(temp);

        temp = [];
      }
    }

    if (temp.length > 0) {
      result.push(temp);
    }

    setPages(result);
  }, [totalPages]);

  return (
    <div>
      <div>
        <Title>게시글 목록</Title>

        <Link to='/posts/write'>
          <SubmitButton>글 작성하기</SubmitButton>
        </Link>
      </div>

      <BoardsWrapper>
        {isLoading
          ? '로딩중'
          : isError
          ? '오류 발생'
          : boards.map((board) => {
              return (
                <Link
                  to={`/posts/${board.id}`}
                  key={board.id}
                >
                  <BoardItem>
                    <h3>{board.title}</h3>

                    <time>
                      작성일:{' '}
                      {dayjs(board.createdAt).format(
                        'YYYY년 MM월 DD일 HH시 mm분',
                      )}
                    </time>

                    <p>
                      작성자:{' '}
                      {board.user === null
                        ? '탈퇴된 사용자입니다.'
                        : board.user.name}
                    </p>
                  </BoardItem>
                </Link>
              );
            })}
      </BoardsWrapper>

      <div>
        {pagesIndex > 0 ? (
          <button onClick={() => setPagesIndex((prev) => prev - 1)}>
            이전
          </button>
        ) : (
          <></>
        )}

        <div>
          {pages[pagesIndex]?.map((pageNumber) => {
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                style={{
                  padding: '10px',
                  background: pageNumber === page ? 'red' : 'white',
                  cursor: 'pointer',
                }}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {pagesIndex < pages.length - 1 ? (
          <button onClick={() => setPagesIndex((prev) => prev + 1)}>
            다음
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
`;

const BoardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BoardItem = styled.div`
  padding: 10px 15px;
  border: 1px solid #dedede;
  border-radius: 5px;
  font-size: 16px;
`;

export default BoardList;
