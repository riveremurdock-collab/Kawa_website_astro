/**
 * Instagram Embed Loader
 * Shared by InstagramEmbed.astro and InstagramInline.astro so the embed
 * script loads exactly once per page no matter how many embeds appear.
 */
(function () {
    function loadInstagramEmbed() {
        // Script already loaded — just process any new blockquotes.
        if (window.instgrm) {
            window.instgrm.Embeds.process();
            return;
        }

        // Script already requested by an earlier embed on this page — it
        // will process every blockquote present once it finishes loading.
        if (document.querySelector('script[data-instagram-embed]')) return;

        var script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        script.dataset.instagramEmbed = 'true';
        document.body.appendChild(script);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadInstagramEmbed);
    } else {
        loadInstagramEmbed();
    }
})();
