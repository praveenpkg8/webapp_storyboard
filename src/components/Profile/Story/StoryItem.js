import React, { Component } from 'react';

import Comment from './Comment/Comment';

const displayDate = (date) => {
    var _date = new Date(date);
    var today = new Date();
    if (_date.getDate() === today.getDate()) {
        return "Today " + _date.toLocaleTimeString();
    }
    else if (_date.getDate() === today.getDate() - 1){
        return "Yesterday " + _date.toLocaleTimeString();
    }
    return _date.toLocaleString();
}

class Like extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like_count: props.story.like_count,
            liked: props.story.liked,
            story: props.story,
            user: props.user
        }
    }
    flag = true;


    updateLike = async() => {
        if (this.flag) {
            this.flag = false
            var story = this.state.story;
            var user = this.state.user;
            var url = '/api/like?story_id=' + story.story_id + '&mail=' + user.mail;
            const response = await fetch(url)
            const like = await response.json()
            if (response.status === 200){
                this.flag = true;
            }
            this.setState({
                like_count: like.count,
                liked: like.status
            })
        }
        
    }

    render() {
        return (
            <>
            <span  onClick={this.updateLike}className="btn badge badge-primary">{this.state.liked ? <>unlike</> : <>like</>} <span className="badge badge-primary">{this.state.like_count}</span></span>
            </>
        )
    }
}
export default class StoryItem extends Component {
    render() {
        var story = this.props.story
        var day = displayDate(story.time);
        return (
              <>
              <div className="card w-75">
                    <div className="card-body">
                        <h5 className="card-title">{story.name}</h5>
                        <span className="badge-inline badge-pill badge-light">{day}</span>
                        <p className="card-text">{story.story}</p>
                        <Like 
                        key={this.props.story.story_id} 
                        user={this.props.user} 
                        story={story} 
                        />
                        <Comment  
                        story={story}
                        story_id={story.story_id} 
                        commentDetials={story.comments} 
                        commentList={story.comments.comment}
                        user={this.props.user}
                        />
                    </div>
                </div>
              </>
        )
    }
}