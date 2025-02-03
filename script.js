document.addEventListener("DOMContentLoaded", () => {
    const outputDiv = document.getElementById("output");

    // Function to create a random promise
    function createRandomPromise(index) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 50% chance to resolve with a number between 1 and 10, 50% chance to reject
                if (Math.random() < 0.5) {
                    resolve(Math.floor(Math.random() * 10) + 1);
                } else {
                    reject(new Error(`Promise ${index + 1} rejected with error`));
                }
            }, 1000);
        });
    }

    // Create an array of 5 promises
    const promises = Array.from({ length: 5 }, (_, index) => createRandomPromise(index));

    // Use Promise.allSettled to wait for all promises to settle
    Promise.allSettled(promises).then(results => {
        results.forEach((result, index) => {
            const p = document.createElement("p");
            if (result.status === "fulfilled") {
                p.textContent = `Promise ${index + 1} resolved with ${result.value}`;
                p.style.color = "green"; // Green text for resolved promises
            } else {
                p.textContent = result.reason.message;
                p.style.color = "red"; // Red text for rejected promises
            }
            outputDiv.appendChild(p);
        });
    });
});

