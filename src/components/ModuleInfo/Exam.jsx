import React from 'react';

function getDateDiff(date) {
  const examDate = new Date(date);
  const currDate = new Date();
  const timeDiff = examDate.getTime() - currDate.getTime();
  return Math.round(timeDiff / (1000 * 60 * 60 * 24));
}

const Exam = ({ date }) => {
  const dateFromExam = date === undefined ? '' : getDateDiff(date);
  return (
    <>
      <div className="flex">
        <b>Exam</b>
        {dateFromExam > 0 && <p>{`(in ${dateFromExam} days)`}</p>}
      </div>
      <p>{date}</p>
    </>
  );
};

export default Exam;
