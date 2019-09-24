import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'


export default class AddFolder extends Component {
    static defaultProps = {
        history: {
          push: () => { }
        },
      }
    static contextType = ApiContext;

    submitForm = (event) => {
        event.preventDefault();
        const folder = {
            name: event.target['folderName'].value
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
        })
            .then(response => {
                if (response.ok)
                    return response.json().then(e => Promise.reject(e))
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
            <form onSubmit={this.submitForm}>
                <fieldset>
                    <label htmlFor='folderNameInput'>
                        Name:
                    </label>
                    <input
                        type='text'
                        name='folderName' />
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

