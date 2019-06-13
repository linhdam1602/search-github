import React, {Component} from 'react'

class Alert extends Component {
	state = {
		showed: true
	}

	hideAlert = () => {
		this.setState({
			showed: false
		})
	}
	
	render() {
		const {children} = this.props
		const {showed} = this.state
		if (!showed) {
			return null
		}
		return (
			<div
				className='alert alert-danger alert-dismissible fade show mb-0'
				role='alert'
			>
				{children}
				<button
					type='button'
					className='close'
					data-dismiss='alert'
					aria-label='Close'
					onClick={this.hideAlert}
				>
					<span aria-hidden='true'>&times;</span>
				</button>
			</div>
		)
	}
}

export default Alert
