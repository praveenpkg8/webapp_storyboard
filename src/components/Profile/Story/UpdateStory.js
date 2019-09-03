import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


export default class UpdateStory extends Component {
    flag = true;

    static defaultProps = {
        user_detials: {},
        render: null,
    };


    constructor(props) {
        super(props);
        this.state = {
            story: '',
            name: props.user_detials.user.name,
            mail: props.user_detials.user.mail,
            file: null,
            display: 'none',
            redirect: false,
        };
    }

    componentDidMount() {
    }


    handleChange = (event) => {
        const { target } = event;
        const { name } = target;
        const { value } = target;
        this.setState({
            [name]: value,
        });
    }

    handlePreview = (event) => {
        try {
            this.setState({
                file: URL.createObjectURL(event.target.files[0]),
                display: 'inline-block',
            });
        } catch {
            this.setState({
                file: null,
            });
        }
    }

    postStory = async () => {
        if (this.flag) {
            this.flag = false;
            const { story, name, mail } = this.state;
            if (story === '') {
                this.flag = true;
                return null;
            }
            this.setState({
                story: '',
                display: 'none',
            });
            const storyObj = {
                name,
                mail,
                story,
            };

            const setting = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storyObj),
            };
            try {
                const message = await fetch('/api/story', setting);
                const data = await message.json();
                const { render } = this.props;
                if (message.status === 200) {
                    render(data);
                    this.flag = true;
                } else if (message.status === 400) {
                    this.setState({
                        redirect: true,
                    });
                }
            } catch {
            // Error occured
            }
        }
        return null;
    }

    onPreview = () => {
        document.getElementById('preview').click();
    }

    onClickme = () => {
        this.setState({
            file: null,
            display: 'none',
        });
    }


    render() {
        const {
            display, file, story, redirect,
        } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        }
        return (
            <>
                <div className="card w-75">
                    <div
                        style={{
                            display,
                            position: 'relative',
                        }}
                    >
                        <img
                            src={file}
                            alt="imaged"
                            style={{
                                height: '400px',
                                widht: '500px',
                            }}
                            className="img-fluid"
                        />
                        <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={this.onClickme}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            }}
                        >
                            <span aria-hidden="true">x</span>
                        </button>
                    </div>
                    <div className="card-body">
                        <textarea
                            name="story"
                            type="textarea"
                            className="form-control"
                            value={story}
                            onChange={this.handleChange}
                        />

                        <input
                            id="preview"
                            type="file"
                            placeholder="Enter Story......"
                            style={{
                                height: '0px',
                                display: 'none',
                            }}
                            onChange={this.handlePreview}
                        />
                        <button type="button" className="btn btn-warning" onClick={e => this.postStory(e)}>Post</button>
                    </div>
                </div>

            </>
        );
    }
}

UpdateStory.propTypes = {
    user_detials: PropTypes.objectOf(PropTypes.object),
    render: PropTypes.func,
};
