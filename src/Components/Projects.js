import React, { Suspense } from 'react';
import './Styles/Project.css';

const InfiniteMenu = React.lazy(() => import('./Assets/InfiniteMenu'));

const items = [
  {
    image: 'https://c0.wallpaperflare.com/preview/136/42/382/gray-galaxy.jpg',
    link: 'https://sppacee-h.vercel.app/',
    title: 'SpaceH',
    description: 'A universe of space wonders by me.',
  },
  {
    image: 'https://m.media-amazon.com/images/I/51-WOQHsWOL.jpg',
    link: 'https://verdecer.vercel.app/',
    title: 'Verdecer',
    description: 'Nature-inspired. Tech-powered. Created by me..',
  },
  {
    image: 'https://images.pexels.com/photos/10585474/pexels-photo-10585474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://lamborghini-x.vercel.app/',
    title: 'LamborghiniX',
    description: 'Luxury, speed, and my creative flair',
  },
  {
    image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'https://google.com/',
    title: 'LegalBot',
    description: 'Legal help simplified. Built by me.',
  },
];

function Projects() {
  return (
    <div className="project" data-aos="fade-up">
      <div className="project-container">
        <div style={{ height: '570px', position: 'relative' }}>
          <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
            <InfiniteMenu items={items} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Projects);
