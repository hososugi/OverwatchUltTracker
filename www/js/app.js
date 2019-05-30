(function()
{
    // Requirements
    const remote = require('electron').remote;
    const window = remote.getCurrentWindow();
    const ioHook = require('iohook');
    const timer  = require('timers');

    // Global variables
    var ultTimeoutObject;
    var baseUltIncrementRate = 5; // per second.
    var ultimateTimer        = 3000; // milliseconds
    var percentBarColors     = ["yellow", "#ffbc40", "#e07b00", "red"]; // index 4 is 100%;
    
    function init() {
        // Set up the close button for the app.
        document.getElementById("button-close").addEventListener("click", () => { window.close(); }); 
        
        // Make 6 out of the initial template.
        setupHeroes();

        // Handle all keyboard input.
        ioHook.on("keyup", event =>  handleKeyboardShortcuts(event));
        ioHook.start();

        // Star the ultimate tracking.
        ultTimeoutObject = setInterval(ultimateIncrement, ultimateTimer);
    }; 
    
    // Check when the application is ready.
    document.onreadystatechange = function()
    {
      if (document.readyState == "complete")
        init(); 
    };

    function setupHeroes()
    {
        var element = $(".hero-container:eq(0)");

        for(let count = 0; count < 5; count++)
            element.after( element.clone() );
    }

    function handleKeyboardShortcuts(event)
    {
        var keyCode = event.keycode;

        // Handle different input.
        console.log("DEBUG: key  " + keyCode);
    }

    function ultimateIncrement()
    {
        // Loop through each hero to auto increment.
        $(".hero-container").each(function()
        {
            var percent = parseInt($(this).data('percent') || 0);
            percent += baseUltIncrementRate;
            
            if(percent > 100)
                percent = 100;

            var barColorIndex = Math.floor(percent / 25);
            var barColor      = percentBarColors[barColorIndex];

            var fontColor = "black";
            if(percent >= 50)
                fontColor = "white";

            // Set the new percent.
            $(this).data('percent', percent);
            $(this).find('.hero-bar-percent-background').css('width', percent + '%');
            $(this).find('.hero-bar-percent-background').css('background', barColor);
            $(this).find('.hero-bar-percent-text').text(percent + '%');
            $(this).find('.hero-bar-percent-text').css('color', fontColor);
        });
    }
})();