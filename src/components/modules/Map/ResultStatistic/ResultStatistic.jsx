import './ResultStatistic.css'
import { useContext, useMemo } from "react"
import ReactApexChart from "react-apexcharts";
import { MapContext } from "src/contexts/MapContext"
import Offcanvas from "src/components/interfaces/Offcanvas/Offcanvas"

const ResultStatistic = () => {
    const {isOpenOffCanvasStatistic, setIsOpenOffCanvasStatistic} = useContext(MapContext)
    const {dataResponseStatistic} = useContext(MapContext)
    const bigScreen = window.innerWidth > 768

    const seriesRenderChart = useMemo(() => {
        const {slnv1_2n, slnv1_1n, slnv1_ht, ctieu_2n, ctieu_1n, ctieu_ht} = dataResponseStatistic
        const competitive_rates_2n = (slnv1_2n / ctieu_2n) * 100
        const competitive_rates_1n = (slnv1_1n / ctieu_1n) * 100
        const competitive_rates_ht = (slnv1_ht / ctieu_ht) * 100
        return (
            [
                {
                    name: "Tổng số thí sinh đăng ký",
                    type: "column",
                    data: [slnv1_2n, slnv1_1n, slnv1_ht]
                }, {
                    name: "Tổng số chỉ tiêu",
                    type: "column",
                    data: [ctieu_2n, ctieu_1n, ctieu_ht]
                }, {
                    name: "Tỉ lệ chọi",
                    type: "line",
                    data: [competitive_rates_2n.toFixed(), competitive_rates_1n.toFixed(), competitive_rates_ht.toFixed()]
                }
            ]
        )
    }, [dataResponseStatistic])

    const optionsRenderChart = useMemo(() => {
        const {namht, tentruong} = dataResponseStatistic
        return (
            {
                chart: {
                    type: "line",
                    stacked: false,
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            zoom: false,
                            zoomin: false,
                            zoomout: false,
                            pan: false,
                            selection: false,
                            reset: false
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: [1, 1, 4]
                },
                title: {
                    text: tentruong,
                    align: "center"
                },
                xaxis: {
                    categories: [namht - 2, namht - 1, namht],
                },
                yaxis: [
                    {
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: "#008FFB"
                        },
                        labels: {
                            style: {
                                colors: "#008FFB",
                            }
                        },
                        title: {
                            text: "Số lượng đăng ký (học sinh)",
                            style: {
                                color: "#008FFB",
                            }
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    {
                        seriesName: "Tổng số thí sinh đăng ký",
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: "#00E396"
                        },
                        labels: {
                            style: {
                                colors: "#00E396",
                            }
                        },
                        title: {
                            text: "Số lượng chỉ tiêu (học sinh)",
                            style: {
                                color: "#00E396",
                            }
                        },
                    },
                    {
                        seriesName: "Tỉ lệ chọi",
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: "#FEB019"
                        },
                        labels: {
                            style: {
                                colors: "#FEB019",
                            },
                        },
                        title: {
                            text: "Tỉ lệ chọi (%)",
                            style: {
                                color: "#FEB019",
                            }
                        }
                    }
                ],
                tooltip: {
                    fixed: {
                        enabled: true,
                        position: "topLeft",
                        offsetY: 35,
                        offsetX: 75
                    },
                },
                legend: {
                    horizontalAlign: "center"
                }
            }
        )
    }, [dataResponseStatistic])

    return (
        <Offcanvas isOpen={isOpenOffCanvasStatistic} onClose={() => setIsOpenOffCanvasStatistic(false)} position={bigScreen ? 'centerright': 'center'} size={bigScreen ? {height: '45vh', width: '500px'} : {height: '35vh', width: '350px'}} style={{overflow: 'hidden'}}>
            <Offcanvas.Header>Biểu đồ thống kê tỉ lệ chọi</Offcanvas.Header>
            <Offcanvas.Body>
                <ReactApexChart 
                    options={optionsRenderChart}
                    series={seriesRenderChart}
                    type="line"
                    width="100%"
                    height="auto"
                ></ReactApexChart>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ResultStatistic