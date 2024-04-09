function insertGtagScript() {
    const gaId = 'G-CBQ4R412LP'; // Replace this with your actual Google Analytics ID

    // Create the <script> tag for gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize the dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Set the current time and configure gtag with your GA ID
    gtag('js', new Date());
    gtag('config', gaId);
}

insertGtagScript();