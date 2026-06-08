let cpuChart;
let serverChart;

async function loadDashboard() {

    try {

        const response = await fetch('./data/metrics.json');
        const data = await response.json();

        updateCards(data);

        createCpuChart(data);
        createRamChart(data);
        createDiskChart(data);

        createServerChart(data);

    } catch(error) {

        console.error("Error cargando datos:", error);

    }

}

loadDashboard();

function updateCards(data){

    document.getElementById("cpuPercentage").textContent =
        data.cpu[data.cpu.length - 1] + "%";

    document.getElementById("ramPercentage").textContent =
        data.ram[data.ram.length - 1] + "%";

    document.getElementById("diskPercentage").textContent =
        data.disk[data.disk.length - 1] + "%";

}

function createCpuChart(data){

    const ctx = document.getElementById('cpuGauge');

    cpuChart = new Chart(ctx, {

        type: 'doughnut',

        data: {
            datasets: [{


                data: [45,55],
                
                backgroundColor: [
                    '#47cd05',
                    '#1f2937'
                ],

                borderWidth: 0
                

            }]

        },
        options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    rotation:-90,

                    circumference:180,

                    cutout:'75%',

                    plugins:{
                        legend:{
                            display:false
                        }
                    }
                }


    });

}

function createRamChart(data){

    const ctx = document.getElementById('ramGauge');

    ramChart = new Chart(ctx, {

        type: 'doughnut',

        data: {
            datasets: [{


                data: [62,38],
                
                backgroundColor: [
                    '#3b82f6',
                    '#1f2937'
                ],

                borderWidth: 0
                

            }]

        },
        options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    rotation:-90,

                    circumference:180,

                    cutout:'75%',

                    plugins:{
                        legend:{
                            display:false
                        }
                    }
                }


    });

}

function createDiskChart(data){

    const ctx = document.getElementById('diskGauge');

    diskChart = new Chart(ctx, {

        type: 'doughnut',

        data: {
            datasets: [{


                data: [78,22],
                
                backgroundColor: [
                    '#f8e56b',
                    '#1f2937'
                ],

                borderWidth: 0
                

            }]

        },
        options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    rotation:-90,

                    circumference:180,

                    cutout:'75%',

                    plugins:{
                        legend:{
                            display:false
                        }
                    }
                }

    });

}

function createServerChart(data){

    const ctx = document.getElementById('serverChart');

    serverChart = new Chart(ctx, {

        type: 'doughnut',

        data: {

            labels: ['Online', 'Offline'],

            datasets: [{

                data: [
                    data.servers.online,
                    data.servers.offline
                ]

            }]

        }

    });

}

