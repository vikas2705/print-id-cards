export default function IdCardTemplate({student}) {

  console.log("student ", student);
  const getDummyImage = (name) => {
    return `/avatar/${name}_photo.jpg`;
  };

  const getDummySignature = (name) => {
    return `/signature/${name}_sign.jpg`;
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%'
    }}>
      <template data-params="
                min-width: 400px;
                min-height: 240px;
                rows:4;
                cols:1;
                column-gap:150px;
                gap-x:60px;
                gap:0px;
                left:0px;
                top:0px;
                row-gap:50px;
                use-pages:true;
                sequence:true;
                output:html;
                wrap:true;
                page-size:A4;
                page-orientation:P;
                body-content:true;
      "></template>

      <div style={{
        width: '400px',
        height: '240px',
        border: '1px solid black',
        top: '10px',
        left: '30px'
      }} data-position></div>
      
      <div style={{position: 'absolute', left: '50px', top: '20px'}} data-position>
        <img 
          src="https://slbsrsv.samarth.ac.in/uploads/uims/b8f484f38959e08ff58b9e1cc33e6e7b2a7c4267976468fe2582c247b3c5f7fb1_1642401054_72516497_logo.png"
          alt="University Logo" 
          style={{
            width: '50px',
            height: '50px'
          }}
        />
      </div>
      
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '110px',
        fontSize: '10px',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textAlign: 'left'
      }} data-position>
        <div>Shri Lal Bahadur Shastri National Sanskrit University</div>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '110px',
        fontSize: '10px',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textAlign: 'center'
      }} data-position>
        <div>Central University</div>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '45px',
        left: '110px',
        fontSize: '10px',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textAlign: 'center'
      }} data-position>
        <div>(Ministry of Education, Govt. of India)</div>
      </div>
      
      <div style={{position: 'absolute', top: '70px', left: '45px'}} data-position>
        <img 
          src={getDummyImage(student?.['Form Number'])} 
          alt={`${student?.Name || 'Student'} profile photo`} 
          style={{
            width: '75px',
            height: '85px'
          }}
        />
      </div>
      
      <div style={{position: 'absolute', top: '165px', left: '45px'}} data-position>
        <img 
          src={getDummySignature(student?.['Form Number'])} 
          alt={`${student?.Name || 'Student'} signature`} 
          style={{
            width: '75px',
            height: '40px'
          }}
        />
      </div>
      
      <div style={{
        position: 'absolute',
        top: '205px',
        left: '40px',
        fontSize: '9px',
        fontFamily: 'sans-serif'
      }} data-position>
        <div>Signature of the Card Holder</div>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '70px',
        left: '200px',
        fontSize: '11px',
        fontFamily: 'sans-serif'
      }} data-position>
        <b><u>STUDENT</u></b>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '90px',
        left: '140px',
        fontSize: '11px',
        fontFamily: 'sans-serif'
      }} data-position>
        <b>Name</b>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '90px',
        left: '220px',
        fontSize: '11px',
        fontFamily: 'sans-serif'
      }} data-position>
        <b>: {student?.Name || ''}</b>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '110px',
        left: '140px',
        fontSize: '11px',
        fontFamily: 'sans-serif'
      }} data-position>
        <b>Enrolment No</b>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '110px',
        left: '220px',
        fontSize: '11px',
        fontFamily: 'sans-serif'
      }} data-position>
        <b>: {student?.['Enrollment Number'] || ''}</b>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '130px',
        left: '140px',
        fontSize: '11px',
        fontFamily: 'sans-serif'
      }} data-position>
        <b>Programme &nbsp;&nbsp;&nbsp;:</b>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '130px',
        left: '226px',
        fontSize: '11px',
        fontFamily: 'sans-serif',
        width: '150px'
      }} data-position>
        <b>{student?.Programme || ''}</b>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '160px',
        left: '140px',
        fontSize: '11px',
        fontFamily: 'sans-serif'
      }} data-position>
        <b>Validity</b>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '160px',
        left: '220px',
        fontSize: '11px',
        fontFamily: 'sans-serif'
      }} data-position>
        <b>: 31/05/{student?.year_of_enrolment && student?.Programme ? 
          student.year_of_enrolment + student.programme.minimum_duration_year : ''}</b>
      </div>
      
      <div style={{position: 'absolute', top: '180px', left: '275px'}} data-position></div>
      
      <div style={{
        position: 'absolute',
        top: '203px',
        left: '250px',
        fontSize: '10px',
        fontFamily: 'sans-serif'
      }} data-position>
        <div>Auth. Signatory</div>
      </div>
      
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '240px',
        border: '1px solid black',
        top: '0px',
        left: '410px'
      }} data-position></div>

      <div style={{
        position: 'absolute',
        top: '13px',
        left: '485px'
      }} data-position>
        <img 
          src={`barcode.jpeg`} 
          alt="Barcode" 
          style={{
            width: '200px',
            height: '30px'
          }}
        />
      </div>
      
      <div style={{
        position: 'absolute',
        top: '42px',
        left: '550px',
        fontSize: '10px',
        fontFamily: 'sans-serif'
      }} data-position>
        {student?.enrolment_number || ''}
      </div>
      
      <div style={{
        position: 'absolute',
        top: '55px',
        left: '420px',
        fontSize: '10px',
        fontFamily: 'sans-serif',
        width: '180px'
      }} data-position>
        ADDRESS: {student?.permanent_address || ''}, {student?.permanent_state || ''}, {student?.permanent_state || ''}-{student?.permanent_pincode || ''}
      </div>
      
      <div style={{
        position: 'absolute',
        top: '55px',
        left: '610px',
        fontSize: '10px',
        fontFamily: 'sans-serif',
        width: '140px'
      }} data-position>
        <div>Date Of Birth: {student?.dob ? new Date(student.dob).toLocaleDateString('en-GB') : ''}</div>
        <div>Blood Group: {student?.blood_group || ''}</div>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '125px',
        left: '420px',
        fontSize: '10px',
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
      }} data-position>
        Emergency Contact No. {student?.emergency_contact_mobile || ''}
      </div>
      
      <div style={{
        position: 'absolute',
        top: '145px',
        left: '450px',
        fontSize: '9px',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textAlign: 'center'
      }} data-position>
        <div>If found, please return to</div>
        <div>Dean (Academic)</div>
        <div>Shri Lal Bahadur Shastri National Sanskrit University</div>
        <div><u>B-4, Qutub Institutional Area, New Delhi,Delhi, India-110016</u></div>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '192px',
        left: '485px',
        fontSize: '9px',
        fontFamily: 'sans-serif',
        textAlign: 'center'
      }} data-position>
        <div>Ph: 01146060606</div>
        <div>Email: info@slbsrsv.ac.in Website: https://www.slbsrsv.ac.in</div>
      </div>
    </div>
  );
}