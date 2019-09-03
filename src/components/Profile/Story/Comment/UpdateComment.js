import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UpdateComment extends Component {
    flag = true;

    static defaultProps = {
        user: {},
        stories: {},
        render: '',
    };


    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            user: props.user.user,
            stories: props.stories.Story,
        };
    }

    handleChange = (event) => {
        const { target } = event;
        const { name } = target;
        const { value } = target;
        this.setState({
            [name]: value,
        });
    }

    async postComment() {
        if (this.flag) {
            this.flag = false;
            const { user, stories, comment } = this.state;
            if (comment === '') {
                this.flag = true;
                return null;
            }
            this.setState({
                comment: '',
            });
            const setting = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    story_id: stories.story_id,
                    mail: user.user.mail,
                    name: user.user.name,
                    comment,
                }),
            };
            const commentResponse = await fetch('/api/comment', setting);
            const Updatedcomment = await commentResponse.json();
            const { render } = this.props;
            if (commentResponse.status === 200) {
                render(Updatedcomment);
                this.flag = true;
            }
        }
        return null;
    }

    render() {
        const { comment } = this.state;
        return (
            <>
                <div className="input-group mb-3">
                    <input
                        name="comment"
                        type="text"
                        value={comment}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Comment"
                        aria-label="Comment"
                        aria-describedby="button-addon2"
                    />
                    <div className="input-group-append">
                        <button
                            type="button"
                            onClick={() => this.postComment()}
                            className="btn btn-outline-secondary"
                        >
Comment
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

UpdateComment.propTypes = {
    render: PropTypes.func,
    stories: PropTypes.objectOf(PropTypes.object),
    user: PropTypes.objectOf(PropTypes.object),
};


export default UpdateComment;
