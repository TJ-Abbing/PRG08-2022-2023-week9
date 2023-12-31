const canvas = document.getElementById('myChart')
let myChart

// documentatie 
// https://www.chartjs.org/docs/latest/charts/scatter.html

export function createChart(columns, labelx, labely){

    console.log(`Initializing createChart().`)
    console.log(columns);
    
    const config = {
        type: 'scatter',
        data: {
            datasets: [{
                label: `${labelx} vs ${labely}`,
                data: columns,
                backgroundColor: 'rgb(185, 185, 255)'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {display: true, text: labelx}
                },
                y: {
                    title: {display: true, text: labely}
                }
            },
            layout: {
                padding: 30
            }
        }
    }

    myChart = new Chart(canvas, config)

    console.log(`Completed createChart().`)
}

// update an existing chart
// https://www.chartjs.org/docs/latest/developers/updates.html
export function updateChart(label, data){

    console.log(`Initializing updateChart().`)

    myChart.data.datasets.push({
        label,
        data,
        backgroundColor: 'rgb(255, 44, 44)'
    })
    myChart.update()

    console.log(`Completed updateChart().`)
}
