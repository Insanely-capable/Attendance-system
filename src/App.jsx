
import { useState } from "react";
import students from "./students.jsx";

function App() {
  const faculty = ["Rohit Jain", "Somesh Sharma"];
  const [studentsList, setStudentsList] = useState([]);
  const [attendance, setAttendance] = useState({});

  function handleFacultyChange(e) {
    const faculty = e.target.value;
    const studentNames = students.find((obj) => obj.faculty === faculty)?.names || [];
    setStudentsList(studentNames.sort());

    const initialAttendance = studentNames.reduce((acc, student) => {
      acc[student] = false;
      return acc;
    }, {});
    setAttendance(initialAttendance);
  }

  function handleMarkerClick(student) {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [student]: !prevAttendance[student],
    }));
  }

  return (
    <>
      <div className="facultyChooser">
        <select name="faculty" id="" required onChange={handleFacultyChange}>
          <option value="" defaultValue="">
            Select Faculty
          </option>
          {faculty.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="attendanceGrid">
        {studentsList.length > 0 && (
          <div>
            {studentsList.map((student, index) => (
              <div key={index}>
                <p>
                  <span>{student}</span>
                  <span
                    className={`marker ${attendance[student] ? 'present' : ''}`}
                    onClick={() => handleMarkerClick(student)}
                  >
                    {attendance[student] ? 'P' : 'A'}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;