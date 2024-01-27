// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


error NOT_AUTHORIZED();
error DOCTOR_NOT_FOUND(address _doctor);

contract Meddy {

    struct MedicalRecord {
        uint256 case_no;
        string diseaseName;
        string drugName;
        string imgurl;
        address[] authorized; 
        uint256 consultancyFees;
    }

    mapping (address => MedicalRecord[]) records;

    event Diagnosis(address indexed patient, address indexed doctor, string disease, string drug);

    function diagnosePatient(address _patient, uint _case_no, string memory _diseaseName, string memory _drugName,string memory _imgurl, uint256 _charges) public {
        address[] memory temporary = new address[](2);
        temporary[0]=_patient;
        temporary[1]=msg.sender;
        MedicalRecord memory newRecord = MedicalRecord(_case_no, _diseaseName, _drugName,_imgurl, temporary, _charges);
        records[_patient].push(newRecord);
        emit Diagnosis(_patient, msg.sender, _diseaseName, _drugName);
    }

    function getPatientRecord(uint _case_no, address _patient) public view returns (string memory, string memory, string memory, uint){
       for(uint i = 0; i< records[_patient].length; i++){
        if(records[_patient][i].case_no == _case_no){
            for(uint j = 0; j < records[_patient][i].authorized.length; j++){
                if(records[_patient][i].authorized[j] == msg.sender){
                    return (
                        records[_patient][i].diseaseName,
                        records[_patient][i].drugName,
                        records[_patient][i].imgurl,
                        records[_patient][i].consultancyFees
                        );
                }
            }   
        }}
        revert NOT_AUTHORIZED();
    }

    // GETALLRECORDS
    function getAllRecords(address _patient) public view returns ( MedicalRecord[] memory){
        return records[_patient];
    }



    //remove authorization
    function removeAccess(address _patient, address _doctor, uint _case_no) public {
        bool isremoved = false;
        for(uint i = 0; i< records[_patient].length; i++){
        if(records[_patient][i].case_no == _case_no){
            for(uint j = 0; j < records[_patient][i].authorized.length; j++){
                if(records[_patient][i].authorized[j] == _doctor){
                    address temp = records[_patient][i].authorized[records[_patient][i].authorized.length - 1];
                    records[_patient][i].authorized[records[_patient][i].authorized.length -1 ] = records[_patient][i].authorized[j];
                    records[_patient][i].authorized[j] = temp;
                    records[_patient][i].authorized.pop();
                    isremoved = true;   
                }
            }
        }}
        
        if(!isremoved){
            revert DOCTOR_NOT_FOUND(_doctor);
        }
    }

    //give permissions
    function grantAccess(address _referredDoctor,  address _patient, uint _case_no) public {
        bool granted = false;
        if(msg.sender == _patient){
            for(uint i = 0; i< records[_patient].length; i++){
                if(records[_patient][i].case_no == _case_no){
                    records[_patient][i].authorized.push(_referredDoctor);   
                    granted = true;
                }
            }
        } else {
            for(uint i = 0; i< records[_patient].length; i++){
            if(records[_patient][i].case_no == _case_no){
                for(uint j = 0; j < records[_patient][i].authorized.length; j++){
                    if(records[_patient][i].authorized[j] == msg.sender){
                        records[_patient][i].authorized.push(_referredDoctor);   
                        granted = true;
                        }   
                    }
                }
            
            }
        }
        if(!granted){
            revert DOCTOR_NOT_FOUND(msg.sender);
        }
    }

   
}
