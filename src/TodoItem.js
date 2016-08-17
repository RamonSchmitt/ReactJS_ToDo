import React from 'react';
import $ from 'jquery';

class TodoItem extends React.Component {
	constructor() {
	super();

	this.state = {
		loading: true
		};
	}

	componentDidMount() {
		this.setState({
			id: this.props.id,
			title: this.props.title,
			completed: this.props.completed,
			createdAt: this.props.createdAt,
			updatedAt: this.props.updatedAt,
			loading: !!!this.props.id
		});
	}

	toggleChecked(event) {
		this.syncState({
			completed: this.refs.completed.checked
		});
	}

	syncState(updatedState) {
		console.log("Syncing state!");

		this.setState({
			loading: true
		});

		let component = this;

		let newState = $.extend({
			id: this.state.id,
			title: this.state.title,
			completed: this.state.completed
		}, updatedState);

		this.setState(newState);

		$.ajax({
			type: "PUT",
			url: `https://vast-sands-74158.herokuapp.com/todos/${this.props.id}.json`,
			data: JSON.stringify({
			todo: newState
			}),
			contentType: "application/json",
			dataType: "json"
		})
			.done(function(data) {
				console.log(data);

				component.setState({
					id: data.id,
					title: data.title,
					completed: data.completed,
					createdAt: data.created_at,
					updatedAt: data.updated_at
				});
			})
			.fail(function(error) {
				console.log(error);
			})
			.always(function() {
				component.setState({
					loading: false
				});
				component.props.onChange();
			});
	}

	deleteTodo(e) {
		e.preventDefault();

		let component = this;

		$.ajax({
			type: "DELETE",
			url: `https://vast-sands-74158.herokuapp.com/todos/${this.props.id}.json`,
			contentType: "application/json",
			dataType: "json"
		})
			.done(function(data) {
				console.log(data);
			})
			.fail(function(error) {
				console.log(error);
			})
			.always(function() {
				component.props.onDestroy();
			});
	}

	render() {
		console.log(this.state.id);
    return (
				<li>
					<input className="toggle" id={this.state.id} type="checkbox" ref="completed" checked={this.state.completed ? "checked" : ""} onClick={this.toggleChecked.bind(this)} />
					<p>	{this.props.title} </p>
					<a href="#" onClick={this.deleteTodo.bind(this)}>delete</a>
				</li>
    );
  }
}

export default TodoItem;
