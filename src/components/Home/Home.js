import React, { Component } from 'react'
import axios from 'axios'

import Search from '../Search/Search'

class Home extends Component {
	state = {
		error: '',
		suggestion: [],
		user: {}
	}

	handleSearch = keyword => {
		axios
			.get(`https://api.github.com/users/${keyword}`)
			.then(res =>
				this.setState({
					user: res.data,
					suggestion: []
				})
			)
			.catch(err =>
				this.setState({
					error: err.message
				})
			)
	}

	handleSuggest = keyword => {
		if (keyword.length) {
			axios
				.get(`https://api.github.com/search/users?q=${keyword}`)
				.then(res =>
					this.setState({
						suggestion: res.data.items
					})
				)
				.catch(err => this.setState({ error: err.message }))
		} else {
			this.setState({
				suggestion: []
			})
		}
	}
	render() {
		const { suggestion } = this.state
		return (
			<div>
				<nav className='mb-5' aria-label='breadcrumb'>
					<ol className='breadcrumb bg-light'>
						<li className='breadcrumb-item active' aria-current='page'>
							Home
						</li>
					</ol>
				</nav>
				<Search
					suggestion={suggestion}
					onSearch={this.handleSearch}
					onSuggest={this.handleSuggest}
				>
					@username...
				</Search>
			</div>
		)
	}
}

export default Home
