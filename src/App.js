                  import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, Element } from 'react-scroll';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import Squares from './Squares';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link as RouterLink, 
  useParams, 
  useNavigate 
} from 'react-router-dom';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: #000000;
`;

const Navbar = styled.nav`
  background-color: white;
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Logo = styled.div`
  img {
    height: 40px;
    width: auto;
  }

  @media (max-width: 768px) {
    img {
      height: 30px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: white;
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #333;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    color: #00629B;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 2px;
      background-color: #00629B;
      opacity: 0.5;
    }
  }

  &.active {
    color: #00629B;
    font-weight: 600;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 2px;
      background-color: #00629B;
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 0.75rem;

    &.active {
      background-color: rgba(0, 98, 155, 0.1);
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  a {
    color: #333;
    font-size: 1.2rem;
    transition: color 0.3s;

    &:hover {
      color: #0066CC;
    }
  }
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 120px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HomeSection = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: 120px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: transparent;
`;

const AboutSection = styled(Section)``;
const SocietiesSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #000000, #0B0B3B);
  position: relative;
  z-index: 1;
`;
const EventsSection = styled(Section)``;
const ContactSection = styled(Section)``;

const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
    align-items: center;
    justify-content: center;
  }
`;

const Title = styled.h1`
  font-size: clamp(3.5rem, 7vw, 6rem);
  font-weight: 700;
  margin: 0 auto;
  background: linear-gradient(120deg, #FFFFFF, #00629B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  line-height: 1.2;
  letter-spacing: -0.02em;
  width: 100%;
  max-width: 900px;
  
  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 6vw, 4rem);
    padding: 0 1rem;
  }
`;

const SubTitle = styled.h2`
  font-size: clamp(2.2rem, 5vw, 4.2rem);
  font-weight: 700;
  margin: 1rem auto;
  background: linear-gradient(120deg, #FFFFFF, #00629B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  line-height: 1.3;
  width: 100%;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 4.5vw, 3rem);
    padding: 0 1rem;
    margin: 0.5rem auto;
  }
`;

const TypewriterText = styled.div`
  font-size: 1.5rem;
  color: #FFFFFF;
  margin-top: 1.5rem;
  opacity: 0.9;
  min-height: 2em;
  position: relative;
  
  &:after {
    content: '|';
    position: absolute;
    right: -4px;
    top: 0;
    animation: blink 0.7s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin: 1rem auto;
  }
`;

const Typewriter = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <TypewriterText>{displayText}</TypewriterText>;
};

const AboutButton = styled.button`
  margin-top: 2.5rem;
  padding: 1.2rem 2.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #FFFFFF;
  background: transparent;
  border: 2px solid #FFFFFF;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: #00629B;
    transition: width 0.3s ease;
    z-index: -1;
  }

  &:hover {
    border-color: #00629B;
    
    &:before {
      width: 100%;
    }
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  color: #FFFFFF;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #FFFFFF;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #00629B, transparent);
  }
`;

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  h3 {
    color: #FFFFFF;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 2rem 3rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.3);
  }
  
  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #00629B;
    margin-bottom: 0.5rem;
  }
  
  .label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease;
  opacity: ${props => props.isLoading ? 1 : 0};
  pointer-events: ${props => props.isLoading ? 'auto' : 'none'};
`;

const LogoContainer = styled.div`
  img {
    width: 200px;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 20px rgba(0, 98, 155, 0.5));
  }
`;

const SquaresWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Footer = styled.footer`
  background: linear-gradient(180deg, #000000, #0B0B3B);
  color: #FFFFFF;
  padding: 4rem 0 1rem 0;
  position: relative;
  z-index: 2;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 3rem;
  padding: 0 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #FFFFFF;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    position: relative;
    padding-bottom: 0.8rem;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #00629B, transparent);
      transition: width 0.3s ease;
      
      @media (max-width: 768px) {
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(90deg, transparent, #00629B, transparent);
      }
    }

    &:hover:after {
      width: 100px;
    }
  }
