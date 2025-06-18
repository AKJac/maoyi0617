// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 销售与采购趋势图
    const salesPurchaseChart = document.getElementById('salesPurchaseChart');
    if (salesPurchaseChart) {
        new Chart(salesPurchaseChart, {
            type: 'line',
            data: {
                labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
                datasets: [
                    {
                        label: '销售额',
                        data: [1250000, 1340000, 1150000, 1450000, 1285000, 1520000],
                        borderColor: '#3f51b5',
                        backgroundColor: 'rgba(63, 81, 181, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '采购额',
                        data: [850000, 920000, 780000, 980000, 840000, 1050000],
                        borderColor: '#f50057',
                        backgroundColor: 'rgba(245, 0, 87, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '利润',
                        data: [400000, 420000, 370000, 470000, 445000, 470000],
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('zh-CN', { 
                                        style: 'currency', 
                                        currency: 'CNY',
                                        maximumFractionDigits: 0
                                    }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value >= 1000000 ? 
                                    (value / 1000000).toFixed(1) + 'M' : 
                                    (value / 1000).toFixed(0) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }

    // 合同状态分布图
    const contractStatusChart = document.getElementById('contractStatusChart');
    if (contractStatusChart) {
        new Chart(contractStatusChart, {
            type: 'doughnut',
            data: {
                labels: ['已确认', '待确认', '待审批', '已取消'],
                datasets: [{
                    data: [28, 6, 5, 3],
                    backgroundColor: [
                        '#4caf50',
                        '#ff9800',
                        '#03a9f4',
                        '#f44336'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                },
                cutout: '65%'
            }
        });
    }

    // 供应商采购汇总图
    const supplierChart = document.getElementById('supplierChart');
    if (supplierChart) {
        new Chart(supplierChart, {
            type: 'bar',
            data: {
                labels: ['美国供应商A', '日本供应商F', '韩国供应商D', '德国供应商G', '法国供应商H'],
                datasets: [{
                    label: '本季度采购额',
                    data: [380000, 320000, 280000, 250000, 220000],
                    backgroundColor: [
                        'rgba(63, 81, 181, 0.7)',
                        'rgba(63, 81, 181, 0.6)',
                        'rgba(63, 81, 181, 0.5)',
                        'rgba(63, 81, 181, 0.4)',
                        'rgba(63, 81, 181, 0.3)'
                    ],
                    borderColor: [
                        'rgb(63, 81, 181)',
                        'rgb(63, 81, 181)',
                        'rgb(63, 81, 181)',
                        'rgb(63, 81, 181)',
                        'rgb(63, 81, 181)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value >= 1000000 ? 
                                    (value / 1000000).toFixed(1) + 'M' : 
                                    (value / 1000).toFixed(0) + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.x !== null) {
                                    label += new Intl.NumberFormat('zh-CN', { 
                                        style: 'currency', 
                                        currency: 'CNY',
                                        maximumFractionDigits: 0
                                    }).format(context.parsed.x);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // 为工具提示初始化
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}); 