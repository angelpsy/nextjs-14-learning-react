import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import NewPost from '../../components/new-post'
import { useGoBack } from '../../hooks/navigate';
import { IPost } from '../../types/posts';
import usePostsServiceInstance from '../../hooks/posts-service-instance';

function NewPostPage () {
  const {postId} = useParams();
  const numId = postId ? parseInt(postId, 10) : 0;
  const urlCallback = postId ? `/posts/${postId}` : '/';
  const { goBack } = useGoBack(urlCallback);
  const handleCancel = goBack;
  const [post, setPost] = useState<IPost | null>(null);
  const {
    getPostById,
  } = usePostsServiceInstance();

  useEffect(() => {
    if (!postId) {
      return;
    }
    getPostById(+postId).then((data: IPost) => {
      setPost(data);
    });
  }, [postId]);

  return (
    <div>
      <h1>{postId ? 'Edit post' : 'New Post'}</h1>
      <NewPost
        key={post?.id || 'new'}
        id={post?.id || null}
        onCancel={handleCancel}
        onSubmit={(data) => {
          console.log(data);
          handleCancel();
        }}
        defaultBody={post?.body || ''}
        defaultName={post?.author || ''}
      />
    </div>
  )
}

export default NewPostPage;
