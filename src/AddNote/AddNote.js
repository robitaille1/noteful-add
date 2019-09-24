import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'

export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
    static contextType = ApiContext;
  
    handleSubmit = (event) => {
      event.preventDefault()
      const newNote = {
        name: event.target['noteName'].value,
        content: event.target['noteContent'].value,
        folderId: event.target['folderId'].value,
      }
      fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newNote),
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(event => Promise.reject(event))
          return res.json()
        })
        .then(note => {
          this.context.addNote(note)
          this.props.history.push(`/folder/${note.folderId}`)
        })
        .catch(error => {
          console.error({ error })
        })
    }
  
    render() {
      const { folders=[] } = this.context
      return (
        <section className='AddNote'>
          <h2 className='addNoteHeader'>Create a note</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label className='addformLabel' htmlFor='nameInput'>
                Name:  
              </label>
              <input type='text' id='nameInput' name='noteName' />
            </div>
            <div>
              <label className='addformLabel' htmlFor='noteContent'>
                Content:  
              </label>
              <textarea id='noteContent' name='noteContent' />
            </div>
            <div>
              <label className='addformLabel' htmlFor='folderSelect'>
                Folder:  
              </label>
              <select id='folderSelect' name='folderId'>
                <option value={null}>...</option>
                {folders.map(folder =>
                  <option 
                    key={folder.id} 
                    value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
              <button type='submit'>
                Add
              </button>
            </div>
          </form>
        </section>
      )
    }
  }