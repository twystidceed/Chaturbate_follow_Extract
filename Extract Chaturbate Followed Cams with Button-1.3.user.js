// ==UserScript==
// @name         Extract Chaturbate Followed Cams with Button
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Extract usernames and URLs of followed cams on Chaturbate with a button click
// @author       You
// @match        https://chaturbate.com/followed-cams/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function extractModels() {
        console.log('Extraction started');

        const onlineModels = [];
        const modelElements = document.querySelectorAll('li.roomCard'); // Target room card elements

        console.log(`Found ${modelElements.length} room cards`);

        modelElements.forEach((model) => {
            // Extract username and profile URL
            const usernameElement = model.querySelector('a[data-room]');
            const linkElement = model.querySelector('a[href]');

            if (usernameElement && linkElement) {
                const username = usernameElement.textContent.trim();
                const url = `https://chaturbate.com${linkElement.getAttribute('href')}`;
                onlineModels.push(`${url}`); // Removed the '${username} - ' part as it doesnt populate data
            } else {
                console.warn('Username or link not found for a model', model);
            }
        });

        if (onlineModels.length > 0) {
            console.log('Extracted models:', onlineModels);

            // Generate and download the text file
            const blob = new Blob([onlineModels.join('\n')], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            var dlink_fname = getCurrentTime() + "_chaturbate_model_extract.txt" // Coded filename including timestamp for reference
            link.download = dlink_fname;                                         // Amended to link the filename for download
            link.click();

            console.log('File downloaded: followed_cams.txt');
        } else {
            console.warn('No models found or extracted.');
        }
    }

    // Function to add the button
    function addButton() {
        if (document.querySelector('#extractCamsButton')) {
            console.log('Button already exists.');
            return;
        }

        const button = document.createElement('button');
        button.textContent = 'Extract Followed Cams';
        button.id = 'extractCamsButton'; // Add an ID for styling
        button.style.position = 'fixed';
        button.style.top = '10px'; // Position at the top
        button.style.left = '50%'; // Center horizontally
        button.style.transform = 'translateX(-50%)'; // Adjust for proper horizontal centering
        button.style.padding = '10px 20px';
        button.style.backgroundColor = '#007BFF';
        button.style.color = '#FFF';
        button.style.fontSize = '16px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '9999';

        // Ensure button works when clicked
        button.addEventListener('click', extractModels);

        // Append button to body
        document.body.appendChild(button);

        console.log('Button added to the page.');
    }

    // Added function to provide timestamping
    function getCurrentTime() {
        return new Date(Date.now() - (new Date().getTimezoneOffset() * 1000 * 60)).toJSON().slice(0, 19).replace("T", "_").replaceAll(":", "-");
    }

    // Use MutationObserver to ensure the DOM is ready
    const observer = new MutationObserver(() => {
        if (document.body) {
            addButton();
            observer.disconnect(); // Stop observing once the button is added
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
})();
