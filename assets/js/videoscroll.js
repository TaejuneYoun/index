console.clear();

"use strict";
const iframeVideoPlugin = { // Iframe Video On Scroll
    init() {
        this.videoEls = Array.from(document.querySelectorAll(
            'iframe[src*="facebook.com/plugins/video"], ' +
            'iframe[src*="youtube.com"], ' +
            'iframe[src*="vimeo.com"], ' +
            'iframe[src*="dailymotion.com"], ' +
            'iframe[src*="hurriyet.com.tr/video"], ' +
            'iframe[src*="twitch.tv"]'
        )); // select supported iframe Nodes and convert them into ordinary Array (so we can push more elements on the fly)

        this.videoElsTwitter = this.videoElsTwitter || []; // twitter elements are pushed into this array
        Array.prototype.push.apply(this.videoEls, this.videoElsTwitter); // twitter nodeList array is appended to Iframe NodeList array
        this.fraction = 0.25; // VideoArea fraction to decide whether video is in ViewPort or not
        this.waiting = false;
        this.waitingThreshold = 500; // increses performance upon onScroll
        this.notSupportedVideosRegex = '(facebook.com)|(twitch.tv)'; // not-supported video iframes will be handled by an another method
        this.autoStartRegex = /(autostart=true)|(autoplay=1)|(autoPlay)/g; // auto-play parameters regEx, different video platforms uses different parameter

        // Parsing and categorizing the iframes videos
        if (this.videoEls.length > 0) {
            Array.prototype.forEach.call(this.videoEls, videoEl => {

                if (videoEl.src.search(this.notSupportedVideosRegex) > 0) { // check if supported or not supported video
                    if (videoEl.src.search('twitch.tv') > 0 && videoEl.src.search('autoplay=true') < 0) { // twitch exception
                        videoEl.classList.add('playing');
                    }
                    this.notSupportedVideosClickDetect(videoEl);
                } else if (videoEl.src.search(this.autoStartRegex) > 0) {
                    videoEl.classList.add('playing');
                    videoEl.classList.add('rhd-auto-play');
                    videoEl.src = videoEl.src.replace(this.autoStartRegex, 'autostart=false');
                    videoEl.onload = () => {
                        videoEl.classList.remove('playing');
                        this.scrollHandler();
                    }
                }
            });

            // Remove listeners -- in case init() is called multiple times, the previously attached events have to be removed.
            window.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler); // OPTIONAL
            window.removeEventListener('load', this.scrollHandler); // OPTIONAL

            // Add listeners
            window.addEventListener('scroll', this.scrollHandler, false);
            window.addEventListener('resize', this.scrollHandler, false); // OPTIONAL
            window.addEventListener('load', this.scrollHandler, false); // OPTIONAL
        }
    },

    scrollHandler: () => { // this method is attached to Window by Arrow Function; so it can be removed safely by .removeEventListener()
        if (iframeVideoPlugin.waiting) {
            return;
        }
        iframeVideoPlugin.waiting = true;
        clearTimeout(iframeVideoPlugin.endScrollHandle);
        iframeVideoPlugin.scrollHandlerHelper();
        setTimeout(() => {
            iframeVideoPlugin.waiting = false;
        }, iframeVideoPlugin.waitingThreshold);
        iframeVideoPlugin.endScrollHandle = setTimeout(() => {
            iframeVideoPlugin.scrollHandlerHelper();
        }, iframeVideoPlugin.waitingThreshold);
    },

    scrollHandlerHelper() {
        Array.prototype.forEach.call(this.videoEls, videoEl => {
            this.isInViewPort(videoEl);
        });
    },

    notSupportedVideosClickDetect(videoEl) {
        videoEl.addEventListener('mouseenter', function () {
            videoEl.classList.add('iframe-hovered');
        });
        videoEl.addEventListener('mouseleave', function () {
            videoEl.classList.remove('iframe-hovered');
            window.focus();
        });
        window.addEventListener('blur', this.notSupportedVideosWindowBlurHandler, false);
        window.focus();
    },

    notSupportedVideosStopPlaying(videoEl) {
        if (videoEl.src.search('twitch.tv') > 0 && videoEl.src.search('autoplay') < 0) {
            videoEl.src = videoEl.src + '&autoplay=false';
        } else {
            videoEl.src = videoEl.src;
        }
        videoEl.classList.remove('playing');
    },

    
    notSupportedVideosWindowBlurHandler() {
        var hoveredIframes = document.querySelector('.iframe-hovered');
        if (hoveredIframes) {
            hoveredIframes.classList.add('playing');
        }
    },

    messageFn(action, src) {
        if (src.search("vimeo") > 0) { // case for Vimeo
            return JSON.stringify({
                method: action
            });
        } else if (src.search("youtube") > 0) { // case for youTube
            return JSON.stringify({
                event: 'command',
                func: action + 'Video'
            });
        } else { // case for other video services (hurriyet videos, dailymotion etc..)
            return action;
        }
    },

    isInViewPort(videoEl) {
        let percentVisible = this.fraction,
            elemRect = videoEl.getBoundingClientRect(),
            elemTop = elemRect.top,
            elemBottom = elemRect.bottom,
            elemHeight = elemRect.height,
            overhang = elemHeight * (1 - percentVisible),

            isVisible = (elemTop >= -overhang) && (elemBottom <= window.innerHeight + overhang);

        if (isVisible) { // video is in the ViewPort, play it
            if (!videoEl.classList.contains('playing') && videoEl.src.search(this.notSupportedVideosRegex) < 0) {
                videoEl.classList.add('playing');
                if (videoEl.classList.contains('rhd-auto-play')) {
                    videoEl.contentWindow.postMessage(this.messageFn('play', videoEl.src), '*');
                }
            }
        } else { // video is outside the ViewPort, pause
            if (videoEl.classList.contains('playing')) {
                if (videoEl.src.search(this.notSupportedVideosRegex) > 0) { // stop only not supported iframes
                    this.notSupportedVideosStopPlaying(videoEl);
                } else if (videoEl.classList.contains('rhd-twitter-video')) { // stop only twitter videos
                    videoEl.classList.remove('playing');
                    let isVideoIframeInIframe = videoEl.contentDocument.querySelector('iframe');
                    if (isVideoIframeInIframe) { // if twitter video is playing
                        let iframeSrc = isVideoIframeInIframe.src;
                        iframeSrc = iframeSrc.split('?')[0];
                        isVideoIframeInIframe.src = iframeSrc;
                    }
                } else { // pause supported iframes
                    videoEl.classList.remove('playing');
                    videoEl.contentWindow.postMessage(this.messageFn('pause', videoEl.src), '*');
                }
            }
        }
    },
};

