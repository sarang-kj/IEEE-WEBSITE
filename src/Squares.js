import { useRef, useEffect, useState } from 'react';

const Squares = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222',
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef();
  const numSquaresY = useRef();
  const gridOffset = useRef({ x: 0, y: 0 });
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 0.8; // Increased line width for more intensity

    const resizeCanvas = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      numSquaresX.current = Math.ceil(window.innerWidth / squareSize) + 2;
      numSquaresY.current = Math.ceil(window.innerHeight / squareSize) + 2;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize - squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize - squareSize;

      // Draw squares with higher opacity for more intensity
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; // Increased opacity
      ctx.lineWidth = 1.2; // Slightly thicker lines

      for (let x = startX; x < canvas.width + squareSize * 2; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize * 2; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          // Calculate grid position for current square
          const gridX = Math.floor((x + (gridOffset.current.x % squareSize)) / squareSize);
          const gridY = Math.floor((y + (gridOffset.current.y % squareSize)) / squareSize);

          if (
            hoveredSquare &&
            gridX === hoveredSquare.x &&
            gridY === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; // Brighter border for hovered square
            ctx.strokeRect(squareX, squareY, squareSize, squareSize);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; // Reset stroke style
          } else {
            ctx.strokeRect(squareX, squareY, squareSize, squareSize);
          }
        }
      }

      // Lighter gradient overlay for more visibility
      const gradientOverlay = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );
      gradientOverlay.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
      gradientOverlay.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
      ctx.fillStyle = gradientOverlay;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Calculate the grid position based on mouse coordinates
      const gridX = Math.floor((mouseX + (gridOffset.current.x % squareSize)) / squareSize);
      const gridY = Math.floor((mouseY + (gridOffset.current.y % squareSize)) / squareSize);

      setHoveredSquare({ x: gridX, y: gridY });
    };

    const handleMouseLeave = () => {
      setHoveredSquare(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, hoveredSquare, squareSize]);

  return (
    <canvas 
      ref={canvasRef} 
      width={dimensions.width}
      height={dimensions.height}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#000000',
        zIndex: 0,
        pointerEvents: 'auto'
      }}
    />
  );
};

export default Squares;
