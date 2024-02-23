import React from "react";
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import BASE_URL from '../data/config';

const StudentList = (param) => {
  const [studentInfo, setStudentInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${BASE_URL}students/`);
      const body = await result.json();
      setStudentInfo(body);
    };
    fetchData();
  }, []);

  var filteredStudents = studentInfo;

  if (param !== undefined) {
    filteredStudents = Object.values(studentInfo).filter(
      (p) => p.studentId !== +param.exceptId
    );
  }

  return (
    <>
      {filteredStudents.map((student, key) => (
        <Link key={key} to={`/detail/${student.studentId}`}>
          <h6>
            {student.studentId} {student.firstName} {student.lastName}
          </h6>
        </Link>
      ))}
    </>
  );
};
export default StudentList;
