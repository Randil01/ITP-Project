import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './itemrepoart.css';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../header/images/panadura_mn.png'
import Header from '../header/header';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function ItemRepoart() {
    const navigate = useNavigate(); // Initialize navigate
    const componentPDF = useRef();
    const [countlist, setcountlist] = useState([]);
    const [customerlist, setcustomerlist] = useState([]);

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Total Item Report',
        onBeforeGetContent: () => Promise.resolve(),
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    const getfetchdata = async () => {
        try {
            const data = await axios.get('http://localhost:5000/item_count');
            const { count } = data.data;
            setcountlist(count);
            setcustomerlist(data.data.data);
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    const sortedCustomerList = [...customerlist].sort((a, b) => a.rouly_garbage - b.rouly_garbage);

    const chartData = {
        labels: sortedCustomerList.map(order => order.rouly_garbage),
        datasets: [
            {
                label: 'Garbage',
                data: sortedCustomerList.map(order => order.rouly_garbage),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    };

    return (
        <div>
            <Header/>
        <div className='repoart'>
            <h3>Garbage Details:</h3>
            <h3>Total:</h3>
            {countlist !== null ? <p>Total: {countlist}</p> : <p>Loading...</p>}
            

            <div ref={componentPDF} className='pdf-content'>
                <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img
                        src={logo} // Path to your logo image
                        alt="Panadura Municipal Council Logo"
                        style={{ width: '100px', marginBottom: '10px' }} // Adjust size as needed
                    />
                    <h2 className='pdf-title'>Panadura Municipal Council <br/>Total Garbage Report</h2>

                </header>
                <div className='chart-container'>
                    <Bar data={chartData} />
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Last Garbage Collected Date</th>
                            <th>Roughly Weight of Garbage</th>
                            <th>Latest Garbage Collection Date</th>
                            <th>Select the Garbage Collection Vehicle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCustomerList.map((e) => (
                            <tr key={e.order_id}>
                                <td>{e.Last_garbage}</td>
                                <td>{e.rouly_garbage}</td>
                                <td>{e.vehcile}</td>
                                <td>{e.autoselect}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={generatePDF}>Download Report</button>
            <div className="navigation-buttons">
                <button onClick={() => navigate('/itemdetails')}>All Details</button>
                <button onClick={() => navigate('/add-item')}>Add Details</button>
            </div>
        </div>
        </div>
    );
}

export default ItemRepoart;
