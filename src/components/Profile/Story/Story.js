import React, { Component } from 'react';
import StoryItem from './StoryItem';
import UpdateStory from './UpdateStory';


const URL = '/api/story';

export default class Story extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            loadStories: false,
            user: props.user,
            story: "",
        }
    }

    handleChange = (event) => {
        var target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
          });

    }

    componentWillMount() {
        this.getAllStories ()
    }

    reRender = (data) => {
        let story = this.state.stories
        let list = [data.message,...story]
        this.setState({
            stories: list
        })
    }

    getAllStories = async() => {
        console.log('get story working')
        const story = await fetch(URL, {credentials: 'include'})
        const stories = await story.json()
        this.setState({ 
            story_detials: stories,
            stories: stories.message,
            loadStories: true
        })
        console.log(this.state.stories)
    }

    getNextStory = async() => {
        let story_detials = this.state.story_detials
        let url = '/api/story?next_cursor=' + story_detials.next_cursor
        const response = await fetch(url, {credentials: 'include'})
        const stories = await response.json()
        let story = [...this.state.stories, ...stories.message]
        this.setState({
            story_detials: stories,
            stories: story
        })
    }

    render () {
        if (this.state.loadStories) {
            let stories = this.state.stories;
            let story_detials = this.state.story_detials;
            const storyItem = stories.map((story) => <StoryItem key={story.story_id} story={story} user={this.state.user} />);
            return (
            <>
            <UpdateStory
                user_detials={this.state.user}
                render={this.reRender}
            />
            {storyItem}
            { story_detials.more ? <button type="button" onClick={this.getNextStory} className="btn btn-link">Load Stories....</button> : <></>}
            
            
            </>
            )
        }

        
        return <></>
        
    }
}