import React, { Component } from 'react'

export default class UpdateComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            user: props.user,
            stories: props.stories
        }
    }
    flag = true
    handleChange = (event) => {
        var target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
          });
    }

    async postComment() {
        if (this.flag) {
            this.flag = false
            let user = this.state.user;
            let story = this.state.stories;
            let _comment = this.state.comment;
            if (_comment === '') {
                this.flag = true;
                return null;
            }
            this.setState({ 
                comment: '',
            })
            const setting = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({
                    story_id: story.story_id,
                    mail: user.mail,
                    name: user.name,
                    comment: _comment
                    })
            }
            const commentResponse = await fetch('/api/comment', setting);
            const comment = await commentResponse.json();
            if (commentResponse.status === 200){
                this.props.render(comment)
                this.flag = true;
            }
        }
        
        

    }

    render() {
        return (
            <>
            <div className="input-group mb-3">
                             <input 
                             name='comment'
                             type='text'
                             value={this.state.comment}
                             onChange={this.handleChange}
                             className="form-control" placeholder="Comment" aria-label="Comment" aria-describedby="button-addon2" />
                             <div className="input-group-append">
                                <button onClick={() => this.postComment()} className="btn btn-outline-secondary">Comment</button>
                            </div>
                        </div>
            </>
        )
    }
}
