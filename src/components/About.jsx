import React from 'react';

const About = ({ match }) => (
  <section>
    <h2>Página de acerca de</h2>
    <h3>Tipo de contacto: {match.params.typeContact}</h3>
  </section>
);

export default About;
