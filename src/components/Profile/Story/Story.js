import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StoryItem from './StoryItem';
import UpdateStory from './UpdateStory';


const URL = '/api/story';
class Story extends Component {
    static defaultProps = {
        user: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            loadStories: false,
            user: props.user,
        };
    }

    componentWillMount() {
        this.getAllStories();
    }


    handleChange = (event) => {
        const { target } = event;
        const { name } = target;
        const { value } = target;
        this.setState({
            [name]: value,
        });
    }


    reRender = (data) => {
        const { stories } = this.state;
        const list = [data.message, ...stories];
        this.setState({
            stories: list,
        });
    }

    getAllStories = async () => {
        const story = await fetch(URL, { credentials: 'include' });
        const stories = await story.json();
        this.setState({
            storyDetials: stories,
            stories: stories.message,
            loadStories: true,
        });
    }

    getNextStory = async () => {
        const { storyDetials, stories } = this.state;
        const url = `/api/story?next_cursor=${storyDetials.next_cursor}`;
        const response = await fetch(url, { credentials: 'include' });
        const resStories = await response.json();
        const story = [...stories, ...resStories.message];
        this.setState({
            storyDetials: resStories,
            stories: story,
        });
    }

    render() {
        const {
            loadStories, stories, storyDetials, user,
        } = this.state;
        if (loadStories) {
        /* eslint max-len: ["error", { "code": 160 }] */

            const storyItem = stories.map(story => <StoryItem key={story.story_id} story={{ story }} user={{ user }} />);
            return (
                <>
                    <UpdateStory
                        user_detials={{ user }}
                        render={this.reRender}
                    />
                    {storyItem}
                    { storyDetials.more ? <button type="button" onClick={this.getNextStory} className="btn btn-link">Load Stories....</button> : <></>}


                </>
            );
        }


        return <></>;
    }
}

Story.propTypes = {
    user: PropTypes.instanceOf(Object),
};

export default Story;
