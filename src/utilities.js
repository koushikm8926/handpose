 export const drawHand = (predictions, ctx) => {
    const fingerJoints = {
        thumb: [1, 2, 3, 4],
        indexFinger: [5, 6, 7, 8],
        middleFinger: [9, 10, 11, 12],
        ringFinger: [13, 14, 15, 16],
        pinky: [17, 18, 19, 20],
    };

    // Define palm connections
    const palmConnections = [0, 1, 5, 9, 13, 17, 0]; // Include 0 again to close the palm loop

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (predictions && predictions.length > 0) {
        predictions.forEach((prediction) => {
            const landmarks = prediction.landmarks;

            // Draw connections for the palm
            for (let i = 0; i < palmConnections.length - 1; i++) {
                const start = palmConnections[i];
                const end = palmConnections[i + 1];

                const flippedX1 = ctx.canvas.width - landmarks[start][0];
                const flippedX2 = ctx.canvas.width - landmarks[end][0];

                ctx.beginPath();
                ctx.moveTo(flippedX1, landmarks[start][1]);
                ctx.lineTo(flippedX2, landmarks[end][1]);

                ctx.strokeStyle = 'Gold'; // Different color for the palm
                ctx.lineWidth = 4;
                ctx.stroke();
            }

            // Loop through fingers
            for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
                let finger = Object.keys(fingerJoints)[j];
                // Loop through pairs of joints
                for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
                    const firstJointIndex = fingerJoints[finger][k];
                    const secondJointIndex = fingerJoints[finger][k + 1];

                    const flippedX1 = ctx.canvas.width - landmarks[firstJointIndex][0];
                    const flippedX2 = ctx.canvas.width - landmarks[secondJointIndex][0];

                    // Draw path for fingers
                    ctx.beginPath();
                    ctx.moveTo(flippedX1, landmarks[firstJointIndex][1]);
                    ctx.lineTo(flippedX2, landmarks[secondJointIndex][1]);

                    ctx.strokeStyle = 'Plum';
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }

            // Loop through landmarks and draw them
            for (let i = 0; i < landmarks.length; i++) {
                const x = landmarks[i][0];
                const y = landmarks[i][1];

                // Flip the x-coordinate for mirrored drawing
                const flippedX = ctx.canvas.width - x;

                ctx.beginPath();
                ctx.arc(flippedX, y, 5, 0, 2 * Math.PI, false); // Full circle
                ctx.fillStyle = "aqua"; // Set the dot color
                ctx.fill();
            }
        });
    } else {
        console.log("No predictions available.");
    }
};
