import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import "./about.scss";

export default function About() {
  return (
    <section id='about-section'>
      <Container className='aboutContainer'>
        <Row className='about-row'><Col><div className="matthew-image"></div></Col><Col><h2>Matthew Barnhart</h2><p>"Matt has a decade of experience managing people and serving his community thoughtful and enjoyable experiences. He also enjoys coffee, cooking, and connecting with people. He aspires to making positive changes in his community by supporting people to the best of his abilities!"</p></Col></Row> 
        <Row className='about-row'><Col><h2>Brennan Roorda</h2><p>"Hi, I am Brennan Roorda, I am a software developer student. After years of working many different jobs, many temp jobs, i decided I really needed a career. I stumbled into DeltaV and have been loving it ever since. I enjoy using my desire to create new things, and utilize my problem solving and troubleshooting skills. I can't wait to able to utilize me new skills in my new career!"</p></Col><Col><div className="brennan-image"></div></Col></Row>
        <Row className='about-row'><Col><div className="sihem-image"></div></Col><Col><h2>Sihem Azibi</h2><p>"My name is Sihem Azibi. I came to the United States 6 years ago from the country of Algeria. I studied computer science there and graduated with a Master's degree in information systems. When I joined my husband in the United States in 2013, I didn't speak English so I had to start from the bottom of the workforce. I started by working in retail stores then worked as a school bus driver for the Iowa City Community School District for 5 years. I recently heard about DeltaV coding school. I decided to join for the 101 class to see how it was and ended up signing for all of the courses through 401. It was about time for me to go back to what I am most passionate about; computer science ."</p></Col></Row>
        <Row className='about-row'><Col><h2>James Zobian</h2><p>"My name is James Zobian, I am a software developer with experience in tech support, customer service, and communication. I first became interested in programming when I was 14 working on game mods and a homebrew online rpg with a friend of mine. That was my first exposure to code and it piqued my interest as a possible career path. I came to DeltaV to hone my skill and learn new languages that would put me ahead of the curve with proficiency in hirable technologies while giving me the skills and techniques to standout from my peers and competition."</p></Col><Col><div className="james-image"></div></Col></Row>    
      </Container>
    </section>
  );
}


