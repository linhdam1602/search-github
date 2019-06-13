import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import _ from 'lodash'

import Logo from '../logo'

class Search extends Component {
	state = {
		value: '',
		suggestion: [],
		redirect: false
	}

	componentWillReceiveProps(props) {
		this.setState({
			suggestion: props.suggestion
		})
	}

	getSuggest = _.debounce(value => {
		this.props.onSuggest(value)
	}, 500)

	handleChange = ({ target: { value } }) => {
		this.setState({
			value,
			suggestion: []
		})
		this.getSuggest(value)
	}

	handleSubmit = e => {
		e.preventDefault()
		this.setState({
			redirect: true,
			suggestion: []
		})
	}

	render() {
		const { value, suggestion, redirect } = this.state
		const { children } = this.props

		if (redirect === true) {
			return <Redirect to={`/user/${value}`} />
		}
		return (
			<form
				className='form-inline justify-content-center'
				onSubmit={this.handleSubmit}
			>
				<label className='m-2'>
					Search for repositories on
					<a className='mx-2' href='https://github.com/'>
						<Logo />
					</a>
					with:
				</label>
				<div className='form-group dropdown'>
					<input
						type='text'
						name='q'
						className='form-control'
						autoComplete='off'
						placeholder={children}
						value={value}
						onChange={this.handleChange}
					/>
					{suggestion.length ? (
						<div className='dropdown-menu w-100 show'>
							{suggestion &&
								suggestion.map(
									(item, i) =>
										i < 10 && (
											<Link
												key={item.id}
												className='dropdown-item text-truncate px-3'
												to={`/user/${item.login}`}
											>
												<img
													className='rounded-circle mr-3'
													src={item.avatar_url}
													alt={item.login}
													height='30'
													width='30'
												/>
												<span
													dangerouslySetInnerHTML={{
														__html: item.login.replace(
															new RegExp(value, 'gi'),
															str => `<b>${str}</b>`
														)
													}}
												/>
											</Link>
										)
								)}
						</div>
					) : null}
				</div>
			</form>
		)
	}
}

export default Search
