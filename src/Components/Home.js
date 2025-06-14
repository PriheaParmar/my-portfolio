import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React, { useEffect } from 'react';
import RippleText from './Assets/RippleText';
import './Styles/Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    // Initialize AOS when component mounts
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,       // Allow animations to replay
            mirror: true,      // Animate when scrolling up
            easing: 'ease-in-out',
            offset: 100,
        });
    }, []);

    return (
        <div className="home-page flex justify-between items-center px-12 py-8"
            data-aos="fade-down">
            {/* Lottie Animation */}
            <div
                className="lottie-container"
                data-aos="fade-down"
                style={{
                    width: '500px',
                    height: 'auto',
                    opacity: '70%',
                    transform: 'scaleX(-1)'
                }}
            >
                <DotLottieReact
                    style={{
                        height: '620px',
                        width: '620px',
                        marginLeft: '-10vw',
                        zIndex: '2000'
                    }}
                    data-aos="fade-down"
                    src="https://lottie.host/f36dc3ca-9393-4914-8c76-b8e2693f35f1/D73QSta52O.lottie"
                    loop
                    autoplay
                />
            </div>

            {/* Text Content */}
            <div className="welcome-text">
                <div data-aos="fade-down"> <RippleText text="Hello, You! I'm Priya 🦋" /> </div>
                <div data-aos="fade-right" > <RippleText text="— a creator, a curious soul, and a design-loving coder." /> </div>
                <div data-aos="fade-left"><RippleText text="I craft digital experiences that feel like art" /> </div>
                <div data-aos="fade-right"> <RippleText text="Currently based in Gujarat, India — dreaming globally!" /> </div>
            </div>
        </div>
    );
};

export default Home;