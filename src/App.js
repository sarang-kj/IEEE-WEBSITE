import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, Element } from 'react-scroll';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import Squares from './Squares';

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
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  img {
    height: 40px;
    width: auto;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
`;

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: #0066CC;
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

const AboutSection = styled(Section)`
`;

const SocietiesSection = styled(Section)`
`;

const EventsSection = styled(Section)`
`;

const ContactSection = styled(Section)`
`;

const HomeContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 800;
  margin: 0;
  color: #FFFFFF;
  text-shadow: 
    0 0 10px rgba(255,255,255,0.3),
    0 0 20px rgba(0,98,155,0.5),
    0 0 30px rgba(0,98,155,0.3);
  letter-spacing: 2px;
  position: relative;
  z-index: 2;

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, #00629B, transparent);
    
    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(90deg, transparent, #00629B, transparent);
    }
  }
`;

const SubTitle = styled.h2`
  font-size: clamp(2.2rem, 4vw, 3.8rem);
  font-weight: 700;
  margin: 0;
  background: linear-gradient(120deg, #FFFFFF, #00629B);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(0,98,155,0.3);
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.6s ease-out 0.3s forwards;
  letter-spacing: 1px;
  z-index: 2;

  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const Tagline = styled.div`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 600;
  margin-top: 2rem;
  position: relative;
  width: fit-content;
`;

const TypewriterText = styled.span`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 600;
  background: linear-gradient(120deg, #FFFFFF, #00629B);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid #FFFFFF;
  width: 0;
  animation: 
    typing 3.5s steps(45, end) forwards,
    blink-caret 0.7s step-end infinite;
  animation-delay: 0.8s;
  animation-fill-mode: forwards;
  text-shadow: 0 0 15px rgba(0,98,155,0.3);
  letter-spacing: 1px;
  z-index: 2;
  transition: all 0.3s ease;

  @keyframes typing {
    0% { 
      width: 0;
      opacity: 0.8;
    }
    5% {
      opacity: 1;
    }
    100% { 
      width: 100%;
      opacity: 1;
    }
  }

  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: rgba(255, 255, 255, 0.8) }
  }
