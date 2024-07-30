document.addEventListener('DOMContentLoaded', function() {
    const chartColors = {
        invested: '#007bff',
        returns: '#28a745'
    };

    // Utility function to format currency
    function formatCurrency(value) {
        return `₹${value.toFixed(2)}`;
    }

    // Utility function to create and update charts
    function createChart(ctx, labels, data) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Invested Value',
                        data: data.invested,
                        borderColor: chartColors.invested,
                        fill: false
                    },
                    {
                        label: 'Returns Value',
                        data: data.returns,
                        borderColor: chartColors.returns,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Months'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Value'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // SIP Calculator
    const sipForm = document.getElementById('sip-form');
    if (sipForm) {
        sipForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const amount = parseFloat(document.getElementById('sip-amount').value);
            const rate = parseFloat(document.getElementById('sip-rate').value) / 100 / 12;
            const months = parseInt(document.getElementById('sip-months').value);

            let futureValue = 0;
            const invested = [];
            const returns = [];
            for (let i = 1; i <= months; i++) {
                futureValue = amount * (((1 + rate) ** i - 1) / rate) * (1 + rate);
                invested.push(amount * i);
                returns.push(futureValue);
            }

            document.getElementById('sip-result').innerText = `Future Value: ${formatCurrency(futureValue)}`;

            const sipChartCtx = document.getElementById('sip-chart').getContext('2d');
            createChart(sipChartCtx, Array.from({ length: months }, (_, i) => i + 1), {
                invested: invested,
                returns: returns
            });
        });
    }

    // SWP Calculator
    const swpForm = document.getElementById('swp-form');
    if (swpForm) {
        swpForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const investment = parseFloat(document.getElementById('swp-investment').value);
            const rate = parseFloat(document.getElementById('swp-rate').value) / 100 / 12;
            const duration = parseInt(document.getElementById('swp-duration').value);
            const withdrawal = parseFloat(document.getElementById('swp-withdrawal').value);

            let balance = investment;
            const invested = [];
            const returns = [];
            for (let i = 1; i <= duration; i++) {
                balance = balance * (1 + rate) - withdrawal;
                invested.push(investment);
                returns.push(investment - balance);
            }

            const totalWithdrawn = investment - balance;
            document.getElementById('swp-result').innerText = `Total Withdrawn: ${formatCurrency(totalWithdrawn)}`;

            const swpChartCtx = document.getElementById('swp-chart').getContext('2d');
            createChart(swpChartCtx, Array.from({ length: duration }, (_, i) => i + 1), {
                invested: invested,
                returns: returns
            });
        });
    }

    // Lump Sum Calculator
    const lumpsumForm = document.getElementById('lumpsum-form');
    if (lumpsumForm) {
        lumpsumForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const amount = parseFloat(document.getElementById('lumpsum-amount').value);
            const rate = parseFloat(document.getElementById('lumpsum-rate').value) / 100 / 12;
            const months = parseInt(document.getElementById('lumpsum-months').value);

            const futureValue = amount * (1 + rate) ** months;
            const invested = Array(months).fill(amount);
            const returns = Array(months).fill(futureValue);

            document.getElementById('lumpsum-result').innerText = `Future Value: ${formatCurrency(futureValue)}`;

            const lumpsumChartCtx = document.getElementById('lumpsum-chart').getContext('2d');
            createChart(lumpsumChartCtx, Array.from({ length: months }, (_, i) => i + 1), {
                invested: invested,
                returns: returns
            });
        });
    }
});