`;

const Address = styled.div`
  line-height: 1.8;
  color: #f0f0f0;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
  border-left: 3px solid rgba(0, 98, 155, 0.3);
  transition: all 0.3s ease;

  &:hover {
    border-left-color: rgba(0, 98, 155, 0.8);
    padding-left: 2rem;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    border-left: none;
    text-align: center;
  }
`;

const QuickLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 1.2rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0.5rem auto 0;
  }

  a {
    color: #f0f0f0;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    padding: 1rem 1.2rem;
    border-radius: 12px;
    background: rgba(0, 98, 155, 0.08);
    font-size: 0.95rem;
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transform: translateX(-100%) translateY(-50%) skewX(-15deg);
      transition: transform 0.5s ease;
    }

    &:hover {
      background: rgba(0, 98, 155, 0.15);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 98, 155, 0.2);

      &:before {
        transform: translateX(100%) translateY(-50%) skewX(-15deg);
      }
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1rem;
  border: 2px solid rgba(0, 98, 155, 0.3);
  transition: all 0.3s ease;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const MapLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  
  &:hover ${MapContainer} {
    border-color: rgba(0, 98, 155, 0.6);
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 98, 155, 0.15);
  }

  &:active ${MapContainer} {
    transform: translateY(-1px);
  }
`;

const SocialLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0.5rem auto 0;
  }

  a {
    color: #f0f0f0;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 1.2rem;
    border-radius: 12px;
    background: rgba(0, 98, 155, 0.08);
    font-size: 0.95rem;
    
    svg {
      width: 24px;
      height: 24px;
      transition: transform 0.3s ease;
    }

    &:hover {
      background: rgba(0, 98, 155, 0.15);
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 98, 155, 0.2);

      svg {
        transform: scale(1.1) rotate(5deg);
      }
    }

    &:active {
      transform: translateY(-1px);
    }
  }
`;

const SocietiesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const SocietyCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 250px;
  width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    .know-more-btn {
      opacity: 1;
      transform: translateY(0);
    }

    &:before {
      opacity: 1;
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  h3 {
    color: #FFFFFF;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    position: relative;
    z-index: 2;
  }

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 2;
  }
`;

const KnowMoreButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: #00629B;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 2;
  font-weight: 500;

  &:hover {
    background: #0077be;
  }
`;

const BackToHomeButton = styled(KnowMoreButton)`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  margin: 2rem auto;
  display: block;
  width: fit-content;
  background: #1e3799;
  &:hover {
    background: #0c2461;
  }
