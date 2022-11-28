import ToneBox from '../ToneBox/ToneBox.vue'


export default {
    name: 'App',
    components: {
        ToneBox: ToneBox
    },
    data(){
        return {
            message: 'Hello ACTAM!',
            year: '2022/23',
            dynamicId : 'subtitle'
        };
    }
}