# SketchPad - Drawing App

A drawing app made for DevJam Weekly Projects. This project was built using the Javascript [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

Live URL: https://stupefied-lamarr-022da5.netlify.app/

### Technologies Used

- Canvas API
- React 
- Typescript
- React Draggable  
- React FontAwesome
- React-scripts

### Supported Drawing Tools

#### Pen Tool
Used for drawing markings on the canvas freely.

#### Erase Tool
Similar to the Pen tool but used for erasing markings.

#### Fill Tool
Used for filling an area confined by other drawings on the Canvas. This tool internally uses a flood fill algorithm. It attempts to flood fill the canvas color until it reaches other markings/squiggles.  

This algorithm calculates color distance based on Pythagorean Theorem in 4D space to determine whether the current pixel should be filled, and determines if that distance is lower than the preset tolerance. Calculating the color distance instead of matching color values allows for better fillings as markings made by the Pen Tool have a side-effect of leaving 'pale grey' pixels on the edges, and therefore the floodfill algorithm recognizes those 'pale grey' pixels as being white pixels as the distance between the two colors is calculated to be lower than the tolerance. 

A side effect of this implementation is that if two colors are very similar i.e. if you have markings on the canvas which are light-green, and you flood fill with a slightly darker green then those light-green markings will be ignored (since the distance between the two colors is lower than the tolerance).

This algorithm is also not optimised for performance and currently considers every single pixel inside the canvas.