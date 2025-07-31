import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D Canvas Background */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[0, 2, 2]} intensity={1} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#00FFFF"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.1}
            />
          </Sphere>
        </Float>
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Floating Profile Card */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="backdrop-blur-md bg-white/10 text-white rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">👤 Your Profile</h2>
          <div className="space-y-2 text-sm sm:text-base leading-relaxed">
            <p><span className="font-semibold text-cyan-300">Name:</span> {user?.name || "N/A"}</p>
            <p><span className="font-semibold text-cyan-300">Employee ID:</span> {user?.empId || "N/A"}</p>
            <p><span className="font-semibold text-cyan-300">Email:</span> {user?.email || "N/A"}</p>
            <p><span className="font-semibold text-cyan-300">Role:</span> {user?.role || "N/A"}</p>
            <p><span className="font-semibold text-cyan-300">Department:</span> {user?.department || "N/A"}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
