import React from 'react';

function parseDate(str) {
  var mdy = str.split('/');
  return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

const Exam = ({ date }) => {
  const examDate = parseDate(date);
  const currDate = parseDate(Date.now());
  const dateDiff = currDate - examDate;

  return (
    <div>
      <h3>Exam</h3>
      <p>{dateDiff}</p>
      <p>{date}</p>
    </div>
  );
};

export default Exam;
