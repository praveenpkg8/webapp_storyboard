import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CommentItem from './CommentItem';
import UpdateComment from './UpdateComment';

class Comment extends Component {
    static defaultProps = {
        commentDetials: {},
        story: {},
        storyId: {},
        commentList: [],
        user: {},
    };

    constructor(props) {
        super(props);
        const {
            commentDetials,
            story,
            storyId,
            commentList,
            user,
        } = this.props;

        this.state = {
            commentDetials,
            story,
            storyId,
            comments: commentList,
            user,
        };
    }


    reRender = (data) => {
        const { comments } = this.state;
        const list = [data.message, ...comments];
        this.setState({
            comments: list,
        });
    }

    getNextCommment = async () => {
        const { storyId, comments, commentDetials } = this.state;
        const url = `/api/comment?story_id=${storyId}&next_cursor=${commentDetials.commentDetials.next_cursor}`;
        const response = await fetch(url);
        const nextComment = await response.json();
        const arrComments = [...comments, ...nextComment.comment];
        const commentDet = {
            commentDetials: nextComment,
        };
        this.setState({
            comments: arrComments,
            commentDetials: commentDet,
        });
    }

    render() {
        const {
            user, story, comments, commentDetials,
        } = this.state;
        const moreComment = commentDetials.commentDetials.more;
        const { Story } = story;
        /* eslint max-len: ["error", { "code": 160 }] */
        const commentItem = comments.map(comment => <CommentItem key={comment.comment_id} comment={{ comment }} />);
        return (
            <>
                <UpdateComment user={{ user }} stories={{ Story }} render={this.reRender} />

                {commentItem}
                {moreComment ? <button type="button" onClick={this.getNextCommment} className="btn btn-link">Load Comment....</button> : <></> }
            </>
        );
    }
}

Comment.propTypes = {
    commentDetials: PropTypes.objectOf(PropTypes.object),
    story: PropTypes.objectOf(PropTypes.object),
    storyId: PropTypes.string,
    commentList: PropTypes.instanceOf(Array),
    user: PropTypes.objectOf(PropTypes.object),
};

export default Comment;
