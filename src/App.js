import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Search from './components/Search/Search'
import User from './components/User/User'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'
import axios from 'axios';

export default class App extends Component {
  state = {
    author: 'Linh Dam',
    user: {},
    suggestion: []
  }

  handleSearch = keyword => {
    if(keyword.length) {
      axios
        .get(`https://api.github.com/users/${keyword}`)
        .then(res => {
          this.setState({
            user: res.data,
            suggestion: []
          })
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  handleSuggest= keyword => {
    if(keyword.length) {
      axios
        .get(`https://api.github.com/search/users?q=${keyword}`)
        .then(res => {
          this.setState({
            suggestion: res.data.items
          })
        })
        .catch(err => {
          console.log(err.message)
        }) 
    }
  }
  render() {
    const { author, user, suggestion } = this.state
    return (
      <div className='container-fluid text-center h-100'>
        <div className='row m-auto p-3 flex-column h-100'>
          <Header> {author} </Header>
          <main className='col-md-8 m-auto'>
            <Search 
              suggestion={suggestion}
              onSearch={this.handleSearch} 
              onSuggest={this.handleSuggest}
            />
            { Object.keys(user).length ? <User user={user} /> : null}
          </main>
          <Footer> {author} </Footer>
        </div>
      </div>
    )
  }
}