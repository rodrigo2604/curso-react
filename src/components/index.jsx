import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="app">
                <Navbar href="#" className="padding-left teal lighten-2" brand='React' right>
                    <NavItem href='#'>Getting started</NavItem>
                    <NavItem href='#'>Components</NavItem>
                </Navbar>
            </section>
        );
    }
}

export default App;