`;

const SocietyPage = styled.div`
  padding: 8.5rem 2rem;  /* Increased from 6rem to 8.5rem (added 25px) */
  background: linear-gradient(180deg, #000000, #0B0B3B);
  min-height: 100vh;
  color: white;
`;

const SocietyDescription = styled.div`
  max-width: 800px;
  margin: 0 auto 4rem;
  text-align: center;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #FFFFFF;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const YearSelect = styled.select`
  width: 200px;
  padding: 0.8rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  margin-bottom: 2rem;
  cursor: pointer;
  
  option {
    background: #0B0B3B;
    color: white;
  }
`;

const SocietyDetails = {
  'student-branch': {
    title: 'IEEE Student Branch',
    description: 'The IEEE Student Branch at our college serves as a hub for technical innovation and professional development. We organize various events, workshops, and activities that help students enhance their technical skills and stay updated with the latest technological advancements.',
    logo: '/ieee-sb-logo.png'
  },
  'ias': {
    title: 'Industry Applications Society (IAS)',
    description: 'IEEE IAS provides a platform for professionals and students interested in the advancement of electrical and electronic engineering in industrial applications. We focus on industrial electronics, power systems, and automation.',
    logo: '/ieee-ias-logo.png'
  },
  'wie': {
    title: 'Women in Engineering (WIE)',
    description: 'IEEE WIE is dedicated to promoting women engineers and scientists, inspiring girls to follow their academic interests in engineering and science. We organize events and mentorship programs specifically focused on supporting women in technical fields.',
    logo: '/ieee-wie-logo.png'
  },
  'pes': {
    title: 'Power & Energy Society (PES)',
    description: "IEEE PES provides the world's largest forum for sharing the latest in technological developments in the electric power industry. We focus on the generation, transmission, distribution, and utilization of electric power.",
    logo: '/ieee-pes-logo.png'
  }
};

const ExecomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ExecomCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 1rem;
    object-fit: cover;
  }

  h3 {
    color: #FFFFFF;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const YearSelectContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  label {
    display: block;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
`;

// Mock data for ExeCom members
const execomData = {
  'student-branch': {
    2024: [
      { name: 'John Doe', position: 'Chair', image: '/execom/sb-chair-2024.jpg' },
      { name: 'Jane Smith', position: 'Vice Chair', image: '/execom/sb-vice-chair-2024.jpg' },
      { name: 'Mike Johnson', position: 'Secretary', image: '/execom/sb-secretary-2024.jpg' },
      { name: 'Sarah Williams', position: 'Treasurer', image: '/execom/sb-treasurer-2024.jpg' }
    ],
    2023: [
      { name: 'Previous Chair', position: 'Chair', image: '/execom/sb-chair-2023.jpg' },
      { name: 'Previous Vice', position: 'Vice Chair', image: '/execom/sb-vice-chair-2023.jpg' }
    ]
  },
  'ias': {
    2024: [
      { name: 'IAS Chair', position: 'Chair', image: '/execom/ias-chair-2024.jpg' },
      { name: 'IAS Vice', position: 'Vice Chair', image: '/execom/ias-vice-2024.jpg' }
    ]
  },
  'wie': {
    2024: [
      { name: 'WIE Chair', position: 'Chair', image: '/execom/wie-chair-2024.jpg' },
      { name: 'WIE Vice', position: 'Vice Chair', image: '/execom/wie-vice-2024.jpg' }
    ]
  },
  'pes': {
    2024: [
      { name: 'PES Chair', position: 'Chair', image: '/execom/pes-chair-2024.jpg' },
      { name: 'PES Vice', position: 'Vice Chair', image: '/execom/pes-vice-2024.jpg' }
    ]
  }
};

const GallerySection = styled.div`
  margin-top: 4rem;
  padding: 2rem 0;
`;

const GalleryTitle = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const GalleryImage = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
    
    .image-overlay {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .image-title {
    color: white;
    margin: 0;
    font-size: 0.9rem;
  }

  .image-date {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    margin-top: 0.3rem;
  }
`;

const galleryData = {
  'student-branch': [
    {
      id: 1,
      image: '/gallery/sb/event1.jpg',
      title: 'Technical Workshop 2024',
      date: 'January 15, 2024'
    },
    {
      id: 2,
      image: '/gallery/sb/event2.jpg',
      title: 'Orientation Program',
      date: 'December 10, 2023'
    }
  ],
  'ias': [
    {
      id: 1,
      image: '/gallery/ias/event1.jpg',
      title: 'Industrial Visit',
      date: 'January 20, 2024'
    },
    {
      id: 2,
      image: '/gallery/ias/event2.jpg',
      title: 'Technical Talk',
      date: 'December 5, 2023'
    }
  ],
  'wie': [
    {
      id: 1,
      image: '/gallery/wie/event1.jpg',
      title: 'Women in Tech Conference',
      date: 'January 25, 2024'
    },
    {
      id: 2,
      image: '/gallery/wie/event2.jpg',
      title: 'Mentorship Program',
      date: 'December 15, 2023'
    }
  ],
  'pes': [
    {
      id: 1,
      image: '/gallery/pes/event1.jpg',
      title: 'Power Systems Workshop',
      date: 'January 10, 2024'
    },
    {
      id: 2,
      image: '/gallery/pes/event2.jpg',
      title: 'Renewable Energy Seminar',
      date: 'December 20, 2023'
    }
  ]
};

function SocietyPageContent() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const { id } = useParams();
  const navigate = useNavigate();
  const years = ['2024', '2023', '2022', '2021'];
  const details = SocietyDetails[id];
  const members = execomData[id]?.[selectedYear] || [];
  const gallery = galleryData[id] || [];

  if (!details) {
    navigate('/');
    return null;
  }

  return (
    <SocietyPage>
      <SocietyDescription>
        <h2>{details.title}</h2>
        <p>{details.description}</p>
      </SocietyDescription>
      
      <YearSelectContainer>
        <label>Select ExeCom Year</label>
        <YearSelect 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map(year => (
            <option key={year} value={year}>
              {year} ExeCom
            </option>
          ))}
        </YearSelect>
      </YearSelectContainer>

      <ExecomGrid>
        {members.length > 0 ? (
          members.map((member, index) => (
            <ExecomCard key={index}>
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </ExecomCard>
          ))
        ) : (
          <div style={{ 
            gridColumn: '1/-1', 
            textAlign: 'center', 
            color: 'rgba(255, 255, 255, 0.7)',
            padding: '2rem'
          }}>
            No ExeCom data available for {selectedYear}
          </div>
        )}
      </ExecomGrid>

      <GallerySection>
        <GalleryTitle>Event Gallery</GalleryTitle>
        <GalleryGrid>
          {gallery.map((item) => (
            <GalleryImage key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="image-overlay">
                <h3 className="image-title">{item.title}</h3>
                <p className="image-date">{item.date}</p>
              </div>
            </GalleryImage>
          ))}
        </GalleryGrid>
      </GallerySection>

      <RouterLink to="/">
        <BackToHomeButton>
          Back to Home
        </BackToHomeButton>
      </RouterLink>
    </SocietyPage>
  );
}

function NumberCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const endValue = parseInt(end);

    const updateCount = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        setCount(Math.floor(endValue * progress));
        countRef.current = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    countRef.current = requestAnimationFrame(updateCount);

    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [end, duration, hasStarted]);

  return <span ref={elementRef}>{count}</span>;
}

function App() {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'societies', 'events', 'join'];
      const scrollPosition = window.scrollY;
      const offset = 150; // Increased offset to better detect sections

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          
          if (
            scrollPosition >= offsetTop - offset &&
            scrollPosition < offsetTop + rect.height - offset
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check after a short delay to ensure elements are properly positioned
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close mobile menu when a link is clicked
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingComplete(true);
    }, 4300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/society/:id" element={<SocietyPageContent />} />
      </Routes>
    </Router>
  );
}

function MainContent() {
  const [isTypingComplete] = useState(true);
  const [activeSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <LoadingOverlay isLoading={true}>
        <LogoContainer isLoading={true}>
          <img src="/ieee-logo.png" alt="IEEE Logo" />
        </LogoContainer>
      </LoadingOverlay>
      
      <AppContainer className={true ? 'blurred' : ''}>
        <Navbar>
          <Logo>
            <img src="/ieee-logo.png" alt="IEEE Logo" />
          </Logo>
          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </MenuButton>
          <NavLinks isOpen={isMenuOpen}>
            <NavLink
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={activeSection === 'home' ? 'active' : ''}
              onClick={handleLinkClick}
              onSetActive={() => setActiveSection('home')}
            >
              HOME
            </NavLink>
            <NavLink
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={activeSection === 'about' ? 'active' : ''}
              onClick={handleLinkClick}
              onSetActive={() => setActiveSection('about')}
            >
              ABOUT US
            </NavLink>
            <NavLink
              to="societies"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={activeSection === 'societies' ? 'active' : ''}
              onClick={handleLinkClick}
              onSetActive={() => setActiveSection('societies')}
            >
              SOCIETIES
            </NavLink>
            <NavLink
              to="events"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={activeSection === 'events' ? 'active' : ''}
              onClick={handleLinkClick}
              onSetActive={() => setActiveSection('events')}
            >
              EVENTS
            </NavLink>
            <NavLink
              to="join"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={activeSection === 'join' ? 'active' : ''}
              onClick={handleLinkClick}
              onSetActive={() => setActiveSection('join')}
            >
              JOIN US
            </NavLink>
          </NavLinks>
          <SocialIcons>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
              LinkedIn
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
              Instagram
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
              Twitter
            </a>
          </SocialIcons>
        </Navbar>

        <Element name="home">
          <HomeSection id="home-section">
            <SquaresWrapper>
              <Squares 
                speed={0.2} 
                squareSize={40}
                direction='diagonal'
                borderColor='rgba(255, 255, 255, 0.3)'
                hoverFillColor='rgba(255, 255, 255, 0.2)'
              />
            </SquaresWrapper>
            <HeroContent>
              <Title>IEEE SB</Title>
              <SubTitle>SAINTGITS</SubTitle>
              <Typewriter text="where humanity meets Technology" delay={100} />
              <RouterLink to="about" smooth={true} duration={500}>
                <AboutButton 
                  style={{ 
                    opacity: isTypingComplete ? 1 : 0,
                    transform: `translateY(${isTypingComplete ? '0' : '20px'})`,
                    transition: 'opacity 0.5s ease, transform 0.5s ease'
                  }}
                >
                  ABOUT US
                </AboutButton>
              </RouterLink>
            </HeroContent>
          </HomeSection>
        </Element>

        <Element name="about">
          <AboutSection>
            <SectionContent>
              <SectionTitle>About Us</SectionTitle>
              <AboutContainer>
                <Card>
                  <h3>Saintgits College of Engineering</h3>
                  <p>Saintgits College of Engineering, established in 2002, stands as a beacon of excellence in technical education under the visionary leadership of the Malankara Syrian Catholic Church.</p>
                  <p>Nestled in the serene hills of Kottukulam, the college boasts state-of-the-art infrastructure including advanced laboratories, a comprehensive library, and modern research facilities.</p>
                  <p>The institution has consistently maintained an outstanding academic record with high placement rates, supported by experienced faculty members and industry collaborations.</p>
                </Card>

                <Card>
                  <h3>IEEE SB Saintgits</h3>
                  <p>IEEE Student Branch Saintgits, established with a vision to foster technological innovation, has grown into one of the most active student branches in the Kerala Section.</p>
                  <p>Our branch hosts numerous technical workshops, conferences, and hackathons throughout the year, providing students with hands-on experience in cutting-edge technologies.</p>
                  <p>Through our mentorship programs and industry connect initiatives, we create a bridge between academic learning and professional development, helping students evolve into skilled engineers.</p>
                </Card>

                <StatsContainer>
                  <StatItem>
                    <div className="icon">👥</div>
                    <div className="number"><NumberCounter end="500" /></div>
                    <div className="label">Student Members</div>
                  </StatItem>
                  <StatItem>
                    <div className="icon">🌟</div>
                    <div className="number"><NumberCounter end="50" /></div>
                    <div className="label">Events Organized</div>
                  </StatItem>
                  <StatItem>
                    <div className="icon">🏛️</div>
                    <div className="number">4</div>
                    <div className="label">IEEE Societies</div>
                  </StatItem>
                </StatsContainer>
              </AboutContainer>
            </SectionContent>
          </AboutSection>
        </Element>

        <Element name="societies" id="societies">
          <SocietiesSection>
            <SectionTitle>Our Societies</SectionTitle>
            <SocietiesContainer>
              <SocietyCard>
                <img src="/ieee-sb-logo.png" alt="IEEE Student Branch" />
                <h3>Student Branch</h3>
                <RouterLink to="/society/student-branch">
                  <KnowMoreButton className="know-more-btn">Know More</KnowMoreButton>
                </RouterLink>
              </SocietyCard>
              
              <SocietyCard>
                <img src="/ieee-ias-logo.png" alt="IEEE IAS" />
                <h3>IAS</h3>
                <RouterLink to="/society/ias">
                  <KnowMoreButton className="know-more-btn">Know More</KnowMoreButton>
                </RouterLink>
              </SocietyCard>
              
              <SocietyCard>
                <img src="/ieee-wie-logo.png" alt="IEEE WIE" />
                <h3>WIE</h3>
                <RouterLink to="/society/wie">
                  <KnowMoreButton className="know-more-btn">Know More</KnowMoreButton>
                </RouterLink>
              </SocietyCard>
              
              <SocietyCard>
                <img src="/ieee-pes-logo.png" alt="IEEE PES" />
                <h3>PES</h3>
                <RouterLink to="/society/pes">
                  <KnowMoreButton className="know-more-btn">Know More</KnowMoreButton>
                </RouterLink>
              </SocietyCard>
            </SocietiesContainer>
          </SocietiesSection>
        </Element>

        <Element name="events">
          <EventsSection>
            <SectionContent>
              <SectionTitle>Events</SectionTitle>
              {/* Add your events content here */}
            </SectionContent>
          </EventsSection>
        </Element>

        <Element name="join">
          <ContactSection>
            <SectionContent>
              <SectionTitle>Join Us</SectionTitle>
              {/* Add your join us content here */}
            </SectionContent>
          </ContactSection>
        </Element>
      </AppContainer>
      <Footer>
        <FooterContent>
          <FooterSection>
            <h3>Contact Us</h3>
            <Address>
              IEEE Student Branch<br />
              Saintgits College of Engineering<br />
              Kottukulam Hills, Pathamuttom P. O,<br />
              Kottayam, Kerala - 686532<br />
            </Address>
            <MapLink 
              href="https://www.google.com/maps/place/Saintgits+College+of+Engineering/@9.5244876,76.5427043,17z/data=!3m1!4b1!4m6!3m5!1s0x3b062ed484f475a7:0xea66b8c2a599b8a2!8m2!3d9.5244876!4d76.5427043!16s%2Fg%2F11c1nlw4k4?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapContainer>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.7098531407583!2d76.54270427496015!3d9.524487590241076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ed484f475a7%3A0xea66b8c2a599b8a2!2sSaintgits%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1705517364095!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Saintgits College of Engineering Location"
                />
              </MapContainer>
            </MapLink>
          </FooterSection>
          
          <FooterSection>
            <h3>Quick Links</h3>
            <QuickLinks>
              <a href="https://www.ieee.org/" target="_blank" rel="noopener noreferrer">
                <span>IEEE Official Website</span>
              </a>
              <a href="https://ieeexplore.ieee.org/" target="_blank" rel="noopener noreferrer">
                <span>IEEE Xplore Digital Library</span>
              </a>
              <a href="https://ieee-collabratec.ieee.org/" target="_blank" rel="noopener noreferrer">
                <span>IEEE Collabratec Community</span>
              </a>
              <a href="https://spectrum.ieee.org/" target="_blank" rel="noopener noreferrer">
                <span>IEEE Spectrum Magazine</span>
              </a>
            </QuickLinks>
          </FooterSection>

          <FooterSection>
            <h3>Connect With Us</h3>
            <SocialLinks>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.68 1.68 0 0 0-1.68 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                </svg>
                <span>Instagram</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
                <span>Facebook</span>
              </a>
            </SocialLinks>
          </FooterSection>
        </FooterContent>
      </Footer>
    </>
  );
}

export default App;
