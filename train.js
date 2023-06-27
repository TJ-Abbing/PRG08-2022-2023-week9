console.log(`Loaded train.js.`);
import { createChart, updateChart } from "./scatterplot.js";

// Loads data.
function loadData() {

    console.log(`Initialized loadData().`);

    Papa.parse("./data/insurance.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => checkData(results.data),
    });

    console.log(`Completed loadData().`);

} loadData();

function checkData(data) {
    console.log(`Initialized checkData().`);
    console.log(data)
    console.table(data);

    // Sorts the array randomly.
    data.sort(() => Math.random() - 0.5);
    // Create a new array called trainData that contains 80% of the original data array.
    let trainData = data.slice(0, Math.floor(data.length * 0.8));
    // Create another new array called testData that contains the remaining 20% of the original data array except for the last element which is excluded from testData.
    let testData = data.slice(Math.floor(data.length * 0.8) + 1);
    console.log(`Prepared data.`);

    // Creates neural network.
    let nn = ml5.neuralNetwork({ task: 'regression', debug: true });
    console.log(`Created neural network.`);

    // Adds data to neural network.
    for (let patient of trainData) {
        nn.addData(
            { age: patient.age, sex: patient.sex, bmi: patient.bmi, children: patient.children },
            { charges: Number(patient.charges.replace(/[^0-9.-]+/g, "")) }
        );
        console.log(`Added patient to neural network as training data.`);
    }    

    // Normalizes data.
    nn.normalizeData();
    console.log(`Normalized data.`);

    // Trains.
    nn.train({ epochs: 100 }, () => console.log("Finished training."));

    // Makes predictions.
    async function makePrediction() {
        console.log(`Initialized makePrediction().`);
    
        let predictions = [];
        for (let patient of testData) {
            const testPatient = { age: patient.age, sex: patient.sex, bmi: patient.bmi, children: patient.children };
            const pred = await nn.predict(testPatient);
            
            console.log(`Added patient to neural network as test data.`);
        
            console.log(`Predicted charges for patient with the following details:
            \n age: ${patient.age}
            \n sex: ${patient.sex}
            \n bmi: ${patient.bmi}
            \n children: ${patient.children}
            \n charges: ${patient.charges}`);
        
            console.log(`Predicted charges: ${pred[0].charges}`);
        
            predictions.push({ x: Number(pred[0].charges), y: patient.bmi });
        }
        
    
        console.log(`Completed makePrediction().`);
    
        let chartdata;
        try {
            chartdata = data.map(patient => ({
                x: Number(patient.charges.replace(/[^0-9.-]+/g, "")),
                y: patient.bmi,
            }));
        } catch (error) {
            console.error(error);
        }        
    
        // Create chart using chartdata
        createChart(chartdata, "charges", "bmi");
    
        // Update chart with predictions
        updateChart("Predictions", predictions);
    }
    
    makePrediction();
     

    console.log(`Completed checkData().`)
}