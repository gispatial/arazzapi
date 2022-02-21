import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TableChartIcon from '@material-ui/icons/TableChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import history from './../../history';

export const mainListItems = (
  <div>
    <ListItem button onClick={() => history.push('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={() => history.push('/account_id')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Account_Id" />
</ListItem><ListItem button onClick={() => history.push('/account_status')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Account_Status" />
</ListItem><ListItem button onClick={() => history.push('/account_type')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Account_Type" />
</ListItem><ListItem button onClick={() => history.push('/account_type_2')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Account_Type_2" />
</ListItem><ListItem button onClick={() => history.push('/add_on_services')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Add_On_Services" />
</ListItem><ListItem button onClick={() => history.push('/booking')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Booking" />
</ListItem><ListItem button onClick={() => history.push('/company')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Company" />
</ListItem><ListItem button onClick={() => history.push('/company_document')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Company_Document" />
</ListItem><ListItem button onClick={() => history.push('/content_mgmt')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Content_Mgmt" />
</ListItem><ListItem button onClick={() => history.push('/document_upload')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Document_Upload" />
</ListItem><ListItem button onClick={() => history.push('/email_mgmt')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Email_Mgmt" />
</ListItem><ListItem button onClick={() => history.push('/health_result')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Health_Result" />
</ListItem><ListItem button onClick={() => history.push('/medication')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Medication" />
</ListItem><ListItem button onClick={() => history.push('/medication_prescription')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Medication_Prescription" />
</ListItem><ListItem button onClick={() => history.push('/menu_item')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Menu_Item" />
</ListItem><ListItem button onClick={() => history.push('/menu_main')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Menu_Main" />
</ListItem><ListItem button onClick={() => history.push('/menu_main_item')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Menu_Main_Item" />
</ListItem><ListItem button onClick={() => history.push('/message_box')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Message_Box" />
</ListItem><ListItem button onClick={() => history.push('/message_document')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Message_Document" />
</ListItem><ListItem button onClick={() => history.push('/message_inbox')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Message_Inbox" />
</ListItem><ListItem button onClick={() => history.push('/notification')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Notification" />
</ListItem><ListItem button onClick={() => history.push('/notification_log')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Notification_Log" />
</ListItem><ListItem button onClick={() => history.push('/package_add_ons')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Package_Add_Ons" />
</ListItem><ListItem button onClick={() => history.push('/package_category')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Package_Category" />
</ListItem><ListItem button onClick={() => history.push('/package_patient')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Package_Patient" />
</ListItem><ListItem button onClick={() => history.push('/package_test_groups')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Package_Test_Groups" />
</ListItem><ListItem button onClick={() => history.push('/package_test_panels')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Package_Test_Panels" />
</ListItem><ListItem button onClick={() => history.push('/patient_bak')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Patient_Bak" />
</ListItem><ListItem button onClick={() => history.push('/patient_type')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Patient_Type" />
</ListItem><ListItem button onClick={() => history.push('/payment')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Payment" />
</ListItem><ListItem button onClick={() => history.push('/person')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Person" />
</ListItem><ListItem button onClick={() => history.push('/person_document')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Person_Document" />
</ListItem><ListItem button onClick={() => history.push('/person_type')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Person_Type" />
</ListItem><ListItem button onClick={() => history.push('/pre_registration')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Pre_Registration" />
</ListItem><ListItem button onClick={() => history.push('/ref_message')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Ref_Message" />
</ListItem><ListItem button onClick={() => history.push('/ref_payment_method')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Ref_Payment_Method" />
</ListItem><ListItem button onClick={() => history.push('/ref_relationship')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Ref_Relationship" />
</ListItem><ListItem button onClick={() => history.push('/ref_state')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Ref_State" />
</ListItem><ListItem button onClick={() => history.push('/registration')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Registration" />
</ListItem><ListItem button onClick={() => history.push('/registration_person')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Registration_Person" />
</ListItem><ListItem button onClick={() => history.push('/screening_packages')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Screening_Packages" />
</ListItem><ListItem button onClick={() => history.push('/six_digit_code')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Six_Digit_Code" />
</ListItem><ListItem button onClick={() => history.push('/sms_log')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Sms_Log" />
</ListItem><ListItem button onClick={() => history.push('/sms_notification')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Sms_Notification" />
</ListItem><ListItem button onClick={() => history.push('/test_group')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Group" />
</ListItem><ListItem button onClick={() => history.push('/test_group_panel')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Group_Panel" />
</ListItem><ListItem button onClick={() => history.push('/test_location')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Location" />
</ListItem><ListItem button onClick={() => history.push('/test_marker')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Marker" />
</ListItem><ListItem button onClick={() => history.push('/test_panel')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Panel" />
</ListItem><ListItem button onClick={() => history.push('/test_reference_range')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Reference_Range" />
</ListItem><ListItem button onClick={() => history.push('/test_result')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Result" />
</ListItem><ListItem button onClick={() => history.push('/transaction_log')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Transaction_Log" />
</ListItem><ListItem button onClick={() => history.push('/user_account')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="User_Account" />
</ListItem><ListItem button onClick={() => history.push('/account_id')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Account_Id" />
</ListItem><ListItem button onClick={() => history.push('/account_status')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Account_Status" />
</ListItem><ListItem button onClick={() => history.push('/account_type')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Account_Type" />
</ListItem><ListItem button onClick={() => history.push('/account_type_2')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Account_Type_2" />
</ListItem><ListItem button onClick={() => history.push('/add_on_services')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Add_On_Services" />
</ListItem><ListItem button onClick={() => history.push('/booking')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Booking" />
</ListItem><ListItem button onClick={() => history.push('/company')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Company" />
</ListItem><ListItem button onClick={() => history.push('/company_document')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Company_Document" />
</ListItem><ListItem button onClick={() => history.push('/content_mgmt')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Content_Mgmt" />
</ListItem><ListItem button onClick={() => history.push('/document_upload')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Document_Upload" />
</ListItem><ListItem button onClick={() => history.push('/email_mgmt')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Email_Mgmt" />
</ListItem><ListItem button onClick={() => history.push('/health_result')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Health_Result" />
</ListItem><ListItem button onClick={() => history.push('/medication')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Medication" />
</ListItem><ListItem button onClick={() => history.push('/medication_prescription')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Medication_Prescription" />
</ListItem><ListItem button onClick={() => history.push('/menu_item')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Menu_Item" />
</ListItem><ListItem button onClick={() => history.push('/menu_main')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Menu_Main" />
</ListItem><ListItem button onClick={() => history.push('/menu_main_item')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Menu_Main_Item" />
</ListItem><ListItem button onClick={() => history.push('/message_box')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Message_Box" />
</ListItem><ListItem button onClick={() => history.push('/message_document')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Message_Document" />
</ListItem><ListItem button onClick={() => history.push('/message_inbox')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Message_Inbox" />
</ListItem><ListItem button onClick={() => history.push('/notification')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Notification" />
</ListItem><ListItem button onClick={() => history.push('/notification_log')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Notification_Log" />
</ListItem><ListItem button onClick={() => history.push('/package_add_ons')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Package_Add_Ons" />
</ListItem><ListItem button onClick={() => history.push('/package_category')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Package_Category" />
</ListItem><ListItem button onClick={() => history.push('/package_patient')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Package_Patient" />
</ListItem><ListItem button onClick={() => history.push('/package_test_groups')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Package_Test_Groups" />
</ListItem><ListItem button onClick={() => history.push('/package_test_panels')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Package_Test_Panels" />
</ListItem><ListItem button onClick={() => history.push('/patient_bak')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Patient_Bak" />
</ListItem><ListItem button onClick={() => history.push('/patient_type')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Patient_Type" />
</ListItem><ListItem button onClick={() => history.push('/payment')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Payment" />
</ListItem><ListItem button onClick={() => history.push('/person')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Person" />
</ListItem><ListItem button onClick={() => history.push('/person_document')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Person_Document" />
</ListItem><ListItem button onClick={() => history.push('/person_type')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Person_Type" />
</ListItem><ListItem button onClick={() => history.push('/pre_registration')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Pre_Registration" />
</ListItem><ListItem button onClick={() => history.push('/ref_message')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Ref_Message" />
</ListItem><ListItem button onClick={() => history.push('/ref_payment_method')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Ref_Payment_Method" />
</ListItem><ListItem button onClick={() => history.push('/ref_relationship')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Ref_Relationship" />
</ListItem><ListItem button onClick={() => history.push('/ref_state')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Ref_State" />
</ListItem><ListItem button onClick={() => history.push('/registration')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Registration" />
</ListItem><ListItem button onClick={() => history.push('/registration_person')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Registration_Person" />
</ListItem><ListItem button onClick={() => history.push('/screening_packages')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Screening_Packages" />
</ListItem><ListItem button onClick={() => history.push('/six_digit_code')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Six_Digit_Code" />
</ListItem><ListItem button onClick={() => history.push('/sms_log')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Sms_Log" />
</ListItem><ListItem button onClick={() => history.push('/sms_notification')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Sms_Notification" />
</ListItem><ListItem button onClick={() => history.push('/test_group')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Group" />
</ListItem><ListItem button onClick={() => history.push('/test_group_panel')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Group_Panel" />
</ListItem><ListItem button onClick={() => history.push('/test_location')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Location" />
</ListItem><ListItem button onClick={() => history.push('/test_marker')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Marker" />
</ListItem><ListItem button onClick={() => history.push('/test_panel')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Panel" />
</ListItem><ListItem button onClick={() => history.push('/test_reference_range')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Reference_Range" />
</ListItem><ListItem button onClick={() => history.push('/test_result')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Test_Result" />
</ListItem><ListItem button onClick={() => history.push('/transaction_log')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="Transaction_Log" />
</ListItem><ListItem button onClick={() => history.push('/user_account')}>
<ListItemIcon><TableChartIcon /></ListItemIcon>
<ListItemText primary="User_Account" />
</ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button onClick={() => history.push('/signup')}>
      <ListItemIcon>
        <LockOpenIcon />
      </ListItemIcon>
      <ListItemText primary="SignUp" />
    </ListItem>
    <ListItem button onClick={() => history.push('/')}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
   
  </div>
);
