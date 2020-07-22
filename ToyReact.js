class ElementWrapper {
	constructor(type) {
		this.root = document.createElement(type);
	}
	setAttribute(name, value) {
		if (name.match(/^on([\s\S]+)$/)) {
			let eventname = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLowerCase());
			this.root.addEventListener(eventname, value);
			return;
		}
		if (name == 'className') {
			name = 'class';
		}
		this.root.setAttribute(name, value);
	}
	appendChild(vchild) {
		let range = document.createRange();
		if (this.root.children.length) {
			range.setStartAfter(this.root.lastChild);
			range.setEndAfter(this.root.lastChild);
		} else {
			range.setStart(this.root, 0);
			range.setEnd(this.root, 0);
		}
		vchild.mountTo(range);
	}
	mountTo(range) {
		range.deleteContents();
		range.insertNode(this.root);
	}
}

class TextWrapper {
	constructor(content) {
		this.root = document.createTextNode(content);
	}
	mountTo(range) {
		range.deleteContents();
		range.insertNode(this.root);
	}
}

export class Component {
	constructor(props) {
		this.children = [];
		this.props = Object.create(null);
	}
	mountTo(range) {
		this.range = range;
		this.update();
	}
	update() {
		// let placeHolder = document.createComment('placeHolder');
		// let range = document.createRange();
		// range.setStart(this.range.endContainer, this.range.endOffset);
		// range.setEnd(this.range.endContainer, this.range.endOffset);
		// range.insertNode(placeHolder);
		this.range.deleteContents();
		var vdom = this.render();
		vdom.mountTo(this.range);
	}
	setAttribute(name, value) {
		this.props[name] = value;
		this[name] = value;
	}
	appendChild(child) {
		this.children.push(child);
	}
	setState(state) {
		let merge = (oldstate, newstate) => {
			for (let p in newstate) {
				if (typeof newstate[p] === 'object') {
					if (typeof oldstate[p] !== 'object') {
						oldstate[p] = {};
						merge(oldstate[p], newstate[p]);
					}
				} else {
					oldstate[p] = newstate[p];
				}
			}
		};
		if (!this.state && state) {
			this.state = {};
		}
		merge(this.state, state);
		this.update();
	}
}

export let ToyReact = {
	createElement: (type, attributes, ...children) => {
		let element;
		if (typeof type === 'string') {
			element = new ElementWrapper(type);
		} else {
			element = new type();
		}
		for (const name in attributes) {
			element.setAttribute(name, attributes[name]);
		}
		let insertChildren = (children) => {
			for (const child of children) {
				if (typeof child === 'object' && child instanceof Array) {
					insertChildren(child);
				} else {
					if (
						!(child instanceof Component) &&
						!(child instanceof ElementWrapper) &&
						!(child instanceof TextWrapper)
					) {
						child = String(child);
					}
					if (typeof child === 'string') {
						child = new TextWrapper(child);
					}
					element.appendChild(child);
				}
			}
		};
		insertChildren(children);
		return element;
	},
	render(vdom, element) {
		let range = document.createRange();
		if (element.children) {
			range.setStartAfter(element.lastChild);
			range.setEndAfter(element.lastChild);
		} else {
			range.setStartAfter(element, 0);
			range.setEndAfter(element, 0);
		}

		vdom.mountTo(range);
	}
};
