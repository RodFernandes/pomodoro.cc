import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import './Todo.styl'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

class Todo extends Component {
  constructor () {
    super()
    this.state = {
      editing: false
    }
  }

  startEditing () {
    const { todo, editable } = this.props
    if (!editable) return
    this.setState({ editing: true, editText: todo.text })
    setTimeout(function () {
      findDOMNode(this.refs.editField).focus()
    }.bind(this), 100)
  }

  onBlur () {
    this.setState({ editing: false, editText: '' })
  }

  onChange (event) {
    const editText = event.target.value
    this.setState({ editText })
  }

  onKeyDown (event) {
    const { todo, actions } = this.props
    switch (event.keyCode) {
      case ENTER_KEY: {
        actions.updateTodo({
          ...todo,
          text: this.state.editText
        })
        this.onBlur()
        break
      }
      case ESCAPE_KEY: {
        this.onBlur()
        break
      }
    }
  }

  render () {
    const { todo, actions, completable, editable, deletable } = this.props

    let className = 'todo '
    className += todo.completable ? 'completable ' : ''
    className += todo.editable ? 'editable ' : ''
    className += todo.deletable ? 'deletable ' : ''

    className += todo.completed ? 'completed ' : ''
    className += todo.deleted ? 'deleted ' : ''

    className += (this.state.editing ? 'editing ' : '')
    className += ` ${editable ? 'editable' : ''} ${deletable ? 'deletable' : ''} ${completable ? 'completable' : ''}`

    return <li className={className} id={`todo-${todo.id}`}>
      <div className='normal-view'>
        {completable && <button
          className='complete'
          onClick={() => actions.toggleCompleteTodo(todo)} />}

        <label className='text' onBlur={this.onBlur.bind(this)} onDoubleClick={this.startEditing.bind(this)}>{todo.text}</label>

        {deletable && <button
          className='delete'
          onClick={() => actions.toggleDeleteTodo(todo)} />}
      </div>
      <div className='edit-view'>
        <textarea ref='editField'
          className='edit'
          value={this.state.editText}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          rows={Math.ceil((todo.text || '').length / 30)} />
      </div>
    </li>
  }
}

export default Todo
