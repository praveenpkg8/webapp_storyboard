import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment/Comment';

const displayDate = (date) => {
    const Ddate = new Date(date);
    const today = new Date();
    if (Ddate.getDate() === today.getDate()) {
        return `Today ${Ddate.toLocaleTimeString()}`;
    }
    if (Ddate.getDate() === today.getDate() - 1) {
        return `Yesterday ${Ddate.toLocaleTimeString()}`;
    }
    return Ddate.toLocaleString();
};

class Like extends Component {
    flag = true;

    static defaultProps = {
        story: {},
        user: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            likeCount: props.story.Story.like_count,
            liked: props.story.Story.liked,
            story: props.story.Story,
            user: props.user.user,
        };
    }


    updateLike = async () => {
        if (this.flag) {
            this.flag = false;
            const { story } = this.state;
            const { user } = this.state;
            const url = `/api/like?story_id=${story.story_id}&mail=${user.mail}`;
            const response = await fetch(url);
            const like = await response.json();
            if (response.status === 200) {
                this.flag = true;
            }
            this.setState({
                likeCount: like.count,
                liked: like.status,
            });
        }
    }

    render() {
        const { liked, likeCount } = this.state;
        return (
            <>
                <button type="button" onClick={this.updateLike} className="btn badge badge-primary">
                    {liked ? <>unlike</> : <>like</>}
                    {' '}
                    <span className="badge badge-primary">{likeCount}</span>
                </button>
            </>
        );
    }
}

Like.propTypes = {
    story: PropTypes.objectOf(PropTypes.object),
    user: PropTypes.objectOf(PropTypes.object),

};

const StoryItem = (props) => {
    const { story, user } = props;
    const Story = story.story;
    const commentDetials = Story.comments;
    const day = displayDate(Story.time);

    return (
        <>
            <div className="card w-75">
                <div className="card-body">
                    <h5 className="card-title">{Story.name}</h5>
                    <span className="badge-inline badge-pill badge-light">{day}</span>
                    <p className="card-text">{Story.story}</p>
                    { Story.edit ? <div>can edit</div> : <div />}
                    <Like
                        key={story.story.story_id}
                        user={{ user }}
                        story={{ Story }}
                    />
                    <Comment
                        story={{ Story }}
                        storyId={Story.story_id}
                        commentDetials={{ commentDetials }}
                        commentList={Story.comments.comment}
                        user={user}
                    />
                </div>
            </div>
        </>
    );
};

StoryItem.defaultProps = {
    story: {},
    user: {},
};

StoryItem.propTypes = {
    story: PropTypes.objectOf(PropTypes.object),
    user: PropTypes.objectOf(PropTypes.object),
};

export default StoryItem;
