import React, { Component } from 'react'
import _ from 'lodash';
import Logo from '../../logo'


export default class Search extends Component {
  state = {
    value: '',
    suggestion: []
  }

  componentWillReceiveProps(props) {
    this.setState({
      suggestion: props.suggestion
    })
  }

  onHandleChange = e => {
    this.setState({
      value: e.target.value,
      suggestion: []
    })
    this.getSuggest(this.state.value)
  }

  getSuggest = _.debounce(value => {
    this.props.onSuggest(value)
  }, 300)

  onHandleSubmit = e => {
    e.preventDefault()
    this.props.onSearch(this.state.value)
    this.setState({
      suggestion: []
    })
  }

  handleClickSuggestion = keyword => {
    this.props.onSearch(keyword)
    this.setState({
      suggestion: []
    })
  }

  render() {
    const { value, suggestion } = this.state
    return (
      <form onSubmit={this.onHandleSubmit}>
        <div className='form-inline justify-content-center h-100' >
          <label className='search'>
            Search for repositories on &nbsp; <Logo /> &nbsp;&nbsp;
          </label>
          <div className='form-group dropdown'>
            <input
              type='text'
              id='search'
              name='search'
              placeholder='@username...'
              className='form-control'
              autoComplete='off'
              onChange={this.onHandleChange}
            />
            {
              suggestion.length ? (
                <div className="dropdown-menu w-100 show">
                  {suggestion &&
                    suggestion.map(
                      (item, i) =>
                        i < 10 && (
                          <a
                            href={`#${item.id}`}
                            key={item.id}
                            className="dropdown-item text-truncate px-3"
                            onClick={() => this.handleClickSuggestion(item.login)}
                          >
                            <img
                              className="rounded-circle mr-3"
                              src={item.avatar_url}
                              alt={item.login}
                              height="30"
                              width="30"
                            />
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item.login.replace(
                                  new RegExp(value, 'gi'),
                                  str => `<b>${str}</b>`
                                )
                              }}
                            />
                          </a>
                        )
                    )}
                </div>
              ) : null}
          </div>
        </div>
      </form>
    )
  }
}
