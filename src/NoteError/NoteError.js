import React, { Component } from 'react';

class NoteError extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }
    static getDerivedStateFromError(error){
        return { hasError: true}
    }
    render() {
        if (this.state.hasError) {
            return(
                <h2>Could Not Find this Note</h2>
            );
        }
        return this.props.children
    }
}

export default NoteError;