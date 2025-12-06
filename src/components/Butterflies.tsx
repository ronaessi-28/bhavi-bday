const Butterflies = () => {
  const butterflies = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 8,
    startY: 20 + Math.random() * 60,
    size: 20 + Math.random() * 16,
    color: i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'accent' : 'secondary',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {butterflies.map((butterfly) => (
        <div
          key={butterfly.id}
          className="absolute butterfly-container"
          style={{
            top: `${butterfly.startY}%`,
            left: '-50px',
            animation: `fly-across ${butterfly.duration}s ease-in-out infinite`,
            animationDelay: `${butterfly.delay}s`,
          }}
        >
          <svg
            width={butterfly.size}
            height={butterfly.size}
            viewBox="0 0 24 24"
            className={`butterfly text-${butterfly.color}`}
            style={{ animation: `flutter 0.3s ease-in-out infinite` }}
          >
            {/* Left Wing */}
            <path
              d="M12 12C12 12 6 6 3 8C0 10 2 14 5 14C8 14 12 12 12 12Z"
              fill="currentColor"
              opacity="0.8"
              className="wing-left"
            />
            {/* Right Wing */}
            <path
              d="M12 12C12 12 18 6 21 8C24 10 22 14 19 14C16 14 12 12 12 12Z"
              fill="currentColor"
              opacity="0.8"
              className="wing-right"
            />
            {/* Lower Left Wing */}
            <path
              d="M12 12C12 12 7 16 4 15C1 14 2 10 5 10C8 10 12 12 12 12Z"
              fill="currentColor"
              opacity="0.6"
            />
            {/* Lower Right Wing */}
            <path
              d="M12 12C12 12 17 16 20 15C23 14 22 10 19 10C16 10 12 12 12 12Z"
              fill="currentColor"
              opacity="0.6"
            />
            {/* Body */}
            <ellipse cx="12" cy="12" rx="1" ry="4" fill="currentColor" opacity="0.9" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default Butterflies;
