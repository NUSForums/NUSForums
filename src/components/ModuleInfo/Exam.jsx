import React from 'react';

function getDateDiff(date) {
  const examDate = new Date(date);
  const currDate = new Date();
  const timeDiff = examDate.getTime() - currDate.getTime();
  return Math.round(timeDiff / (1000 * 60 * 60 * 24));
}

function getDateDisplay(date) {
  const dateObj = new Date(date);
  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return dateObj.toLocaleDateString('en-US', dateOptions);
}

const Exam = ({ date }) => {
  const dateFromExam = date === undefined ? '' : getDateDiff(date);
  const dateDisplay = getDateDisplay(date);

  return (
    <>
      <div className="flex text-base font-semibold text-forum-title">
        <p className="mr-1">Exam</p>
        {dateFromExam > 0 && <p>{`(in ${dateFromExam} days)`}</p>}
      </div>
      <p className="text-sm">{dateDisplay}</p>
    </>
  );
};

export default Exam;
