import ToneBox from '../ToneBox/ToneBox.vue'
import P5Js from '../P5Js/P5Js.vue'

export default {
    name: 'App',
    components: {
        ToneBox: ToneBox,
        P5Js : P5Js
    },
    created(){
        console.log('This is the Tone object imported just once! : ', this.$tone)
        this.$tone.Destination.volume.value = -9;
        this.osc = new this.$tone.Oscillator();
        this.osc.toDestination();
    },
    data(){
        return {
            message: 'Hello ACTAM!',
            year: '2022/23',
            dynamicId : 'subtitle',
            toneReady : false,
            frequency : 440
        };
    },
    methods:{
        updateToneReady(isToneActivated){
            this.toneReady = isToneActivated;
            console.log('Tone activated!')
        },
        updateFrequency(newFrequency){
            this.frequency = newFrequency;
        }
    }
}