// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-07-28
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const origFetch = window.fetch;
    window.fetch = async (input, init) => {
        if (typeof input === 'string' && input.includes('/youtubei/v1/player')) {
            const response = await origFetch(input, init);
            const json = await response.json();
            if (json.adPlacements) {
                json.adPlacements = [];
            }
            if (json.playerAds) {
                json.playerAds = [];
            }
            return new Response(JSON.stringify(json), {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            });
        }
        return origFetch(input, init);
    };

    function removeAds() {
        const adElements = document.querySelectorAll('.ad-showing, .ytp-ad-overlay-container, .ytp-ad-text-overlay');
        adElements.forEach(el => el.remove());
    }

    setInterval(removeAds, 1000);
})();