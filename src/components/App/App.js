import ToneBox from '../ToneBox/ToneBox.vue'
import P5Js from '../P5Js/P5Js.vue'

export default {
    name: 'App',
    components: {
        ToneBox: ToneBox,
        P5Js : P5Js
    },
    data(){
        return {
            message: 'Hello ACTAM!',
            year: '2022/23',
            dynamicId : 'subtitle',
            toneReady : false
        };
    },
    methods:{
        updateToneReady(isToneActivated){
            this.toneReady = isToneActivated;
            console.log('Tone activated!')
        }
    }
}