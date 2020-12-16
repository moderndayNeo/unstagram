import React, { useState } from 'react';
import BottomNav from '../shared/bottom_nav';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { useParams } from 'react-router-dom';
import icons from '../shared/icons/svg-icons';
import UserAvatar from '../shared/user_avatar';

export default function Profile() {
    const currentUser = useSelector(stateSelectors.currentUser());
    const allPosts = useSelector(stateSelectors.allPosts());
    const { userId } = useParams();

    if (currentUser.id == userId) {
        return <OwnProfile user={currentUser} posts={allPosts} />;
    }
    else {
        return <ForeignProfile />;
    }
}

const OwnProfile = ({ user, posts }) => {
    return (
        <div className="own-profile">
            <ProfileHeader user={user} />
            <main>
                <ImageAndName user={user} />
                <Bio user={user} />
                <Stats user={user} />
                <PostCollections user={user} ownProfile={true} posts={posts} />
            </main>
            <BottomNav />
        </div>
    );
};

const ForeignProfile = () => {
    return (
        <div>
            <header>
                {/* chevron icon */}
                {/* foreign usernme */}
            </header>

            <main>
                {/* <CoreInfo /> */}
                {/* <Stats /> */}
                {/* <PostCollections /> */}

            </main>
            Foreign Profile
            <BottomNav />
        </div>
    );
};

const ProfileHeader = ({ user }) => (
    <header>
        {icons.gears}
        <h3>{user.username}</h3>
        {icons.discover}

    </header>
);

const ImageAndName = ({ user }) => {
    return (
        <div className="image-and-name">
            <UserAvatar imageUrl={user.image_url} />
            <section>
                <h2 className="username">{user.username}</h2>
                <button>Edit Profile</button>
            </section>
        </div>
    );
};

const Bio = ({ user }) => (
    <div className="bio">
        <h1 className="name">{user.name}</h1>
        {/* <span>{user.bio}</span> */}
        <span>Bodybuilder</span>
    </div>
);

const Stats = () => {
    let user = {
        num_posts: 3,
        num_followers: 11,
        num_following: 14
    };

    const statTypes = ['posts', 'followers', 'following'];
    const userInfo = ['num_posts', 'num_followers', 'num_following'];

    return (
        <ul className="stats">
            {
                statTypes.map((statName, idx) => (
                    <li key={idx} className="stat">
                        <p className="number">{user[userInfo[idx]]}</p>
                        <p className="name">{statName}</p>
                    </li>
                ))
            }
        </ul>
    );
};

const PostCollections = ({ user, ownProfile, posts }) => {
    const [selected, setSelected] = useState('posts');

    return (
        <div className="post-collections">
            <PostSelectorButtons
                ownProfile={ownProfile}
                selected={selected}
                setSelected={setSelected} />
            <SelectedPosts
                posts={posts}
                selected={selected} />
        </div>
    );
};

const PostSelectorButtons = ({ ownProfile, selected, setSelected }) => {
    return (
        <ul className="post-selector-buttons">
            <li className="selector" onClick={() => setSelected('posts')}>
                {selected === 'posts' ? icons.profilePostsBlue : icons.profilePostsGrey}
            </li>
            <li className="selector" onClick={() => setSelected('feed')}>
                <img src={selected === 'feed' ? window.profileFeedBlue : window.profileFeedGrey} alt="profile feed icon" />
            </li>
            {
                ownProfile &&
                <li className="selector" onClick={() => setSelected('saved')}>
                    {selected === 'saved' ? icons.profileSavedBlue : icons.profileSavedGrey}
                </li>
            }
            <li className="selector" onClick={() => setSelected('tagged')}>
                {selected === 'tagged' ? icons.profileTaggedBlue : icons.profileTaggedGrey}
            </li>

        </ul>
    );
};

const SelectedPosts = ({ posts, selected }) => {
    // console.log(selected);

    return (
        <article className="selected-posts">
            {['posts', 'saved', 'tagged'].includes(selected) ?
                <GridView posts={posts} /> :
                <FeedView posts={posts} />
            }
        </article>
    );
};


const GridView = ({ posts }) => (
    <div className="grid-view">
        {
            posts.map(post => (
                <a key={post.id} href={`/posts/${post.id}`}>
                    <img src={post.image_url} alt="post" />
                </a>
            ))
        }

    </div>
);

const FeedView = ({ posts }) => (
    <ul>
        Feed View
    </ul>
);