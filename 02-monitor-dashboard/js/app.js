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

    document.getElementById("cpuValue").textContent =
        data.cpu[data.cpu.length - 1] + "%";

    document.getElementById("ramValue").textContent =
        data.ram[data.ram.length - 1] + "%";

    document.getElementById("diskValue").textContent =
        data.disk[data.disk.length - 1] + "%";

}

function createCpuChart(data){

    const ctx = document.getElementById('cpuChart');

    cpuChart = new Chart(ctx, {

        type: 'line',

        data: {

            labels: [
                '10:00',
                '10:05',
                '10:10',
                '10:15',
                '10:20',
                '10:25'
            ],

            datasets: [{

                label: 'CPU %',

                data: data.cpu,

                borderWidth: 2,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }

            }]

        }

    });

}

function createRamChart(data){

    const ctx = document.getElementById('ramChart');

    ramChart = new Chart(ctx, {

        type: 'line',

        data: {

            labels: [
                '10:00',
                '10:05',
                '10:10',
                '10:15',
                '10:20',
                '10:25'
            ],

            datasets: [{

                label: 'RAM %',

                data: data.ram,

                borderWidth: 2,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }

            }]

        }

    });

}

function createDiskChart(data){

    const ctx = document.getElementById('diskChart');

    diskChart = new Chart(ctx, {

        type: 'line',

        data: {

            labels: [
                '10:00',
                '10:05',
                '10:10',
                '10:15',
                '10:20',
                '10:25'
            ],

            datasets: [{

                label: 'Disk %',

                data: data.disk,

                borderWidth: 2,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }

            }]

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