import { ToyReact, Component } from './ToyReact';
class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null
		};
	}
	render() {
		return (
			<div>
				<span>Hello</span>
				<span>World</span>
				<div>
					{true}
					{this.children}
				</div>
			</div>
		);
	}
}

document.Squares = [];
class Square extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
	}
	render() {
		document.Squares[this.props['value']] = this;
		return (
			<button className="square" onClick={() => this.setState({ value: this.state.value === 'X' ? '' : 'X' })}>
				{this.state.value}
			</button>
		);
	}
}

class Board extends Component {
	renderSquare(i) {
		return <Square value={i} />;
	}

	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

let a = <Board />;

ToyReact.render(a, document.body);
