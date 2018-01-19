export default function(element, callback) {
	const key = {
	  LEFT:   37,
	  UP:     38,
	  RIGHT:  39,
	  DOWN:   40
	};
	// Progress the user if they scroll their mouse-wheel
	var wheelEvent =
		'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support 'wheel'
		document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least 'mousewheel'
		'WheelEvent'; // let's assume that remaining browsers are older Firefox

		if(wheelEvent === "mousewheel") {
			document.getElementsByTagName("body")[0].className += ' ie';
		}

		element.addEventListener(wheelEvent, (e) => {
			let isAnimating = document.getElementsByClassName("animating");
			if (isAnimating.length === 0 && (e.deltaY > 0 || e.wheelDelta < 0)) {
				callback('down');
			} else if ( isAnimating.length === 0 && (e.deltaY < 0 || e.wheelDelta > 0)) {
				callback('up');
			}
		});

	// Progress the user if they swipe up
	element.addEventListener('touchstart', handleTouchStart, false);
	element.addEventListener('touchmove', handleTouchMove, false);

	var xDown = null;
	var yDown = null;

	function handleTouchStart(evt) {
		xDown = evt.touches[0].clientX;
		yDown = evt.touches[0].clientY;
	}

	function handleTouchMove(evt) {
		if ( ! xDown || ! yDown ) {
			return;
		}

		var xUp = evt.touches[0].clientX;
		var yUp = evt.touches[0].clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;

		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
			if ( xDiff > 0 ) {
				/* left swipe */
				callback('right');
			} else {
				/* right swipe */
				callback('left');
			}
		} else {
			if ( yDiff > 0 ) {
				/* up swipe */
				callback('down');
			} else {
				/* down swipe */
				callback('up');
			}
		}

		xDown = null;
		yDown = null;
	}

	// Progress the user if they press the down/up arrow
	document.addEventListener('keydown', function(event) {
		var keycode = event.keyCode || event.which;
		// console.log(event);
		switch (keycode) {
			case key.UP:
				callback('up');
				break;
			case key.DOWN:
				callback('down');
				break;
			case key.LEFT:
				callback('left');
				break;
			case key.RIGHT:
				callback('right');
				break;
		}
   });


};
