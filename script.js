//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
    const outputDiv = document.getElementById("output");

    function getRandomPromise(index) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.5) {
                    resolve(Math.floor(Math.random() * 10) + 1);
                } else {
                    reject(new Error(`Promise ${index + 1} rejected with error`));
                }
            }, 1000);
        });
    }

    // Create an array of 5 promises
    const promises = Array.from({ length: 5 }, (_, index) => getRandomPromise(index));

    // Use Promise.allSettled to handle both resolved and rejected cases
    Promise.allSettled(promises).then(results => {
        results.forEach((result, index) => {
            const p = document.createElement("p");
            if (result.status === "fulfilled") {
                p.textContent = `Promise ${index + 1} resolved with ${result.value}`;
                p.style.color = "green";
            } else {
                p.textContent = result.reason.message;
                p.style.color = "red";
            }
            outputDiv.appendChild(p);
        });
    });
});
