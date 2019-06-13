import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import User from '../User/User'
import Home from '../Home/Home'

export default class App extends Component {
  state = {
    author: 'Linh Dam'
  }

  render() {
		const { author } = this.state
		return (
			<div className='container-fluid h-100 text-center'>
				<div className='row w-100 h-100 p-3 mx-auto flex-column'>
					<Header> {author} </Header>
					<main className='col-lg-8 m-auto'>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/user/:id' component={User} />
						</Switch>
					</main>
					<Footer>{author}</Footer>
				</div>
			</div>
		)
	}
}