import { motion } from 'framer-motion';

export default function FloatingOrbs({ className = '' }) {
    const orbs = [
        {
            size: 400,
            x: '10%',
            y: '20%',
            gradient: 'from-violet-500/20 to-purple-500/20',
            delay: 0
        },
        {
            size: 300,
            x: '70%',
            y: '10%',
            gradient: 'from-cyan-500/15 to-blue-500/15',
            delay: 2
        },
        {
            size: 250,
            x: '80%',
            y: '60%',
            gradient: 'from-primary/15 to-violet-500/15',
            delay: 4
        },
        {
            size: 350,
            x: '5%',
            y: '70%',
            gradient: 'from-emerald-500/10 to-cyan-500/10',
            delay: 1
        },
        {
            size: 200,
            x: '50%',
            y: '40%',
            gradient: 'from-rose-500/10 to-orange-500/10',
            delay: 3
        },
    ];

    return (
        <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
            {orbs.map((orb, index) => (
                <motion.div
                    key={index}
                    className={`absolute rounded-full bg-gradient-to-br ${orb.gradient} blur-3xl`}
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.x,
                        top: orb.y,
                    }}
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -30, 20, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 20 + index * 2,
                        delay: orb.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
