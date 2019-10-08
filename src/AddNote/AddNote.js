import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'
import ValidationError from '../ValidationError/ValidationError';

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name: {
        value: '',
        touched: false
      },
      folder: {
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
    static contextType = ApiContext;

  updateName(name) {
    this.setState({name: {value: name, touched: true}});
  }
  updateFolder(folder) {
    this.setState({folder: {value: folder, touched: true}})
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    }
  }

  validateFolder() {
    const folder = this.state.folder.value.trim();
    if (folder === '...') {
      return 'Folder is required'
    } else if (folder.length === 0) {
      return 'Folder is required'
    }
  }
  
    handleSubmit = (event) => {
      event.preventDefault()
      const newNote = {
        name: event.target['noteName'].value,
        content: event.target['noteContent'].value,
        folder_id: event.target['folderId'].value,
        modified: new Date()
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
          this.props.history.push(`/folders/${note.folder_id}`)
        })
        .catch(error => {
          console.error({ error })
        })
    }
  
    render() {
      const nameError = this.validateName();
      const folderError = this.validateFolder();
      const { folders=[] } = this.context
      return (
        <section className='AddNote'>
          <h2 className='addNoteHeader'>Create a note</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label className='addformLabel' htmlFor='nameInput'>
                Name* :  
              </label>
              <input 
                type='text' 
                id='nameInput' 
                name='noteName' 
                onChange={e => this.updateName(e.target.value)}/>
                {this.state.name.touched && (
                  <ValidationError 
                  message={nameError} />
                )}
                
            </div>
            <div>
              <label className='addformLabel' htmlFor='noteContent'>
                Content:  
              </label>
              <textarea id='noteContent' name='noteContent' />
            </div>
            <div>
              <label className='addformLabel' htmlFor='folderSelect'>
                Folder* :  
              </label>
              <select id='folderSelect' name='folderId' onChange={e => this.updateFolder(e.target.value)}>
                <option value={null}>...</option>
                {folders.map(folder =>
                  <option 
                    key={folder.id} 
                    value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
              {this.state.folder.touched && (
                <ValidationError 
                message={folderError}/>
              )}
              <button 
                type='submit'
                disabled={
                  this.validateFolder() ||
                  this.validateName() 
                }>
                Add
              </button>
              <p>*Required Field</p>
            </div>
          </form>
        </section>
      )
    }
  }