
document.addEventListener("DOMContentLoaded", () => {
    const outputDiv = document.getElementById("output");

    function createRandomPromise(index) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 50% chance to resolve with a number between 1 and 10, 50% chance to reject
                if (Math.random() < 0.5) {
                    resolve(Math.floor(Math.random() * 10) + 1);  // Resolve with a random number
                } else {
                    reject(new Error(`Promise ${index + 1} rejected with error`));  // Reject with an error
                }
            }, 1000);
        });
    }

    // Create an array of 5 promises
    const promises = Array.from({ length: 5 }, (_, index) => createRandomPromise(index));

    // Use Promise.all to wait for all promises to settle (resolve or reject)
    Promise.all(promises.map(p => p.catch(e => e))).then(results => {
        results.forEach((result, index) => {
            const p = document.createElement("p");
            if (result instanceof Error) {
                p.textContent = `Promise ${index + 1} rejected with error`;
                p.style.color = "red";  // Red text for rejected promises
            } else {
                p.textContent = `Promise ${index + 1} resolved with ${result}`;
                p.style.color = "green";  // Green text for resolved promises
            }
            outputDiv.appendChild(p);
        });
    });
});
