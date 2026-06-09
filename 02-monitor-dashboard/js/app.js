let cpuChart;
let serverChart;
let uptimeChart;

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

function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        const itemPage = item.getAttribute('href');
        
        if (itemPage === currentPage) {
            item.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveMenu);

function getColor(value) {
    if (value <= 60) return 'green';
    if (value <= 80) return 'yellow';
    return 'red';
}

function createBar(value) {
    return `
        <div style="background:#374151; border-radius:20px; width:100%; height:6px;">
            <div style="
                width: ${value}%;
                height: 100%;
                border-radius: 4px;
                background: ${getColor(value)};
                transition: width 0.3s ease;
            "></div>
        </div>
        <small>${value}%</small>
    `;
}

function getStatusStyle(status) {
    if (status === 'online') {
        return `color: #45ff29; 
                background-color: rgba(98, 255, 0, 0.1); 
                padding: 0.5rem; 
                border-radius: 10%;`;
    } else {
        return `color: rgb(237, 91, 91); 
                background-color: rgba(255, 3, 3, 0.2); 
                padding: 0.5rem; 
                border-radius: 10%;`;
    }
}
async function loadServerTable() {
    try {
        const response = await fetch('./data/servers.json');
        const data = await response.json();

        const tableBody = document.querySelector('#serversTable tbody');
        tableBody.innerHTML = '';

        data.servers.forEach(server => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${server.name}</td>
                <td><span style="${getStatusStyle(server.status)}">${server.status}</span></td>
                <td>${createBar(server.cpu)}</td>
                <td>${createBar(server.ram)}</td>
                <td>${createBar(server.disk)}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch(error) {
        console.error("Error cargando servidores:", error);
    }
}

loadServerTable();