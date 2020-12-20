import React, { useState } from 'react';
import UserAvatar from '../shared/user_avatar';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import icons from '../shared/icons/svg-icons';
import { useParams, useHistory, Link } from 'react-router-dom';
import { commentOnPost } from '../../redux/actions/comment_actions';


export default function CommentsPage() {
    const currentUserImg = useSelector(stateSelectors.currentUserImageUrl());
    const [body, setBody] = useState('');
    const { postId } = useParams();
    const history = useHistory();
    const comments = useSelector(stateSelectors.commentsByPostId(postId));

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(commentOnPost(postId, { body }))
            .then(() => setBody(''));
    };

    return (
        <div className="comments-page">
            <header>
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Comments</h3>
                {icons.paperPlane}
            </header>

            <section className="form-container">
                <UserAvatar imageUrl={currentUserImg} />
                <form>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />

                    <button
                        disabled={body.length === 0}
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >Post
                    </button>
                </form>
            </section>

            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

const Comment = ({ comment }) => {
    return (
        <li className="comment-container">
            <div className="comment-elements">
                <UserAvatar imageUrl={window.noAvatarImg} />
                <TextBlock comment={comment} />
                {icons.unfilledHeart}
            </div>
        </li>
    );
};

const TextBlock = ({ comment }) => {
    return (
        <div className="text-block">
            <div className="author-and-body">
                <Link className="username-link" to={`/users/1`}>Author</Link>
                <p className="text-after-username">{comment.body}</p>
            </div>
            <div className="stats"></div>
        </div>
    );
};