`;

const AboutButton = styled.button`
  margin-top: 2.5rem;
  padding: 1.2rem 2.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(
    45deg,
    #00629B,
    #0077BE,
    #00629B
  );
  background-size: 200% auto;
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
  box-shadow: 
    0 4px 15px rgba(0, 98, 155, 0.3),
    0 0 30px rgba(0, 98, 155, 0.2);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    padding: 2px;
    background: linear-gradient(45deg, #FFFFFF, #00629B);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    background-position: right center;
    box-shadow: 
      0 6px 20px rgba(0, 98, 155, 0.4),
      0 0 40px rgba(0, 98, 155, 0.3);
  }

  &:hover:before {
    opacity: 1;
  }

  &:active {
    transform: translateY(0);
  }
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
      
      @media (max-width: 768px) {
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(90deg, transparent, #00629B, transparent);
      }
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
    border: 1px solid rgba(0, 98, 155, 0.2);
    min-height: 52px;
    line-height: 1.2;

    &:before {
      content: '→';
      margin-right: 1rem;
      transition: transform 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #00629B;
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      font-size: 1.1rem;
    }

    span {
      flex: 1;
    }

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 150%;
      height: 150%;
      background: radial-gradient(circle, rgba(0,98,155,0.2) 0%, transparent 70%);
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.5s ease;
    }

    &:hover {
      color: #FFFFFF;
      border-color: rgba(0, 98, 155, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      
      &:before {
        transform: translateX(3px);
        color: #FFFFFF;
      }

      &:after {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

const SocialLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    grid-template-columns: repeat(2, minmax(130px, 160px));
  }

  a {
    color: #f0f0f0;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: 12px;
    background: rgba(0, 98, 155, 0.12);
    font-size: 0.95rem;
    gap: 1rem;
    border: 1px solid rgba(0, 98, 155, 0.2);
    position: relative;
    overflow: hidden;
    height: 48px;

    svg {
      width: 22px;
      height: 22px;
      transition: transform 0.3s ease;
      flex-shrink: 0;
    }

    span {
      display: inline-block;
      white-space: nowrap;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      transition: 0.5s;
    }

    &:hover {
      color: #FFFFFF;
      background: rgba(0, 98, 155, 0.25);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      border-color: rgba(0, 98, 155, 0.5);

      svg {
        transform: scale(1.15) rotate(-5deg);
      }

      &:after {
        left: 100%;
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
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid rgba(0, 98, 155, 0.3);
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 98, 155, 0.2);
    
    &:after {
      opacity: 1;
    }
  }
  
  &:after {
    content: 'Click to view in Google Maps';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    text-align: center;
    font-size: 0.9rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    pointer-events: none;
  }
`;

const MapLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #f0f0f0;
  font-size: 0.9rem;

  a {
    color: #00629B;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    padding: 0 0.3rem;

    &:hover {
      color: #FFFFFF;
    }
  }
`;

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled.div`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }

  h3 {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    margin-bottom: 1.5rem;
    background: linear-gradient(120deg, #FFFFFF, #00629B);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 20px rgba(0,98,155,0.3);
  }

  p {
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1rem;
  }
`;

const StatsContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 4rem 0;
  text-align: center;
  margin: 0 auto;
  max-width: 1000px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 2rem 3rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .icon {
    font-size: 3rem;
    color: #FFFFFF;
    margin-bottom: 1rem;
    text-shadow: 0 0 15px rgba(0,98,155,0.5);
  }
  
  .number {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    background: linear-gradient(120deg, #FFFFFF, #00629B);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px rgba(0,98,155,0.3);
  }
  
  .label {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    color: #FFFFFF;
    opacity: 0.9;
    text-shadow: 0 0 10px rgba(0,0,0,0.3);
    white-space: nowrap;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: #FFFFFF;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(120deg, #FFFFFF, #00629B);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(0,98,155,0.3);
  position: relative;
  z-index: 2;
`;

const SectionContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #000000, #0A0A2A 20%, #0B0B3B 40%, #00264d 60%, #003366 80%, #004080 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${props => props.isLoading ? 1 : 0};
  visibility: ${props => props.isLoading ? 'visible' : 'hidden'};
  transition: opacity 0.5s ease, visibility 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(0, 98, 155, 0.2), transparent 70%);
  }
`;

const LogoContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center;
  animation: ${props => props.isLoading ? 'logoAnimation 1.5s ease-out forwards' : 'none'};

  @keyframes logoAnimation {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  img {
    width: 100%;
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

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const currentValue = Math.round(startValue + (end - startValue) * progress);
        setCount(currentValue);
        countRef.current = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    countRef.current = requestAnimationFrame(updateCount);

    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [end, duration]);

  return <span>{count}</span>;
};

function App() {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add typing completion detection
    const timer = setTimeout(() => {
      setIsTypingComplete(true);
    }, 4300); // 0.8s delay + 3.5s typing

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingOverlay isLoading={isLoading}>
        <LogoContainer isLoading={isLoading}>
          <img src="/ieee-logo.png" alt="IEEE Logo" />
        </LogoContainer>
      </LoadingOverlay>
      
      <AppContainer className={isLoading ? 'blurred' : ''}>
        <Navbar>
          <Logo>
            <img src={process.env.PUBLIC_URL + '/ieee-logo.png'} alt="IEEE Logo" />
          </Logo>
          <NavLinks>
            <StyledLink to="home" smooth={true} duration={500}>HOME</StyledLink>
            <StyledLink to="about" smooth={true} duration={500}>ABOUT US</StyledLink>
            <StyledLink to="societies" smooth={true} duration={500}>SOCIETIES</StyledLink>
            <StyledLink to="events" smooth={true} duration={500}>EVENTS</StyledLink>
            <StyledLink to="join" smooth={true} duration={500}>JOIN US</StyledLink>
          </NavLinks>
          <SocialIcons>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
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
            <HomeContent>
              <TextContent>
                <Title>IEEE SB</Title>
                <SubTitle>SAINTGITS</SubTitle>
                <Tagline>
                  <TypewriterText>
                    where humanity meets Technology
                  </TypewriterText>
                </Tagline>
                <Link to="about" smooth={true} duration={500}>
                  <AboutButton 
                    style={{ 
                      opacity: isTypingComplete ? 1 : 0,
                      transform: `translateY(${isTypingComplete ? '0' : '20px'})`,
                      transition: 'opacity 0.5s ease, transform 0.5s ease'
                    }}
                  >
                    ABOUT US
                  </AboutButton>
                </Link>
              </TextContent>
            </HomeContent>
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
                    <div className="number"><Counter end={100} duration={2000} />+</div>
                    <div className="label">Active Members</div>
                  </StatItem>
                  <StatItem>
                    <div className="icon">🏆</div>
                    <div className="number"><Counter end={50} duration={2000} />+</div>
                    <div className="label">Events Conducted</div>
                  </StatItem>
                  <StatItem>
                    <div className="icon">🏛️</div>
                    <div className="number"><Counter end={4} duration={2000} /></div>
                    <div className="label">IEEE Societies</div>
                  </StatItem>
                </StatsContainer>
              </AboutContainer>
            </SectionContent>
          </AboutSection>
        </Element>

        <Element name="societies">
          <SocietiesSection>
            <SectionContent>
              <SectionTitle>Our Societies</SectionTitle>
              {/* Societies content */}
            </SectionContent>
          </SocietiesSection>
        </Element>

        <Element name="events">
          <EventsSection>
            <SectionContent>
              <SectionTitle>Events</SectionTitle>
              {/* Events content */}
            </SectionContent>
          </EventsSection>
        </Element>

        <Element name="join">
          <Section id="join">
            <SectionContent>
              <SectionTitle>Join Us</SectionTitle>
              {/* Join us content */}
            </SectionContent>
          </Section>
        </Element>

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
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                  <span>Twitter</span>
                </a>
              </SocialLinks>
            </FooterSection>
          </FooterContent>
          
          <Copyright>
            Designed and Developed by <a href="#" target="_blank" rel="noopener noreferrer">Sarang KJ</a>
          </Copyright>
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;
