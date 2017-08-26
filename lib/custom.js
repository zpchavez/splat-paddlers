// Copy needed functions from plugins.js and paste them below
GA.custom = function(ga) {
  //### Fixing the Fullscreen API.
  //The Fullscreen API is also in flux and has a quirky browser
  //implementations. Here's a fix for it, thanks to Norman Paschke:
  //https://github.com/neovov/Fullscreen-API-Polyfill/blob/master/fullscreen-api-polyfill.js

  (function (doc) {
  	// Use JavaScript script mode
  	"use strict";

  	/*global Element */

  	var pollute = true,
  		api,
  		vendor,
  		apis = {
  			// http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
  			w3: {
  				enabled: "fullscreenEnabled",
  				element: "fullscreenElement",
  				request: "requestFullscreen",
  				exit:    "exitFullscreen",
  				events: {
  					change: "fullscreenchange",
  					error:  "fullscreenerror"
  				}
  			},
  			webkit: {
  				enabled: "webkitIsFullScreen",
  				element: "webkitCurrentFullScreenElement",
  				request: "webkitRequestFullScreen",
  				exit:    "webkitCancelFullScreen",
  				events: {
  					change: "webkitfullscreenchange",
  					error:  "webkitfullscreenerror"
  				}
  			},
  			moz: {
  				enabled: "mozFullScreen",
  				element: "mozFullScreenElement",
  				request: "mozRequestFullScreen",
  				exit:    "mozCancelFullScreen",
  				events: {
  					change: "mozfullscreenchange",
  					error:  "mozfullscreenerror"
  				}
  			},
  			ms: {
  				enabled: "msFullscreenEnabled",
  				element: "msFullscreenElement",
  				request: "msRequestFullscreen",
  				exit:    "msExitFullscreen",
  				events: {
  					change: "MSFullscreenChange",
  					error:  "MSFullscreenError"
  				}
  			}
  		},
  		w3 = apis.w3;

  	// Loop through each vendor's specific API
  	for (vendor in apis) {
  		// Check if document has the "enabled" property
  		if (apis[vendor].enabled in doc) {
  			// It seems this browser support the fullscreen API
  			api = apis[vendor];
  			break;
  		}
  	}

  	function dispatch( type, target ) {
  		var event = doc.createEvent( "Event" );

  		event.initEvent( type, true, false );
  		target.dispatchEvent( event );
  	} // end of dispatch()

  	function handleChange( e ) {
  		// Recopy the enabled and element values
  		doc[w3.enabled] = doc[api.enabled];
  		doc[w3.element] = doc[api.element];

  		dispatch( w3.events.change, e.target );
  	} // end of handleChange()

  	function handleError( e ) {
  		dispatch( w3.events.error, e.target );
  	} // end of handleError()

  	// Pollute only if the API doesn't already exists
  	if (pollute && !(w3.enabled in doc) && api) {
  		// Add listeners for fullscreen events
  		doc.addEventListener( api.events.change, handleChange, false );
  		doc.addEventListener( api.events.error,  handleError,  false );

  		// Copy the default value
  		doc[w3.enabled] = doc[api.enabled];
  		doc[w3.element] = doc[api.element];

  		// Match the reference for exitFullscreen
  		doc[w3.exit] = doc[api.exit];

  		// Add the request method to the Element's prototype
  		Element.prototype[w3.request] = function () {
  			return this[api.request].apply( this, arguments );
  		};
  	}

  	// Return the API found (or undefined if the Fullscreen API is unavailable)
  	return api;

  }(document));

  /*
  Chapter 1: Utilities
  --------------------
  */

  //### move
  //Move a sprite or an array of sprites by adding its
  //velocity to its position
  ga.move = function(sprites) {
    if (sprites instanceof Array === false) {
      internal_move(sprites)
    } else {
      for (var i = 0; i < sprites.length; i++) {
        internal_move(sprites[i])
      }
    }
  };

  function internal_move(sprite) {
    sprite.x += sprite.vx | 0;
    sprite.y += sprite.vy | 0;
  }

  ga.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //### wait
  ga.wait = function(duration, callBack) {
    return setTimeout(callBack, duration);
  };

  /*
  Chapter 4: Collision
  --------------------
  */

  /*
  ### Boundary collisions
  */

  //#### contain
  ga.contain = function(s, bounds, bounce, extra){

    var x = bounds.x,
        y = bounds.y,
        width = bounds.width,
        height = bounds.height;

    //Set `bounce` to `false` by default
    bounce = bounce || false;

    //The `collision` object is used to store which
    //side of the containing rectangle the sprite hits
    var collision;

    //Left
    if (s.x < x) {

      //Bounce the sprite if `bounce` is true
      if (bounce) s.vx *= -1;

      //If the sprite has `mass`, let the mass
      //affect the sprite's velocity
      if(s.mass) s.vx /= s.mass;
      s.x = x;
      collision = "left";
    }

    //Top
    if (s.y < y) {
      if (bounce) s.vy *= -1;
      if(s.mass) s.vy /= s.mass;
      s.y = y;
      collision = "top";
    }

    //Right
    if (s.x + s.width > width) {
      if (bounce) s.vx *= -1;
      if(s.mass) s.vx /= s.mass;
      s.x = width - s.width;
      collision = "right";
    }

    //Bottom
    if (s.y + s.height > height) {
      if (bounce) s.vy *= -1;
      if(s.mass) s.vy /= s.mass;
      s.y = height - s.height;
      collision = "bottom";
    }

    //The `extra` function runs if there was a collision
    //and `extra` has been defined
    if (collision && extra) extra(collision);

    //Return the `collision` object
    return collision;
  };

  /*
  #### hitTestRectangle

  Use it to find out if two rectangular sprites are touching.
  Parameters:
  a. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
  b. A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.

  */

  ga.hitTestRectangle = function(r1, r2, global) {
    var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //Set `global` to a default value of `false`
    if(global === undefined) global = false;

    //A variable to determine whether there's a collision
    hit = false;

    //Calculate the distance vector
    if (global) {
      vx = (r1.gx + r1.halfWidth) - (r2.gx + r2.halfWidth);
      vy = (r1.gy + r1.halfHeight) - (r2.gy + r2.halfHeight);
    } else {
      vx = r1.centerX - r2.centerX;
      vy = r1.centerY - r2.centerY;
    }

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

      //A collision might be occuring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {

        //There's definitely a collision happening
        hit = true;
      } else {

        //There's no collision on the y axis
        hit = false;
      }
    } else {

      //There's no collision on the x axis
      hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
  };

  /*
  Chapter 7: The fullscreen module
  ---------------------------------

  Ga has a very simple way of running a game fullscreen:

      g.enableFullscreen();

  Add that to your game code just after the `start` method. As soon as the user
  clicks or touches the game canvas, the game will enter fullscreen mode. The
  game will be aligned and centered in the screen.

  To exit fullscreen mode, the user can press `esc` on the keyboard. Or, you can
  define your own custom exit keys by providing ascii key code numbers as
  `enableFullScreen`'s arguments, like this:

      g.enableFullscreen(88, 120);

  In this case pressing lowercase `x` (88) or uppercase `X` (120) will exit fullscreen
  mode. If you choose to use fullscreen mode, make sure you inform your users
  of the keys they need to press to exit it!

  Or, preferably, don't use fullscreen mode at all. Many users will panic when your
  game takes over their entire screen, and may not intuitively understand how to
  exit fullscreen mode. So, instead, consider using Ga's more user-friendly
  `scaleToWindow` method (listed in the code above.) `scaleToWindow` scales the game
  to the maximum browser window size and center aligns it for the best fit, without
  removing the browser's UI.

  An important note about fullscreen mode: The WHATWG spec only allows fullscreen mode
  to be activated if a user interacts with an HTML element (https://fullscreen.spec.whatwg.org).
  That means you can't use any of Ga's button `press` or `release` actions to
  launch fullscreen mode. That's because buttons are canvas based code objects, not HTML
  elements. You'll see in the code below that fullscreen mode is launched using an
  event listener attached directly to Ga's canvas.

  (A Fullscreen API polyfill exists at the head of the `ga.js` file)

  */

  //`fullscreenScale` is used to track the size of the scaled canvas
  //Ga's update loop need to know this so that it can dynmaically
  //adjust `ga.scale` and `ga.pointer.scale` depending on whether
  //fullscreen mode is active.
  ga.fullscreenScale = 1;

  //`requestFullscreen` is used by `enableFullscreen` to launch
  //fullscreen mode.
  ga.requestFullScreen = function() {
    if (!document.fullscreenEnabled) {
      ga.canvas.requestFullscreen();
    }
  };

  //`exitFullscreen` is used by `enableFullscreen` to exit
  //fullscreen mode.
  ga.exitFullScreen = function() {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  };

  //`alignFullscreen` is called by `enableFullscreen` to center and
  //align the canvas vertically or horizontally inside the users
  //screen. It also sets `ga.fullscreenScale` that Ga's `update` loop
  //uses to changed the values of `ga.scale` and `ga.pointer.scale`
  //when fullscreen mode is entered or exited.
  ga.alignFullscreen = function() {
    var scaleX, scaleY;

    //Scale the canvas to the correct size.
    //Figure out the scale amount on each axis.
    scaleX = screen.width / ga.canvas.width;
    scaleY = screen.height / ga.canvas.height;

    //Set the scale based on whichever value is less: `scaleX` or `scaleY`.
    ga.fullscreenScale = Math.min(scaleX, scaleY);

    //To center the canvas we need to inject some CSS
    //and into the HTML document's `<style>` tag. Some
    //browsers require an existing `<style>` tag to do this, so
    //if no `<style>` tag already exists, let's create one and
    //append it to the `<body>:
    var styleSheets = document.styleSheets;
    if (styleSheets.length === 0) {
      var divNode = document.createElement("div");
      divNode.innerHTML = "<style></style>";
      document.body.appendChild(divNode);
    }

    //Unfortunately we also need to do some browser detection
    //to inject the full screen CSS with the correct vendor
    //prefix. So, let's find out what the `userAgent` is.
    //`ua` will be an array containing lower-case browser names.
    var ua = navigator.userAgent.toLowerCase();

    //Now Decide whether to center the canvas vertically or horizontally.
    //Wide canvases should be centered vertically, and
    //square or tall canvases should be centered horizontally.

    if (ga.canvas.width > ga.canvas.height) {

      //Center vertically.
      //Add CSS to the stylesheet to center the canvas vertically.
      //You need a version for each browser vendor, plus a generic
      //version
      //(Unfortunately the CSS string cannot include line breaks, so
      //it all has to be on one long line.)
      if (ua.indexOf("safari") !== -1 || ua.indexOf("chrome") !== -1) {
        document.styleSheets[0].insertRule("canvas:-webkit-full-screen {position: fixed; width: 100%; height: auto; top: 0; right: 0; bottom: 0; left: 0; margin: auto; object-fit: contain}", 0);
      }
      else if (ua.indexOf("firefox") !== -1) {
        document.styleSheets[0].insertRule("canvas:-moz-full-screen {position: fixed; width: 100%; height: auto; top: 0; right: 0; bottom: 0; left: 0; margin: auto; object-fit: contain;}", 0);
      }
      else if (ua.indexOf("opera") !== -1) {
        document.styleSheets[0].insertRule("canvas:-o-full-screen {position: fixed; width: 100%; height: auto; top: 0; right: 0; bottom: 0; left: 0; margin: auto; object-fit: contain;}", 0);
      }
      else if (ua.indexOf("explorer") !== -1) {
        document.styleSheets[0].insertRule("canvas:-ms-full-screen {position: fixed; width: 100%; height: auto; top: 0; right: 0; bottom: 0; left: 0; margin: auto; object-fit: contain;}", 0);
      }
      else {
        document.styleSheets[0].insertRule("canvas:fullscreen {position: fixed; width: 100%; height: auto; top: 0; right: 0; bottom: 0; left: 0; margin: auto; object-fit: contain;}", 0);
      }
    } else {

      //Center horizontally.
      if (ua.indexOf("safari") !== -1 || ua.indexOf("chrome") !== -1) {
        document.styleSheets[0].insertRule("canvas:-webkit-full-screen {height: 100%; margin: 0 auto; object-fit: contain;}", 0);
      }
      else if (ua.indexOf("firefox") !== -1) {
        document.styleSheets[0].insertRule("canvas:-moz-full-screen {height: 100%; margin: 0 auto; object-fit: contain;}", 0);
      }
      else if (ua.indexOf("opera") !== -1) {
        document.styleSheets[0].insertRule("canvas:-o-full-screen {height: 100%; margin: 0 auto; object-fit: contain;}", 0);
      }
      else if (ua.indexOf("msie") !== -1) {
        document.styleSheets[0].insertRule("canvas:-ms-full-screen {height: 100%; margin: 0 auto; object-fit: contain;}", 0);
      }
      else {
        document.styleSheets[0].insertRule("canvas:fullscreen {height: 100%; margin: 0 auto; object-fit: contain;}", 0);
      }
    }
  };

  //### enableFullscreen
  /*
  Use `enterFullscreen` to make the browser display the game full screen.
  It automatically centers the game canvas for the best fit. Optionally supply any number of ascii
  keycodes as arguments to represent the keyboard keys that should exit fullscreen mode.
  */
  ga.enableFullscreen = function(exitKeyCodes) {

    //Get an array of the optional exit key codes.
    if (exitKeyCodes) exitKeyCodes = Array.prototype.slice.call(arguments);

    //Center and align the fullscreen element.
    ga.alignFullscreen();

    //Add mouse and touch listeners to the canvas to enable
    //fullscreen mode.
    ga.canvas.addEventListener("mouseup", ga.requestFullScreen, false);
    ga.canvas.addEventListener("touchend", ga.requestFullScreen, false);

    if (exitKeyCodes) {
      exitKeyCodes.forEach(function(keyCode) {
        window.addEventListener(
          "keyup",
          function(event){
            if (event.keyCode === keyCode) {
              ga.exitFullScreen();
            }
            event.preventDefault();
          },
          false
        );
      });
    }
  }

  ga.launchFullscreen = function(sprite) {
    if (ga.hitTestPoint(ga.pointer.position, sprite)) ga.enableFullscreen();
  }

  //This next function checks to see if the game is in
  //full screen mode. If it is, the game's scale is set
  //to `fullscreen.scale`. If not, and the canvas hasn't already
  //been scaled, the scale reverts back to 1.
  ga.scaleFullscreen = function() {
    if(document.fullscreenEnabled) {
      ga.scale = ga.fullscreenScale;
      ga.pointer.scale = ga.fullscreenScale;
    } else {
      if (!ga.canvas.scaled) {
        ga.scale = 1;
        ga.pointer.scale = 1;
      }
    }
  }

  //Push `scaleFullscreen` into the `updateFunctions` array so that
  //it will be updated by Ga's `update` function on each frame of the
  //game loop.
  ga.updateFunctions.push(ga.scaleFullscreen);
};