const loadJS = (source, callback) => { // Fn to load JS files and append to <head></head>
    let scriptEl = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    scriptEl.async = 1;
    scriptEl.defer = 1;
    scriptEl.onload = scriptEl.onreadystatechange = function (_, isAbort) {
        if (isAbort || !scriptEl.readyState || /loaded|complete/.test(scriptEl.readyState)) {
            scriptEl.onload = scriptEl.onreadystatechange = null;
            scriptEl = undefined;
            if (!isAbort) {
                if (callback) callback();
            }
        }
    };
    scriptEl.src = source;
    head.appendChild(scriptEl);
};

const checkInstagramEmbed = () => {
    let instagramEl = document.querySelectorAll('.instagram-media');

    if (instagramEl.length > 0) {
        if (typeof (window.instgrm) !== 'undefined') {
            window.instgrm.Embeds.process();
        } else {
            loadJS('https://www.instagram.com/embed.js');
        }
    }
};

const twitterCallback = () => {
    twttr.events.bind('rendered', (event) => {
        if (event.target.classList.contains('twitter-video')) {
            let twitterVideoIframe = event.target.querySelector('iframe');
            twitterVideoIframe.classList.add('rhd-twitter-video');
            iframeVideoPlugin.videoElsTwitter.push(twitterVideoIframe); // push the Twitter element
            iframeVideoPlugin.init(); // re-init the iframe scroll watcher, because a new twitter element has added
        }
    }
                     );
};

const checkTwitterEmbed = () => {
    let twitterEls = document.querySelectorAll('.twitter-video, .twitter-tweet');

    if (twitterEls.length > 0) {
        if (typeof (window.twttr) !== 'undefined') {
            window.twttr.widgets.load();
        } else {
            loadJS('https://platform.twitter.com/widgets.js', twitterCallback);
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    checkInstagramEmbed();
    checkTwitterEmbed();
    iframeVideoPlugin.init();
});





