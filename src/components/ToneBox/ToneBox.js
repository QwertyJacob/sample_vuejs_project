import * as Tone from 'tone'

Tone.Destination.volume.value = -9;
let osc = new Tone.Oscillator();
osc.toDestination();
//
// let distortionEffect = new Tone.Distortion();
// let chorusEffect = new Tone.Chorus();
// let reverbEffect = new Tone.Reverb();

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
        msg: String
    },
    data(){
        return {


            frequency : '',
            toneReady : false,
            connectedEffects : [],
            newEffect : '',
            effectsCat : effectsCatalogue
        };
    },
    methods: {
        startTone() {
            Tone.start().then(()=>{
                console.log('Tone started!');
                this.toneReady = true;
                osc.start();
            });
        },
        changeFrequency(){
            // We don't need anymore this binding.
            // this.frequency = event.target.value;
            osc.frequency.value = this.frequency;
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
            osc.disconnect();

            let currentEffect;
            let source = osc;
            let dest;

            for(let connectedEffect of this.connectedEffects){
                switch(connectedEffect.text) {
                    case "Distortion":
                        currentEffect = new Tone.Distortion();
                        break;
                    case "Chorus":
                        currentEffect = new Tone.Chorus();
                        break;
                    case "Reverb":
                        currentEffect = new Tone.Reverb();
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
    }
}