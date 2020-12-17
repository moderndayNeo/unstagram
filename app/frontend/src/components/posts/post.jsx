import React from 'react';
import UserAvatar from '../shared/user_avatar';
import icons from '../shared/icons/svg-icons';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { Link } from 'react-router-dom';

export default function Post({ post: { id, author_id, image_url, caption } }) {
    const author = useSelector(stateSelectors.userById(author_id));

    return (
        <article className="post">
            <PostHeader author={author} />
            <PostImage id={id} imageUrl={image_url} />
            <PostFooter author={author.username} caption={caption} />
        </article>
    );
}


const PostHeader = ({ author }) => {
    return (
        <header className="post-header">
            <UserAvatar imageUrl={author.image_url} />
            <Link to={`/users/${author.id}`}>
                <p>{author.username}</p>
            </Link>
            {icons.threeDots}
        </header>
    );
};

const PostImage = ({ imageUrl }) => {
    return (
        <div className="image-container">
            <img className="post-image" src={imageUrl || window.placeholderImg} alt="post image" />
        </div>
    );
};

const PostFooter = ({ author, caption }) => {
    return (
        <div className="post-footer">
            <FooterIcons />
            <div className="post-likes">135 likes</div>
            <CaptionAndComments author={author} caption={caption} />
        </div>
    );
};

const FooterIcons = () => (
    <div className="footer-icons">
        <div className="icons-left">
            {icons.unfilledHeart}
            {icons.comment}
            {icons.paperPlane}
        </div>
        {icons.unfilledSave}
    </div>
);

const CaptionAndComments = ({ author, caption }) => (
    <div className="caption-and-comments">
        <div className="caption">
            <span className="author">{author}</span>
            <p> {caption}</p>
        </div>
    </div>
);