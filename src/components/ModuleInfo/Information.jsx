import React from 'react';
import ShowMoreText from 'react-show-more-text';

const Information = ({ content }) => {
  return (
    <div className="my-2">
      <p className="text-lg font-bold text-forum-title">Module Information</p>
      <ShowMoreText
        /* Default options */
        lines={5}
        more={<p className="text-sm font-semibold text-gray-700 underline">Show more</p>}
        less={<p className="text-sm font-semibold text-gray-700 underline">Show less</p>}
        keepNewLines={false}
        className="mt-2 text-sm "
        truncatedEndingComponent={'... '}
      >
        {content}
      </ShowMoreText>
    </div>
  );
};

export default Information;
