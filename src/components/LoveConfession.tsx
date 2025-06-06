import { useState, useEffect } from 'react';
import loveImage from '../assets/love.jpg';

const LoveConfession = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; animationDuration: number }>>([]);
  const [noButtonClicks, setNoButtonClicks] = useState(0);
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);

  // Messages that change as user tries to click "No"
  const noButtonTexts = [
    "No 💔",
    "Are you sure? 🥺",
    "Really? 😢",
    "Think again! 💭",
    "Please? 🙏",
    "Don't break my heart! 💔",
    "One more chance? 🌹"
  ];

  useEffect(() => {
    // Generate floating hearts animation
    const heartInterval = setInterval(() => {
      if (showFloatingHearts) {
        const newHeart = {
          id: Date.now() + Math.random(),
          left: Math.random() * 1000,
          animationDuration: 3 + Math.random() * 2
        };
        setHearts(prev => [...prev, newHeart]);
        
        // Remove heart after animation
        setTimeout(() => {
          setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
        }, 5000);
      }
    }, 300);

    return () => clearInterval(heartInterval);
  }, [showFloatingHearts]);

  const handleNoButtonHover = () => {
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    let randomX, randomY;
    
    if (noButtonClicks >= 20) {
      // Position the No button exactly over the Yes button
      randomX = window.innerWidth / 2 - 100; // Center position
      randomY = window.innerHeight / 2 + 50; // Slightly below center
    } else {
      randomX = Math.random() * maxX;
      randomY = Math.random() * maxY;
    }
    
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoButtonClicks(prev => Math.min(prev + 1, noButtonTexts.length - 1));
  };

  const handleYesClick = () => {
    setShowMessage(true);
    setShowFloatingHearts(true);
  };

  const containerStyle: React.CSSProperties = {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: `linear-gradient(135deg, rgba(255, 107, 157, 0.5), rgba(165, 9, 234, 0.9), rgba(165, 94, 234, 0.2)), url(${loveImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover', // Add this line
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    color: 'white'
  };

  const backgroundStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  };

  const sparkleStyle = (i: number): React.CSSProperties => ({
    position: 'absolute',
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    opacity: 0.2,
    animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 5}s`
  });

  const heartFloatStyle = (heart: { id: number; left: number; animationDuration: number }): React.CSSProperties => ({
    position: 'absolute',
    left: `${heart.left}%`,
    bottom: '-10px',
    fontSize: '2rem',
    opacity: 0.8,
    pointerEvents: 'none',
    animation: `floatUp ${heart.animationDuration}s ease-out forwards`
  });

  const mainContentStyle: React.CSSProperties = {
    textAlign: 'center',
    zIndex: 10,
    maxWidth: '500px',
    margin: '0 auto'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
    animation: 'pulse 2s infinite'
  };

  const heartIconStyle = {
    fontSize: 'clamp(4rem, 12vw, 6rem)',
    animation: 'bounce 2s infinite',
    marginBottom: '2rem'
  };

  const questionStyle = {
    fontSize: 'clamp(1.2rem, 5vw, 2rem)',
    fontWeight: '600',
    marginBottom: '3rem',
    textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
    lineHeight: '1.4'
  };

  const buttonsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: window.innerWidth < 640 ? 'column' : 'row',
    gap: '1.5rem',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const yesButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(45deg, #4CAF50, #45a049)',
    color: 'white',
    fontWeight: 'bold',
    padding: '1rem 2rem',
    borderRadius: '50px',
    fontSize: 'clamp(1rem, 4vw, 1.25rem)',
    border: 'none',
    cursor: 'pointer',
    transform: 'scale(1)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    minWidth: '200px',
    animation: 'pulse 2s infinite'
  };

  const noButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(45deg, #ff4444, #cc0000)',
    color: 'white',
    fontWeight: 'bold',
    padding: '1rem 2rem',
    borderRadius: '50px',
    fontSize: 'clamp(1rem, 4vw, 1.25rem)',
    border: 'none',
    cursor: 'pointer',
    transform: 'scale(1)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    minWidth: '200px',
    position: noButtonClicks > 0 ? 'fixed' : 'static',
    left: noButtonClicks > 0 ? `${noButtonPosition.x}px` : 'auto',
    top: noButtonClicks > 0 ? `${noButtonPosition.y}px` : 'auto',
    zIndex: 1000
  };

  const hintStyle = {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '0.9rem',
    marginTop: '1rem',
    animation: 'fadeIn 0.8s ease-out'
  };

  const successContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    zIndex: 10,
    maxWidth: '500px',
    margin: '0 auto',
    animation: 'fadeIn 0.8s ease-out'
  };

  const successTitleStyle = {
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
    animation: 'bounce 1s infinite'
  };

  const successHeartStyle = {
    fontSize: 'clamp(4rem, 12vw, 6rem)',
    animation: 'heartBeat 1.5s infinite',
    marginBottom: '2rem',
    display: 'inline-block'
  };

  const glassCardStyle = {
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '30px',
    padding: 'clamp(1.5rem, 5vw, 3rem)',
    border: '1px solid rgba(255,255,255,0.3)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
  };

  const loveMessageStyle = {
    fontSize: 'clamp(1.2rem, 5vw, 2rem)',
    fontWeight: '600',
    marginBottom: '1rem',
    lineHeight: '1.4'
  };

  const signatureStyle = {
    fontSize: 'clamp(1rem, 4vw, 1.25rem)',
    fontStyle: 'italic',
    opacity: 0.9
  };

  const additionalMessageStyle = {
    marginTop: '1.5rem',
    opacity: 0.8,
    fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
    lineHeight: '1.6'
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-30px); }
          60% { transform: translateY(-15px); }
        }
        
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes heartBeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        button:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
        }
        
        @media (max-width: 640px) {
          .buttons-container {
            flex-direction: column;
          }
        }
      `}</style>

      <div style={containerStyle}>
        {/* Animated background elements */}
        <div style={backgroundStyle}>
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div key={i} style={sparkleStyle(i)}>
              ✨
            </div>
          ))}
          
          {/* Floating hearts when "Yes" is clicked */}
          {hearts.map(heart => (
            <div key={heart.id} style={heartFloatStyle(heart)}>
              💖
            </div>
          ))}
        </div>

        {!showMessage ? (
          <div style={mainContentStyle}>
            {/* Main title with enhanced styling */}
            <div>
              <h1 style={titleStyle}>
                Hi Anamika 
              </h1>
              <div style={heartIconStyle}>
                💖
              </div>
            </div>

            {/* Question */}
            <div>
              <p style={questionStyle}>
                Do you still love Shivam?
              </p>
            </div>

            {/* Buttons container */}
            <div style={buttonsContainerStyle} className="buttons-container">
              {/* Yes button */}
              <button
                onClick={handleYesClick}
                style={yesButtonStyle}
              >
                Yes, I do! 💖
              </button>

              {/* No button that runs away */}
              <button
                onMouseEnter={handleNoButtonHover}
                onTouchStart={handleNoButtonHover}
                style={noButtonStyle}
              >
                {noButtonTexts[noButtonClicks]}
              </button>
            </div>

            {/* Hint text */}
            {noButtonClicks > 2 && (
              <p style={hintStyle}>
                The "No" button is shy! 😊
              </p>
            )}
          </div>
        ) : (
          <div style={successContainerStyle}>
            {/* Success message */}
            <div>
              <h1 style={successTitleStyle}>
                I knew it! 👩‍❤️‍👨
              </h1>
              <div style={successHeartStyle}>
                💖
              </div>
            </div>

            <div style={glassCardStyle}>
              <p style={loveMessageStyle}>
                Love you more, Anamika! 💕
              </p>
              
              <div style={signatureStyle}>
               ~ Eternally Yours, Shivam 💗
              </div>
              
              {/* Additional romantic message */}
              <div style={additionalMessageStyle}>
                <p>You make my heart skip a beat! 💓</p>
                <p style={{marginTop: '0.5rem'}}>Always and forever yours 🌹</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoveConfession;