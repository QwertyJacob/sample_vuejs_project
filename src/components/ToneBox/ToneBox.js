let id = 0;

let distortionEffect = { id: id++,
    text: "Distortion"};

let chorusEffect = { id: id++,
    text: "Chorus"};

let reverbEffect = { id: id++,
    text: "Reverb"};

let effectsCatalogue = [distortionEffect, chorusEffect, reverbEffect];



export default {
    name: 'ToneBox',
    props: {
        toneReady : Boolean,
        frequency : Number,
        oscillator : Object
    },
    data(){
        return {
            connectedEffects : [],
            newEffect : '',
            effectsCat : effectsCatalogue,
            innerFrequency: this.frequency
        };
    },
    methods: {
        startTone() {
            this.$tone.start().then(()=>{
                this.$emit('toneActivated', true);
                this.oscillator.start();
            });
        },
        addNewEffect(newEffect){
            console.log('Trying to connect to the ', newEffect.text,'effect')
            this.connectedEffects.push({id: id++, text:newEffect.text});
            this.resetEffects();
        },
        removeEffect(idOfEffectToRemove){
            this.connectedEffects = this.connectedEffects.filter((t) => t.id !== idOfEffectToRemove);
            this.resetEffects();
        },
        resetEffects(){
            this.oscillator.disconnect();

            let currentEffect;
            let source = this.oscillator;
            let dest;

            for(let connectedEffect of this.connectedEffects){
                switch(connectedEffect.text) {
                    case "Distortion":
                        currentEffect = new this.$tone.Distortion();
                        break;
                    case "Chorus":
                        currentEffect = new this.$tone.Chorus();
                        break;
                    case "Reverb":
                        currentEffect = new this.$tone.Reverb();
                        break;
                    default:
                        console.log('Such an effect does not Exist!')
                }

                dest = currentEffect;
                source.connect(dest);
                source = dest;
            }
            source.toDestination();
        }
    },
    watch:{
        innerFrequency(newFrequency){
            this.$emit('frequencyChanged', parseInt(newFrequency));
            this.oscillator.frequency.value = parseInt(newFrequency);
        }
    }
}