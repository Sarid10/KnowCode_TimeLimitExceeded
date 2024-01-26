// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


error NOT_AUTHORIZED();
error DOCTOR_NOT_FOUND(address _doctor);
error PATIENT_NOT_FOUND(address _patient);
error INSUFFICIENT_CONSULTANCYFEE();
contract Meddy {

    struct MedicalRecord {
        uint256 case_no;
        string diseaseName;
        string drugName;
        string imgurl;
        address doctor;
        uint256 consultancyFees;
    }

    struct Patient {
        uint id;
        string name;
        uint16 age;
        uint16 weight;
        uint16 height;
        MedicalRecord[] medicalRecords;
        address[] authorized;
    }

    struct Doctor {
        uint id;
        string name;
        uint doctorId;
        string specialism;
        address[] PatientsAddress;
    }

    uint patId = 1;
    uint docId = 1;
    uint caseId = 1;

    mapping(address => Patient) public patients;

    mapping(address => Doctor) public doctors;

    event Diagnosis(address indexed patient, address indexed doctor, string disease, string drug);


    function addPatient(string memory _name,uint16 _age, uint16 _weight, uint16 _height) public {
        Patient storage patient = patients[msg.sender];
        patient.id = patId;
        patient.name = _name;
        patient.age = _age;
        patient.height = _height;
        patient.weight = _weight;
        patId++;
    }

    function addDoctor(string memory _name,uint _doctorId, string memory _specialism) public {
        Doctor storage doctor = doctors[msg.sender];
        doctor.id = docId;
        doctor.name = _name;
        doctor.doctorId = _doctorId;
        doctor.specialism = _specialism;
        docId++;
    }


    function diagnosePatient(address _patient, string memory _diseaseName, string memory _drugName,string memory _imgurl, uint256 _charges) public payable {
        if(msg.value < _charges){
            revert INSUFFICIENT_CONSULTANCYFEE();
        }
        MedicalRecord memory newRecord = MedicalRecord(caseId, _diseaseName, _drugName,_imgurl, msg.sender, _charges);
        patients[_patient].medicalRecords.push(newRecord);
        caseId++;
        bool existing_patient = false;
        for(uint i = 0; i < doctors[msg.sender].PatientsAddress.length; i++){
            if(doctors[msg.sender].PatientsAddress[i] == _patient){
                existing_patient = true;
            }
        }
        if(!existing_patient){
            doctors[msg.sender].PatientsAddress.push(_patient);
        }
        patients[_patient].authorized.push(msg.sender);
        emit Diagnosis(_patient, msg.sender, _diseaseName, _drugName);
    }

    function getPatientDetails(address _patient) public view returns (uint,string memory,uint16, uint16, uint16, MedicalRecord[] memory, address[] memory) {
        if(patients[_patient].id == 0){
            revert PATIENT_NOT_FOUND(_patient);
        }
        if(msg.sender != _patient){
            if(!checkAuthorizedDoctor(_patient, msg.sender)){
                revert NOT_AUTHORIZED();
            }
        }
        return (
            patients[_patient].id,
            patients[_patient].name,
            patients[_patient].age,
            patients[_patient].weight,
            patients[_patient].height,
            patients[_patient].medicalRecords,
            patients[_patient].authorized
        );
    }

    function getDoctorDetails(address _doctor) public view returns (string memory,uint, string memory,address[] memory) {
        return (
            doctors[_doctor].name,
            doctors[_doctor].doctorId,
            doctors[_doctor].specialism,
            doctors[_doctor].PatientsAddress
        );
    }

    //remove authorization
    function removeAccess(address _patient, address _doctor) public {
        if(patients[_patient].id == 0){
            revert PATIENT_NOT_FOUND(_patient);
        }
        if(msg.sender != _patient){
            if(!checkAuthorizedDoctor(_patient, msg.sender)){
                revert NOT_AUTHORIZED();
            }
        }
        bool isremoved = false;
        for(uint i = 0; i < patients[_patient].authorized.length; i++){
            if (patients[_patient].authorized[i] == _doctor ){
                address temp = patients[_patient].authorized[patients[_patient].authorized.length - 1];
                patients[_patient].authorized[patients[_patient].authorized.length - 1] = patients[_patient].authorized[i];
                patients[_patient].authorized[i] = temp;
                patients[_patient].authorized.pop();
                
                isremoved = true;
            }
        }
        if(!isremoved){
            revert DOCTOR_NOT_FOUND(_doctor);
        }
    }

    //give permissions
    function grantAccess(address _referredDoctor,  address _patient) public {
        if(patients[_patient].id == 0){
            revert PATIENT_NOT_FOUND(_patient);
        }
        if(msg.sender != _patient){
            if(!checkAuthorizedDoctor(_patient, msg.sender)){
                revert NOT_AUTHORIZED();
            }

        }
        if(doctors[_referredDoctor].doctorId == 0){
            revert DOCTOR_NOT_FOUND(_referredDoctor);
        }
        patients[_patient].authorized.push(_referredDoctor);
    }

    function checkAuthorizedDoctor(address _patient, address _doctor) internal view returns (bool) {
        for(uint i = 0; i < patients[_patient].authorized.length; i++){
                if(patients[_patient].authorized[i] == _doctor){
                    return true; 
                }
            }
            return false;
    }

}
