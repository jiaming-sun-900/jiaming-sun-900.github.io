// ═══════════════════════════════════════════════════════════
// Jiaming Sun v2.2 — Premium Tech Interaction
// ═══════════════════════════════════════════════════════════

document.addEventListener('mousemove', (e) => {
    // This calculates the mouse position as a percentage of the screen
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    // This passes the coordinates to our CSS variables
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

console.log("Anthropic Mode: Mouse-Tracking Glow Active.");
