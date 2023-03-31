import { Checkbox, Divider } from 'antd';
import { useState } from 'react';

const CheckboxGroup = Checkbox.Group;
const individualTest = ['Glucose','HbA1c (HPLC)','HbA1c (Immunoassay)','Uric acid','MALB','Ca','MG','P']
const lipidProfile = ['Total Cholesterol','HDL-c','LDL-c','Triglyceride'];
const liverFunctionTest = ['TP','ALB','ALT','AST','ALP','TB','DB','GLOB']
const electrolyte = ['Na','K','Cl','CO2','Ag']
const renalFunctionTest = ['BUN','Creatinine','eGFR']
const hematology = ['CBC','Hct','Hb','Prothrombin Time','ABO Group','Rh Subgroup']
const urinalysis = ['Physical Examination','Urine Chemistry','Microscopic Examination']
const individualUrinetest = ['Urine Toxicology','Methamphetamine','Pregnancy Test']
const tyroidFunction = ['Free T3','Free T4','TSH']
const caTest = ['CA125','CA153','CA19-9']
const covidTest = ['Covid 19 Ag','Covid 19 IgG/IgM','Covid 19 IgG/IgM (Bio)','Covid 19 Ag (Biorad)','Covid 19 Ag (Bio on step)']
const individualAnotherTest = ['AFP','CEA','Total PSA','Anti HIV','X-Ray','Eye Examination']
const payment = ['เงินสด','โอนเงิน','เช็ค']

