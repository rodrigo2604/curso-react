import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="app">
                <Navbar brand='Bienvenido al curso React' right>
                    <NavItem href='get-started.html'>Getting started</NavItem>
                    <NavItem href='components.html'>Components</NavItem>
                </Navbar>
            </section>
        );
    }
}

export default App;
