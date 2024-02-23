import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StudentList from "../components/StudentList";
import NotFoundPage from "./NotFoundPage";
import AddStudentForm from "../components/AddStudentForm";
import BASE_URL from "../data/config";

const StudentDetailPage = () => {
  const { id } = useParams();
  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    school: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${BASE_URL}students/${id}`);
      const body = await result.json();
      console.log(body);
      setStudentInfo(body);
    };
    fetchData();
  }, [id]);

  if (!studentInfo) return <NotFoundPage />;

  return (
    <React.Fragment>
      <p style={{ width: "20%", float: "right" }}>
        <h3>Others:</h3>
        <StudentList exceptId={studentInfo.studentId} />
      </p>

      <h4 className="text-danger">Student ID={studentInfo.studentId}</h4>
      <p>
        <b>Name: </b>
        {studentInfo.firstName} {studentInfo.lastName}
      </p>
      <p>
        <b>School: </b>
        {studentInfo.school}
      </p>
      
      <div style={{ width: "50%", float: "left" }}>
        <AddStudentForm />
      </div>
    </React.Fragment>
  );
};
export default StudentDetailPage;
