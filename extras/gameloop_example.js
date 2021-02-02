function capturePreviousPositions(sprites) {
  sprites.forEach(function (sprite) {
    sprite.previousX = sprite.x;
    sprite.previousY = sprite.y;
  });
}
  
let previous = undefined;
function gameLoop(timestamp) {
  requestAnimationFrame(gameLoop);
  //Calcuate the time that has elapsed since the last frame  
  if (!timestamp) {
    timestamp = 0;
    }
  if (previous !== undefined) {
    var elapsed = timestamp - previous;
    //Optionally correct any unexpected huge gaps in the elapsed time  
    if (elapsed > 1000) elapsed = frameDuration;
    //Add the elapsed time to the lag counter  
    lag += elapsed;
  }
  //Update the frame if the lag counter is greater than or  
  //equal to the frame duration 
  while (lag >= frameDuration) {
    //Capture the sprites' previous positions
    capturePreviousPositions(sprites);
    //Update the logic    
    update();
    //Reduce the lag counter by the frame duration    
    lag -= frameDuration;
  }
  //Calculate the lag offset. This tells us how far  
  //we are into the next frame  
  var lagOffset = lag / frameDuration;
  //Render the sprites using the `lagOffset` to  
  //extrapolate the sprites' positions  
  render(lagOffset);  
  //Capture the current time to be used as the previous  
  //time in the next frame  
  previous = timestamp;
}
