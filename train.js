console.log(`Loaded train.js.`)
import { createChart, updateChart } from "./scatterplot.js"

function loadData(){

    console.log(`Initialized loadData().`)
        Papa.parse("./data/insurance.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => checkData(results.data)
        })
    } loadData()

function checkData(data){

    console.log(`Initialized checkData().`)
    console.table(data)

    // data voorbereiden
    data.sort(() => (Math.random() - 0.5))
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    // neural network aanmaken
    let nn = ml5.neuralNetwork({ task: 'regression', debug: true })

    // data toevoegen aan neural network
    for(let patient of trainData){
        nn.addData({ age: patient.age, sex: patient.sex, bmi: patient.bmi, children: patient.children }, {charges: patient.charges })
    }

    // normalize data
    nn.normalizeData(console.log(`Normalized data.`));

    nn.train({ epochs: 10 }, () => console.log("Finished training."));

    async function makePrediction(){
        
        console.log(`Initialized makePrediction().`)

        for (let patient of testData) {
                const testPatient = { age: patient.age, sex: patient.sex, bmi: patient.bmi, children: patient.children };
                const pred = nn.predict(testPatient);
                console.log(`Predicted charge for patient with the following details; 
                \n age: ${patient.age}
                \n sex: ${patient.sex}
                \n bmi: ${patient.bmi}
                \n children: ${patient.children}
                \n charges: ${pred[0].charges}`);
        }
    }makePrediction();
}