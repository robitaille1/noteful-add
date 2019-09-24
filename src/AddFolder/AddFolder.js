import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'


export default class AddFolder extends Component {
    static defaultProps = {
        history: {
          push: () => { }
        },
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
                        id='folderNameInput' />
                    <button             
                        type='submit'>
                        Submit
                    </button>
                </fieldset>
            </form>
        </div>
        ) 
    }
}

