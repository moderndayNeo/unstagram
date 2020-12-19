import React, { useState } from 'react';
import UserAvatar from '../shared/user_avatar';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import icons from '../shared/icons/svg-icons';
import { useParams, useHistory } from 'react-router-dom';
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
        <ul className="comment">
            <div className="comment-container">

                <li className="main-comment">
                    <div className="inner-container">
                        <UserAvatar imageUrl={window.noAvatarImg} />
                        <div className="text">
                            <p className="author">Author</p>
                            <p>Body
                            {comment.body}
                            </p>
                        </div>
                        <span>
                            {icons.unfilledHeart}
                        </span>

                    </div>
                </li>
            </div>

            <li className="replies"></li>
        </ul>
    );
};

