// ==UserScript==
// @name         Extract Chaturbate Followed Cams with Button
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Extract usernames and URLs of cams on 'followed-cam' and 'followed-cam/offline' page from Chaturbate with a button click
// @author       Twystidceed
// @contributor  NillaShark
// @match        https://chaturbate.com/followed-cams/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Function to check if the current page matches the desired URL pattern
    function isFollowedCamsPage() {
        return window.location.pathname.startsWith('/followed-cams/');
    }

    // Function to add the button
    function addButton() {
        if (document.querySelector('#extractCamsButton') || !isFollowedCamsPage()) {
            return;
        }

        const button = document.createElement('button');
        button.textContent = 'Extract Displayed Cams';
        button.id = 'extractCamsButton';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.left = '50%';
        button.style.transform = 'translateX(-50%)';
        button.style.padding = '10px 20px';
        button.style.backgroundColor = '#007BFF';
        button.style.color = '#FFF';
        button.style.fontSize = '16px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '9999';

        button.addEventListener('click', extractModels);

        document.body.appendChild(button);
    }

    // Function to remove the button if it exists
    function removeButton() {
        const button = document.querySelector('#extractCamsButton');
        if (button) {
            button.remove();
        }
    }

    // Function to handle page navigation
    function handlePageChange() {
        if (isFollowedCamsPage()) {
            addButton();
        } else {
            removeButton();
        }
    }

    // Function to extract model data
  function extractModels() {
    console.log('Extraction started');

    const onlineModels = [];
    const modelElements = document.querySelectorAll('li.roomCard');

    console.log(`Found ${modelElements.length} room cards`);

    modelElements.forEach((model) => {
        const usernameElement = model.querySelector('a[data-room]');
        const linkElement = model.querySelector('a[href]');

        if (usernameElement && linkElement) {
            const url = `https://chaturbate.com${linkElement.getAttribute('href')}`;
            onlineModels.push(url);
        } else {
            console.warn('Username or link not found for a model', model);
        }
    });

    if (onlineModels.length > 0) {
        onlineModels.sort();

        // Determine if the page is online or offline
        const pageType = window.location.pathname.includes('/offline') ? 'offline' : 'online';

        // Construct the filename with timestamp and page type
        const dlink_fname = `${getCurrentTime()}_cb_model_urls_${pageType}.txt`;

        console.log('Saving models to file: ' + dlink_fname);

        // Generate and download the text file
        const blob = new Blob([onlineModels.join('\n')], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = dlink_fname;
        link.click();
    } else {
        console.warn('No models found or extracted.');
    }
}

    // Utility function for timestamp
    function getCurrentTime() {
        return new Date().toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-');
    }

    // Intercept navigation for single-page applications
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
        originalPushState.apply(this, args);
        window.dispatchEvent(new Event('urlchange'));
    };

    history.replaceState = function (...args) {
        originalReplaceState.apply(this, args);
        window.dispatchEvent(new Event('urlchange'));
    };

    window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('urlchange'));
    });

    // Detect DOM and URL changes
    const observer = new MutationObserver(() => {
        handlePageChange();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('urlchange', handlePageChange);

    // Initial check
    handlePageChange();
})();
