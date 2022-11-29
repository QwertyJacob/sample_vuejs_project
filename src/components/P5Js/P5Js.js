import p5 from "p5";
import * as Tone from 'tone';

let waveform = new Tone.Waveform();
let osc = new Tone.Oscillator();
osc.connect(waveform);
let bufferArray, start_point, x1,y1,x2,y2;

const sketch = function(p){


    p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth/1.25, 400);
        let canvas_horizontal_offset = (p.windowWidth - p.width) / 2;
        canvas.position(canvas_horizontal_offset, p.y);
    };

    p.windowResized = function(){
        p.resizeCanvas(p.windowWidth/1.25, 400);
    }
    p.draw = function() {
        p.background('black');
        p.stroke('110');
        p.strokeWeight(10);
        bufferArray = waveform.getValue(0);

        for(let i = 0; i < bufferArray.length; i++) {
            if (bufferArray[i - 1] < 0 && bufferArray[i] >= 0){
                start_point = i;
                break;
            }
        }

        let end_point = start_point + bufferArray.length/2;

        for(let i = start_point+1; i < end_point; i++) {

            x1 = p.map(i-1,start_point,end_point, 0, p.width);
            y1 = p.map(bufferArray[i-1], -1,1,0, p.height);

            x2 = p.map(i,start_point,end_point, 0, p.width);
            y2 = p.map(bufferArray[i], -1,1,0, p.height);

            p.line(x1,y1, x2,y2);
        }

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
        Tone.start().then(()=>{
            osc.start();
        });
    },
    props: {
        frequency : Number,
        toneReady : Boolean,
    },
    watch:{
        frequency(newFrequency){
            osc.frequency.value = parseInt(newFrequency);
        }
    }
}