const Page = () => {
    const [hn, setHn] = useState('')
    const [name, setName] = useState('')
    const [sex, setSex] = useState('')
    const [age, setAge] = useState('')
    const [test, setTest] = useState('')
    const [paymentmethod, setPaymentMethod] = useState();
    const [cost, setCost] = useState('')
    const [invoice, setInvoice] = useState();
    const [checkedList, setCheckedList] = useState();

    //individualTest
    const onChange = (list) => {setCheckedList(list);};

    //lipidProfile
    const [checkedList_lipidProfile, setCheckedList_lipidProfile] = useState();
    const [indeterminate_lipidProfile, setIndeterminate_lipidProfile] = useState(true);
    const [checkAll_lipidProfile, setCheckAll_lipidProfile] = useState(false);
    const onChange_lipidProfile = (list) => {
        setCheckedList_lipidProfile(list);
        setIndeterminate_lipidProfile(!!list.length && list.length < lipidProfile.length);
        setCheckAll_lipidProfile(list.length === lipidProfile.length);
    };
    const onCheckAllChange_lipidProfile = (e) => {
        setCheckedList_lipidProfile(e.target.checked ? lipidProfile : []);
        setIndeterminate_lipidProfile(false);
        setCheckAll_lipidProfile(e.target.checked);
    };

    //liverFunctionTest
    const [checkedList_liverFunctionTest, setCheckedList_liverFunctionTest] = useState();
    const [indeterminate_liverFunctionTest, setIndeterminate_liverFunctionTest] = useState(true);
    const [checkAll_liverFunctionTest, setCheckAll_liverFunctionTest] = useState(false);
    const onChange_liverFunctionTest = (list) => {
        setCheckedList_liverFunctionTest(list);
        setIndeterminate_liverFunctionTest(!!list.length && list.length < liverFunctionTest.length);
        setCheckAll_liverFunctionTest(list.length === liverFunctionTest.length);
    };
    const onCheckAllChange_liverFunctionTest = (e) => {
        setCheckedList_liverFunctionTest(e.target.checked ? liverFunctionTest : []);
        setIndeterminate_liverFunctionTest(false);
        setCheckAll_liverFunctionTest(e.target.checked);
    };

    //electrolyte
    const [checkedList_electrolyte, setCheckedList_electrolyte] = useState();
    const [indeterminate_electrolyte, setIndeterminate_electrolyte] = useState(true);
    const [checkAll_electrolyte, setCheckAll_electrolyte] = useState(false);
    const onChange_electrolyte = (list) => {
        setCheckedList_electrolyte(list);
        setIndeterminate_electrolyte(!!list.length && list.length < electrolyte.length);
        setCheckAll_electrolyte(list.length === electrolyte.length);
    };
    const onCheckAllChange_electrolyte = (e) => {
        setCheckedList_electrolyte(e.target.checked ? electrolyte : []);
        setIndeterminate_electrolyte(false);
        setCheckAll_electrolyte(e.target.checked);
    };

    //renalFunctionTest
    const [checkedList_renalFunctionTest, setCheckedList_renalFunctionTest] = useState();
    const [indeterminate_renalFunctionTest, setIndeterminate_renalFunctionTest] = useState(true);
    const [checkAll_renalFunctionTest, setCheckAll_renalFunctionTest] = useState(false);
    const onChange_renalFunctionTest = (list) => {
        setCheckedList_renalFunctionTest(list);
        setIndeterminate_renalFunctionTest(!!list.length && list.length < renalFunctionTest.length);
        setCheckAll_renalFunctionTest(list.length === renalFunctionTest.length);
    };
    const onCheckAllChange_renalFunctionTest = (e) => {
        setCheckedList_renalFunctionTest(e.target.checked ? renalFunctionTest : []);
        setIndeterminate_renalFunctionTest(false);
        setCheckAll_renalFunctionTest(e.target.checked);
    };

    //hematology
    const [checkedList_hematology, setCheckedList_hematology] = useState();
    const [indeterminate_hematology, setIndeterminate_hematology] = useState(true);
    const [checkAll_hematology, setCheckAll_hematology] = useState(false);
    const onChange_hematology = (list) => {
        setCheckedList_hematology(list);
        setIndeterminate_hematology(!!list.length && list.length < hematology.length);
        setCheckAll_hematology(list.length === hematology.length);
    };
    const onCheckAllChange_hematology = (e) => {
        setCheckedList_hematology(e.target.checked ? hematology : []);
        setIndeterminate_hematology(false);
        setCheckAll_hematology(e.target.checked);
    };

    //urinalysis
    const [checkedList_urinalysis, setCheckedList_urinalysis] = useState();
    const [indeterminate_urinalysis, setIndeterminate_urinalysis] = useState(true);
    const [checkAll_urinalysis, setCheckAll_urinalysis] = useState(false);
    const onChange_urinalysis = (list) => {
        setCheckedList_urinalysis(list);
        setIndeterminate_urinalysis(!!list.length && list.length < urinalysis.length);
        setCheckAll_urinalysis(list.length === urinalysis.length);
    };
    const onCheckAllChange_urinalysis = (e) => {
        setCheckedList_urinalysis(e.target.checked ? urinalysis : []);
        setIndeterminate_urinalysis(false);
        setCheckAll_urinalysis(e.target.checked);
    };

    //individualUrinetest

    //tyroidFunction
    const [checkedList_tyroidFunction, setCheckedList_tyroidFunction] = useState();
    const [indeterminate_tyroidFunction, setIndeterminate_tyroidFunction] = useState(true);
    const [checkAll_tyroidFunction, setCheckAll_tyroidFunction] = useState(false);
    const onChange_tyroidFunction = (list) => {
        setCheckedList_tyroidFunction(list);
        setIndeterminate_tyroidFunction(!!list.length && list.length < tyroidFunction.length);
        setCheckAll_tyroidFunction(list.length === tyroidFunction.length);
    };
    const onCheckAllChange_tyroidFunction = (e) => {
        setCheckedList_tyroidFunction(e.target.checked ? tyroidFunction : []);
        setIndeterminate_tyroidFunction(false);
        setCheckAll_tyroidFunction(e.target.checked);
    };

    //caTest
    const [checkedList_caTest, setCheckedList_caTest] = useState();
    const [indeterminate_caTest, setIndeterminate_caTest] = useState(true);
    const [checkAll_caTest, setCheckAll_caTest] = useState(false);
    const onChange_caTest = (list) => {
        setCheckedList_caTest(list);
        setIndeterminate_caTest(!!list.length && list.length < caTest.length);
        setCheckAll_caTest(list.length === caTest.length);
    };
    const onCheckAllChange_caTest = (e) => {
        setCheckedList_caTest(e.target.checked ? caTest : []);
        setIndeterminate_caTest(false);
        setCheckAll_caTest(e.target.checked);
    };

    //covidTest
    const [checkedList_covidTest, setCheckedList_covidTest] = useState();
    const [indeterminate_covidTest, setIndeterminate_covidTest] = useState(true);
    const [checkAll_covidTest, setCheckAll_covidTest] = useState(false);
    const onChange_covidTest = (list) => {
        setCheckedList_covidTest(list);
        setIndeterminate_covidTest(!!list.length && list.length < covidTest.length);
        setCheckAll_covidTest(list.length === covidTest.length);
    };
    const onCheckAllChange_covidTest = (e) => {
        setCheckedList_covidTest(e.target.checked ? covidTest : []);
        setIndeterminate_covidTest(false);
        setCheckAll_covidTest(e.target.checked);
    };

    //individualAnotherTest

    //payment
    const [checkedList_payment, setCheckedList_payment] = useState();
    const [indeterminate_payment, setIndeterminate_payment] = useState(true);
    const [checkAll_payment, setCheckAll_payment] = useState(false);
    const onChange_payment = (list) => {
        setCheckedList_payment(list);
        setIndeterminate_payment(!!list.length && list.length < payment.length);
        setCheckAll_payment(list.length === payment.length);
    };
    const onCheckAllChange_payment = (e) => {
        setCheckedList_payment(e.target.checked ? payment : []);
        setIndeterminate_payment(false);
        setCheckAll_payment(e.target.checked);
    };

    return (
        <>
            <h1>Lab Order Form</h1>
            <p>HN</p>
            <input type="text" value={hn} onChange={event => setHn(event.target.value)}/>
            <p>ชื่อ-สกุล</p>
            <input type="text" value={name} onChange={event => setName(event.target.value)}/>
            <p>เพศ</p>
            <input type="text" value={sex} onChange={event => setSex(event.target.value)}/>
            <p>อายุ</p>
            <input type="text" value={age} onChange={event => setAge(event.target.value)}/>
            <Divider></Divider>
            <CheckboxGroup options={individualTest} onChange={onChange}/>
            <br></br>
            <Checkbox indeterminate={indeterminate_lipidProfile} onChange={onCheckAllChange_lipidProfile}
            checked={checkAll_lipidProfile}><h3>Lipid Profile:</h3></Checkbox>
            <CheckboxGroup options={lipidProfile} value={checkedList_lipidProfile} onChange={onChange_lipidProfile}/>
            <br></br>
            <Checkbox indeterminate={indeterminate_liverFunctionTest} onChange={onCheckAllChange_liverFunctionTest}
            checked={checkAll_liverFunctionTest}><h3>Liver Function Test:</h3></Checkbox>
            <CheckboxGroup options={liverFunctionTest} value={checkedList_liverFunctionTest} onChange={onChange_liverFunctionTest}/>
            <br></br>
            <Checkbox indeterminate={indeterminate_electrolyte} onChange={onCheckAllChange_electrolyte}
            checked={checkAll_electrolyte}><h3>Electrolyte:</h3></Checkbox>
            <CheckboxGroup options={electrolyte} value={checkedList_electrolyte} onChange={onChange_electrolyte}/>
            <br></br>
            <Checkbox indeterminate={indeterminate_renalFunctionTest} onChange={onCheckAllChange_renalFunctionTest}
            checked={checkAll_renalFunctionTest}><h3>Renal Function Test:</h3></Checkbox>
            <CheckboxGroup options={renalFunctionTest} value={checkedList_renalFunctionTest} onChange={onChange_renalFunctionTest}/>
            <br></br>
            <Checkbox indeterminate={indeterminate_hematology} onChange={onCheckAllChange_hematology}
            checked={checkAll_hematology}><h3>Hematology:</h3></Checkbox>
            <CheckboxGroup options={hematology} value={checkedList_hematology} onChange={onChange_hematology}/>
            <br></br>
            <Checkbox indeterminate={indeterminate_urinalysis} onChange={onCheckAllChange_urinalysis}
            checked={checkAll_urinalysis}><h3>Urinalysis:</h3></Checkbox>
            <CheckboxGroup options={urinalysis} value={checkedList_urinalysis} onChange={onChange_urinalysis}/>
            <br></br>
            <CheckboxGroup options={individualUrinetest} onChange={onChange}/>
            <br></br>
            <Checkbox indeterminate={indeterminate_tyroidFunction} onChange={onCheckAllChange_tyroidFunction}
            checked={checkAll_tyroidFunction}><h3>Thyroid Function Test:</h3></Checkbox>
            <CheckboxGroup options={tyroidFunction} value={checkedList_tyroidFunction} onChange={onChange_tyroidFunction}/>
            <br></br>
            <Checkbox indeterminate={indeterminate_caTest} onChange={onCheckAllChange_caTest}
            checked={checkAll_caTest}><h3>CA Test:</h3></Checkbox>
            <CheckboxGroup options={caTest} value={checkedList_caTest} onChange={onChange_caTest}/>
            <br></br>
            <Checkbox indeterminate={indeterminate_covidTest} onChange={onCheckAllChange_covidTest}
            checked={checkAll_covidTest}><h3>COVID Test:</h3></Checkbox>
            <CheckboxGroup options={covidTest} value={checkedList_covidTest} onChange={onChange_covidTest}/>
            <br></br>
            <CheckboxGroup options={individualAnotherTest} onChange={onChange}/>
            <br></br>
            <Checkbox indeterminate={indeterminate_payment} onChange={onCheckAllChange_payment}
            checked={checkAll_payment}><h3>payment:</h3></Checkbox>
            <CheckboxGroup options={payment} value={checkedList_payment} onChange={onChange_payment}/>
            <Divider></Divider>
            <p>เพศ</p>
            <input type="text" value={cost} onChange={event => setCost(event.target.value)}/>
            <p>อายุ</p>
            <input type="text" value={invoice} onChange={event => setInvoice(event.target.value)}/>
        </>
    );
};

export default Page;