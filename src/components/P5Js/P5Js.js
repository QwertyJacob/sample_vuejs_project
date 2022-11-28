import p5 from "p5";

const sketch = function(p){


    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth/1.25, 400);
        let canvas_horizontal_offset = (p.windowWidth - p.width) / 2;
        canvas.position(canvas_horizontal_offset, p.y);
    };

    p.windowResized = function(){
        p.resizeCanvas(p.windowWidth/2, p.windowHeight/2);
    }
    p.draw = function() {
        p.background('black');
        p.fill('white');
        p.textAlign(p.CENTER);
        p.text("HELLO P5!", p.width / 2, p.height / 2);
        p.circle(p.mouseX, p.mouseY, 100,100 )
    };
}

export default {
    name: "P5Js",
    /* extracted from : https://bulkan-evcimen.com/using_vuejs_parceljs_p5js
    We pass a reference to this all the way down to the p5 instantiation.
    This is done in the mounted lifecycle to make sure
    the DOM is completely rendered.*/
    mounted() {
        setTimeout(()=> {
            new p5(sketch, this.$refs.canvasOutlet);
        });
    }
}