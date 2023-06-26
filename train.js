import { createChart, updateChart } from "./scatterplot.js"

function loadData(){
        Papa.parse("./data/insurance.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => checkData(results.data)
        })
    } loadData()
    
    function checkData(data) {
        console.table(data)
    }