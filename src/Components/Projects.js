import React, { useEffect } from 'react';
import ScrollFloat from './Assets/ScrollFloat'
import InfiniteMenu from './Assets/InfiniteMenu'
import './Styles/Project.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

const items = [
  {
    image: 'https://c0.wallpaperflare.com/preview/136/42/382/gray-galaxy.jpg',
    link: 'https://google.com/',
    title: 'SpaceH',
    description: 'A universe of space wonders by me.'
  },
  {
    image: 'https://m.media-amazon.com/images/I/51-WOQHsWOL.jpg',
    link: 'https://google.com/',
    title: 'Verdecer',
    description: 'Nature-inspired. Tech-powered. Created by me..'
  },
  {
    image: 'https://images.pexels.com/photos/10585474/pexels-photo-10585474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://lamborghini-x.vercel.app/',
    title: 'LamborghiniX',
    description: 'Luxury, speed, and my creative flair'
  },
  {
    image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  ',
    link: 'https://google.com/',
    title: 'LegalBot',
    description: 'Legal help simplified. Built by me.'
  }
];
function Projects() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,       // Allow animations to replay
      mirror: true,      // Animate when scrolling up
      easing: 'ease-in-out',
      offset: 100,
    });
  }, []);
  return <div>
    <div className="project" data-aos="fade-up">


      <div className="project-container">
        <div style={{ height: '570px', position: 'relative' }}>
          <InfiniteMenu items={items} />
        </div></div>
    </div>

  </div>;


}

export default Projects;
