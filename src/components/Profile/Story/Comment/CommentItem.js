import React from 'react';
import PropTypes from 'prop-types';

const CommentItem = (props) => {
    const { comment } = props;
    const Comment = comment.comment;
    return (
        <>
            <div>
                <span className="badge badge-pill badge-secondary">{Comment.name}</span>
                {' '}
                {Comment.comment}
                <hr />
            </div>
        </>
    );
};

CommentItem.defaultProps = {
    comment: {},
};

CommentItem.propTypes = {
    comment: PropTypes.objectOf(PropTypes.object),
};

export default CommentItem;
