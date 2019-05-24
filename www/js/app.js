(function()
{
    const remote = require('electron').remote;
    const window = remote.getCurrentWindow();
    const ioHook = require('iohook');
    
    function init() {
        // Set up the close button for the app.
        document.getElementById("button-close").addEventListener("click", function (e)
        {
            window.close();
        }); 

        ioHook.on("keyup", event => {
            handleKeyboardShortcuts(event.keycode);
        });

        ioHook.start();
    }; 
    
    // Check when the application is ready.
    document.onreadystatechange = function()
    {
      if (document.readyState == "complete")
        init(); 
    };

    function handleKeyboardShortcuts(keycode)
    {

    }
})();