import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

import Alert from '../Alert'
import Loader from '../Loader'

class User extends Component {
	state = {
		user: {},
		repos: [],
		error: '',
		loading: false
	}

	componentDidMount() {
		this.setState({
			loading: true
		})
		axios
			.get(`https://api.github.com/users/${this.props.match.params.id}`)
			.then(res =>
				this.setState({
					loading: false,
					user: res.data
				})
			)
			.catch(err =>
				this.setState({
					error: err.message,
					loading: false
				})
			)
	}

	handleGetUserRepos = () => {
		this.setState({
			loading: true
		})
		axios
			.get(`https://api.github.com/users/${this.props.match.params.id}/repos`)
			.then(res =>
				this.setState({
					loading: false,
					repos: res.data
				})
			)
			.catch(err =>
				this.setState({
					error: err.message,
					loading: false
				})
			)
	}
	render() {
		const { user, repos, error, loading } = this.state
		let createdDate = new Date(user.created_at)

		return (
			<div>
				<nav className='mb-5' aria-label='breadcrumb'>
					<ol className='breadcrumb bg-light'>
						<li className='breadcrumb-item'>
							<Link to='/'>Home</Link>
						</li>
						<li className='breadcrumb-item active' aria-current='page'>
							User
						</li>
					</ol>
				</nav>
				{ error.length ? (
					<Alert>{error}</Alert>
				) : null}
				<div className='col-lg-8' />
				{Object.keys(user).length ? (
					<div className='media my-5 p-3 mx-auto border rounded'>
						<img
							src={user.avatar_url}
							alt={user.name}
							className='rounded-circle mr-3'
							width='100'
						/>
						<div className='media-body text-left'>
							<h3 className='mb-0 text-info'>{user.name}</h3>
							<div className='mb-1 text-muted'>
								Joined from {createdDate.toLocaleDateString()}
							</div>
							<p className='mb-auto'>{user.bio}</p>
							<p className='mt-3 mb-auto'>
								<b>{user.public_repos}</b> Public repos
							</p>
							{!repos.length ? (
								<button
									className='btn btn-info mt-3'
									onClick={this.handleGetUserRepos}
								>
									View all public repos
								</button>
							) : (
								<button className='btn btn-info mt-3 disabled'>
									View all public repos
								</button>
							)}
						</div>
					</div>
				) : null}
				{repos ? (
					<ul className='list-group text-left mb-5'>
						{repos.map(item => (
							<li
								key={item.id}
								href={item.html_url}
								className='list-group-item'
							>
								<a href={item.html_url} className='h3 mb-0 text-info'>
									{item.name}
								</a>
								<p className='mb-auto'>{item.description}</p>
								<div className='mb-1 text-muted'>{item.language}</div>
							</li>
						))}
					</ul>
				) : null}
				{loading ? <Loader /> : null}
			</div>
		)
	}
}

export default withRouter(User)
