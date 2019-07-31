import React, { Component } from 'react';


export default class UpdateStory extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            story: '',
            name: props.user_detials.name,
            mail: props.user_detials.mail,
            user: props.user_detials,
            render: true,
            file: null,
            display: 'none'
        }
    }
    
    flag = true;

    handleChange = (event) => {
        let target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    handlePreview = (event) => {
        try{
            this.setState({
                file: URL.createObjectURL(event.target.files[0]),
                display: 'inline-block'
            })
        }catch{
            this.setState({
                file: null
            });
        }
    }

    componentDidMount() {
    }

    postStory = async() => {
        console.log('posting story')
        if(this.flag){
            this.flag = false;
            let _story = this.state.story;
            if(_story === '') {
                this.flag = true;
                return null
            }
            this.setState({
                story: '',
                display: 'none'
            })
            const storyObj = {
                name: this.state.name,
                mail: this.state.mail,
                story: _story
            }

            const setting = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(storyObj)
            }
            try{
                const message = await fetch('/api/story', setting);
                const data = await message.json();
                if (message.status === 200){
                    this.props.render(data);
                    this.flag = true;
                }
            }catch{}
        }
    }

    onPreview = () => {
        document.getElementById('preview').click()
    }

    onClickme = () => {
        this.setState({
            file: null,
            display: 'none'
        })
    }

    

    render (){
        return (
        <>
         <div className="card w-75" >
            <div
            style={{
                display: this.state.display,
                position: 'relative',
            }}
            >
            <img src={this.state.file}
            style={{
                height: "400px",
                widht: '500px'
            }}
            className='img-fluid'
            />
            <button type="button" className="close" aria-label="Close"  
            onClick={this.onClickme}
            style={{
                position: "absolute",
                top: 0,
                right: 0,
            }}
            >
            <span aria-hidden="true">x</span>
            </button>
            </div>
            <div className="card-body">
            <textarea
            name='story'
            type='textarea'
            className="form-control"
            value={this.state.story}
            onChange={this.handleChange}
            />

            <input 
            id='preview'
            type='file'
            placeholder='Enter Story......'
            style={{
                height:'0px',
                display:'none'
            }}
            onChange={this.handlePreview}
            />
            {/* <button className='btn btn-info' onClick={this.onPreview} >Upload</button> */}

   
            <button className="btn btn-warning" onClick={(e) => this.postStory(e) }>Post</button>
            </div>
            </div>
            
        </>
        )
    }
}