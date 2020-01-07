import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundery from '../components/ErrorBoundery';
import './App.css';

import {setSearchField, requestRobots} from '../actions.js'

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	};
}

class App extends Component {
	// constructor () {
	// 	super();
	// 	this.state={
	// 		robots: []
	// 	}
	// }

	componentDidMount() {
		this.props.onRequestRobots();
		// fetch('https://jsonplaceholder.typicode.com/users')
		// .then(response => response.json())
		// .then(users => this.setState({robots:users}));
	}

	// onSearchChange = (event) => {
	// 	this.setState ({ searchfield: event.target.value});
	// }

	render (){

			const {searchField, onSearchChange, robots, isPending} = this.props;
			const filteredRobots = robots.filter(robot => {
				return robot.name.toLowerCase().includes(searchField)
			});

			if (robots.length === 0) {
				return <h1 className='tc'> LOADING </h1>
			} else {
				return (
					<div className='tc'>
						<h1 className='f1'> RoboFriends </h1>
						<SearchBox searchChange={onSearchChange} />
						<Scroll>
							<ErrorBoundery>
								<CardList robots={filteredRobots} />
							</ErrorBoundery>
						</Scroll>
				    </div>
				);
			}

	}

}

export default connect(mapStateToProps,mapDispatchToProps)(App);