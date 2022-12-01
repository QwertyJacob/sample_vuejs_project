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

    };
}

export default {
    name: "SongViz",
    mounted() {
        setTimeout(()=> {
            let mysketch = new this.$p5(sketch, this.$refs.canvasOutlet);
            mysketch.vueComponent = this;
        });
    },
    created(){

    },
    props: {
        toneReady : Boolean,
    },

}