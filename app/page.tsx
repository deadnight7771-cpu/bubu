import LoginCard from "@/components/LoginCard";
import AnimationLayers from "@/components/AnimationLayers";

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: "url('/bg.png') center/cover no-repeat",
        backgroundColor: "#fff0f4",
      }}
    >
      {/* Gradient keyframe */}
      <style>{`
        @keyframes gradShift {
          0%   { background-position: 0% 50%;   }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%;   }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Soft glow orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            background: "radial-gradient(circle,rgba(255,100,150,0.18) 0%,transparent 70%)",
            top: -150, left: -150,
            animation: "orbDrift1 14s ease-in-out infinite",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            background: "radial-gradient(circle,rgba(255,150,180,0.14) 0%,transparent 70%)",
            bottom: -100, right: -100,
            animation: "orbDrift2 18s ease-in-out infinite",
            filter: "blur(50px)",
          }}
        />
      </div>
      <style>{`
        @keyframes orbDrift1 {
          0%,100% { transform:translate(0,0) scale(1); }
          33%     { transform:translate(60px,40px) scale(1.1); }
          66%     { transform:translate(-30px,60px) scale(0.95); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform:translate(0,0); }
          50%     { transform:translate(-50px,-40px) scale(1.08); }
        }
      `}</style>

      {/* Floating background hearts + corner Bubu Dudu characters */}
      <AnimationLayers />

      {/* Main login card */}
      <LoginCard />
    </main>
  );
}
