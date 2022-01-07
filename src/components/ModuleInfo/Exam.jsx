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
  if (date === undefined) {
    return (
      <>
        <p className="flex pb-1 text-base font-semibold text-forum-title font-poppins">Exam</p>
        <p className="text-sm">None</p>
      </>
    );
  }

  const dateFromExam = getDateDiff(date);
  const dateDisplay = getDateDisplay(date);

  return (
    <>
      <div className="flex pb-1 text-base font-semibold text-forum-title font-poppins">
        <p className="mr-1">Exam</p>
        {dateFromExam > 0 && <p>{`(in ${dateFromExam} days)`}</p>}
      </div>
      <p className="text-sm">{dateDisplay}</p>
    </>
  );
};

export default Exam;
