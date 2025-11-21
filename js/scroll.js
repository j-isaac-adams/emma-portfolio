// Wait for the HTML page to fully load
document.addEventListener("DOMContentLoaded", () => {
  
    // --- SVG Squiggle Scroll Animation ---
    const svg = document.querySelector("svg.squiggle");
  
    // Check if the svg exists on this page
    if (svg) {
      const path = svg.querySelector("path");
  
      // Check if the path exists inside the SVG
      if (path) {
        // 1. Get the total length of the path (only need to do this once)
        const pathLength = path.getTotalLength();
  
        // 2. Set the initial dash styles
        path.style.strokeDasharray = `${pathLength}`;
        path.style.strokeDashoffset = `${pathLength}`;
  
        // 3. Create the function to run on scroll
        const handleScroll = () => {
          const distance = window.scrollY;
          // Calculate the total scrollable distance of the SVG
          const totalDistance = svg.clientHeight - window.innerHeight;
  
          // Prevent division by zero if not scrollable
          if (totalDistance <= 0) {
            path.style.strokeDashoffset = "0";
            return;
          }
  
          const percentage = distance / totalDistance;
  
          // Calculate the new offset
          // Use Math.max to stop it from "over-drawing"
          const offset = Math.max(0, pathLength * (1 - percentage));
          path.style.strokeDashoffset = `${offset}`;
        };
  
        // 4. Run it once on load to set the correct starting position
        handleScroll();
  
        // 5. Add the event listener to run it on every scroll
        window.addEventListener("scroll", handleScroll);
      }
    }
  });