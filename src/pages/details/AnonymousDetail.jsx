import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import Nav from '@/parts/nav/Nav';
import { Helmet } from 'react-helmet-async';

function PostDetail() {
  const { id } = useParams(); // URL에서 글 ID를 가져옴
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [anonymousUsers, setAnonymousUsers] = useState({}); // 익명 사용자 매핑

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      const db = getFirestore();
      const postRef = doc(db, 'posts', id);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        setPost(postSnap.data());
      } else {
        console.error('No such document!');
      }
      setLoading(false);
    };

    const fetchComments = async () => {
      const db = getFirestore();
      const commentsRef = collection(db, 'posts', id, 'comments');
      const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'));
      const commentsSnap = await getDocs(commentsQuery);

      const commentsList = [];
      const anonymousMap = {};
      let anonymousCounter = 1;

      commentsSnap.forEach((commentDoc) => {
        const commentData = commentDoc.data();
        const userId = commentData.user_id;

        if (!anonymousMap[userId]) {
          anonymousMap[userId] = `익명${anonymousCounter}`;
          anonymousCounter += 1;
        }

        commentsList.push({
          id: commentDoc.id,
          ...commentData,
          anonymousName: anonymousMap[userId],
        });
      });

      setComments(commentsList);
      setAnonymousUsers(anonymousMap);
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (comment.trim() === '' || !user) return;

    const db = getFirestore();
    const commentsRef = collection(db, 'posts', id, 'comments');
    await addDoc(commentsRef, {
      text: comment,
      createdAt: new Date(),
      user_id: user.uid,
    });

    setComment('');
    toast.success('댓글이 등록되었습니다!');

    // 댓글을 다시 불러와서 갱신
    const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'));
    const commentsSnap = await getDocs(commentsQuery);

    const commentsList = [];
    const anonymousMap = { ...anonymousUsers };
    let anonymousCounter = Object.keys(anonymousMap).length + 1;

    commentsSnap.forEach((commentDoc) => {
      const commentData = commentDoc.data();
      const userId = commentData.user_id;

      if (!anonymousMap[userId]) {
        anonymousMap[userId] = `익명${anonymousCounter}`;
        anonymousCounter += 1;
      }

      commentsList.push({
        id: commentDoc.id,
        ...commentData,
        anonymousName: anonymousMap[userId],
      });
    });

    setComments(commentsList);
    setAnonymousUsers(anonymousMap);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>LIVE:ON - {post?.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`LIVE:ON - ${post?.title}`} />
        <meta property="twitter:title" content={`LIVE:ON - ${post?.title}`} />
        <meta property="og:type" content="web application" />
        <meta
          property="og:url"
          content={`https://r09m.vercel.app/posts/anonymous/${id}`}
        />
        <meta property="og:description" content={post?.content} />
        <meta name="description" content={post?.content} />
        <meta property="og:image" content="ribbon.png" />
        <meta property="og:article:author" content="LIVE:ON" />
      </Helmet>

      <div className="bg-line-200 py-2">
        <div className="px-4">
          <Header />
          <h2 className="pageTitle">{post?.title}</h2>
        </div>
        <div className="rounded-2xl p-5 m-6 bg-white">
          <h3 className="text-greenishgray-700 font-semibold mt-5">
            {post?.title}
          </h3>
          <p className="text-sm my-2">{post?.content}</p>
        </div>
        <div className="px-4">
          <h3 className="text-greenishgray-700 font-semibold mt-5">댓글</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="p-2 border-b border-gray-300">
                <div className="flex items-center text-xs text-gray-500">
                  <span className="text-primary-500 font-bold ml-2">
                    {comment.anonymousName}
                  </span>
                </div>
                <p className="text-sm">{comment.text}</p>
                <p className="text-xs text-gray-500">
                  {comment.createdAt.toDate().toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="댓글을 입력하세요"
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 p-2 bg-primary-500 text-white rounded"
            >
              댓글 작성
            </button>
          </div>
        </div>
        <Nav />
      </div>
      <Toaster />
    </>
  );
}

export default PostDetail;
