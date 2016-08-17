import React from 'react';
import $ from 'jquery';

class AddTodoForm extends React.Component {


	addNewTodo(event){
    event.preventDefault();
		let component = this;
		let title = this.refs.addTodoInput.value;

		let newTodo = {
			id: null,
			title: title,
			completed: false
		};

	$.ajax({
		type: "POST",
		url: `https://vast-sands-74158.herokuapp.com/todos.json`,
		data: JSON.stringify({
			todo: newTodo
		}),
		contentType: "application/json",
		dataType: "json"
	})
		.done(function(data) {
			component.props.onChange();
			component.refs.addTodoInput.value = "";
		})
		.fail(function(error) {
			console.log(error);
		});
	}

  render() {
    return (
				<form onSubmit={this.addNewTodo.bind(this)}>
						<input ref="addTodoInput" placeholder="What needs to be done?" />
						<button>+</button>
				</form>
    );
  }
}

export default AddTodoForm;
