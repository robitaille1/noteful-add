import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'
import ValidationError from '../ValidationError/ValidationError'


export default class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            }
        }
    }
    static defaultProps = {
        history: {
          push: () => { }
        },
      }
    updateFolderName(name) {
        this.setState({name: {value: name, touched: true}} )
    }  

    validateFolderName(fieldValue) {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        }
    }

    static contextType = ApiContext;

    handleSubmit = (event) => {
        event.preventDefault();
        const newFolder = {
            name: event.target['folderName'].value
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFolder),
        })
            .then(res => {
                if (!res.ok)
                return res.json().then(event => Promise.reject(event))
                return res.json()
            })
            .then(folder => {
                this.context.addFolder(folder)
                this.props.history.push(`/`)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const nameError = this.validateFolderName();
        return(
            <div className='AddFolder'>
            <h2>Create a new folder!</h2>
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <label htmlFor='folderNameInput'>
                        Name:
                    </label>
                    <input
                        type='text'
                        name='folderName'
                        id='folderNameInput'
                        onChange={e => this.updateFolderName(e.target.value)} />
                    {this.state.name.touched && (
                        <ValidationError 
                            message={nameError}/>
                    )}
                    <button             
                        type='submit'
                        disabled={this.validateFolderName()}>
                        Submit
                    </button>
                </fieldset>
            </form>
        </div>
        ) 
    }
}

