import { useEffect, useState } from 'react';
import styled from 'styled-components';
import boardAPI from '../../../api/board';
import { useNavigate, useParams } from 'react-router-dom';
import SubmitButton from '../../common/SubmitButton';
import AuthChecker from '../../auth/checker';

const BoardForm = () => {
  const params = useParams();

  const postId = Number(params.id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!title || !content) {
      alert('내용을 모두 입력해주세요.');

      return;
    }

    try {
      const request = {
        title,
        content,
      };

      if (isNaN(postId)) {
        await boardAPI.createPost(request);

        alert('글을 작성했습니다.');
      } else {
        await boardAPI.updatePost(postId, request);

        alert('글을 수정했습니다.');
      }

      navigate('/');
    } catch (error) {}
  };

  useEffect(() => {
    if (isNaN(postId)) {
      return;
    }

    const fetchBoard = async (id) => {
      const response = await boardAPI.fetchDetail(id);

      const post = response.data;

      setTitle(post.title);
      setContent(post.content);
    };

    fetchBoard(postId);
  }, [postId]);

  return (
    <div>
      <AuthChecker />

      <div>
        <TitleInput
          type='text'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder='제목을 입력하세요.'
        />

        <ContentInput
          placeholder='내용을 입력하세요.'
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></ContentInput>

        <SubmitButton onClick={onSubmit}>
          {isNaN(postId) ? '작성하기' : '수정하기'}
        </SubmitButton>
      </div>
    </div>
  );
};

const TitleInput = styled.input`
  width: 100%;
  outline: none;
  border: 1px solid #dedede;
  border-radius: 5px;
  padding: 10px 14px;
  margin-bottom: 10px;
`;

const ContentInput = styled.textarea`
  width: 100%;
  min-height: 300px;
  max-height: 300px;
  padding: 10px 14px;
  border: 1px solid #dedede;
  border-radius: 5px;
  margin-bottom: 10px;
  overflow: auto;
  resize: none;
`;

export default BoardForm;
