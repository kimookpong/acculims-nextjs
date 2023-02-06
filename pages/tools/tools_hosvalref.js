import axios from 'axios';
import styles from '../../styles/Home.module.css'
import { useState } from 'react';

const ToolsHosvalref = () => {
    const [name, setname] = useState('');
    const [nameeng, setnameeng] = useState('');
    const [address, setaddress] = useState('');
    const [tel, settel] = useState('');
    const [dept, setdept] = useState('');
    const [logo, setlogo] = useState('');

    async function sendValue(value) {
        axios.post('/api/get_lis_hospital', 
        {name:name, nameeng:nameeng, address:address, tel:tel, dept:dept, logo:logo})
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    async function addValue(value) {
        axios.post('/api/add_lis_hospital', 
        {name:name, nameeng:nameeng, address:address, tel:tel, dept:dept, logo:logo})
            .then(response => {
            console.log(response.data);
            setData(response.data);
            })
            .catch(error => { console.error(error); }
        );
    }

    return(
        <div>
            <h1>Hospital Information</h1>
            <p className={styles.card}>
                <a>ชื่อโรงพยาบาล (ไทย): </a>
                <input type="text" value={name} onChange={e => setname(e.target.value)}/>
                <br></br>
                <a>ชื่อโรงพยาบาล (อังกฤษ): </a>
                <input type="text" value={nameeng} onChange={e => setnameeng(e.target.value)}/>
                <br></br>
                <a>ท่ี่อยู่: </a>
                <input type="text" value={address} onChange={e => setaddress(e.target.value)}/>
                <br></br>
                <a>เบอร์โทรศัพท์: </a>
                <input type="text" value={tel} onChange={e => settel(e.target.value)}/>
                <br></br>
                <a>แผนก: </a>
                <input type="text" value={dept} onChange={e => setdept(e.target.value)}/>
                <br></br>
                <a>Upload logo: </a>
                <input type="text" value={logo} onChange={e => setlogo(e.target.value)}/>
                <br></br>
                <button onClick = {addValue}>Save</button>
                <a> </a>
                <button>Cancel</button>
            </p>
        </div>
    )
}

export default ToolsHosvalref;