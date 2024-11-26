export const drawHand = (predictions, ctx) => {
    // Check if we have predictions
    if (predictions && predictions.length > 0) {
        predictions.forEach((prediction) => {
            const landmarks = prediction.landmarks;

            // Loop through landmarks and draw them
            for (let i = 0; i < landmarks.length; i++) {
                const x = landmarks[i][0];
                const y = landmarks[i][1];

                // Flip the x-coordinate for mirrored drawing
                const flippedX = ctx.canvas.width - x;

                ctx.beginPath();
                ctx.arc(flippedX, y, 5, 0, 2 * Math.PI, false); // Full circle
                ctx.fillStyle = "indigo"; // Set the dot color
                ctx.fill();
            }
        });
    } else {
        console.log("No predictions available.");
    }
};
