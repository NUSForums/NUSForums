import { useRef, useState } from 'react';
import Button from './Button';
import { useAppSelector } from '../../hooks/reduxHooks';
import { tagConvert } from '../Tag';
import { useParams } from 'react-router-dom';
import { createPost } from '../../lib/createPost';
import { toast } from 'react-toastify';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

const RichTextEditor = ({ setShowEditor }: { setShowEditor: (val: boolean) => any }) => {
  const [tags, setTags] = useState<string[]>([]);
  const titleRef = useRef<string>();
  const [body, setBody] = useState<string | undefined>();
  const { tagList, user } = useAppSelector((state) => ({
    tagList: state.metadata.tags,
    user: state.user,
  }));
  const { module } = useParams();

  function removeHTML(str: string) {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || '';
  }

  const onSubmit = () => {
    if (!titleRef.current) {
      toast.error('Post title is required');
      return;
    }

    if (!body) {
      toast.error('Post body is required');
      return;
    }

    return createPost({
      title: removeHTML(titleRef.current),
      body: body,
      tags: tags,
      moduleCode: module || '',
      user,
    })
      .catch((err) => {
        console.log(err);
        toast.error('Please login to post');
      })
      .finally(() => {
        setShowEditor(false);
      });
  };

  const onToggleTag = (tagName: string) => {
    setTags((prev) => {
      if (prev.includes(tagName)) {
        return prev.filter((x) => x !== tagName);
      } else {
        return [...prev, tagName];
      }
    });
  };

  return (
    <div>
      <div className="pb-1 font-semibold">Post Title</div>
      <textarea
        rows={1}
        className="w-full p-1 border"
        placeholder="Your title here"
        onChange={(e) => {
          titleRef.current = e.target.value;
        }}
      />
      <div className="pt-5 pb-1 font-semibold">Post Subject</div>
      <div className="border">
        <div className="container">
          <MDEditor
            value={body}
            onChange={(val) => setBody(val)}
            placeholder="Your post here"
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </div>
      </div>
      <div className="pt-5 pb-1 font-semibold">Select relevant tags</div>
      <div className="flex flex-row gap-2">
        {tagList.map((tagname) => (
          <div
            key={tagname}
            className={`py-1 bg-forum-${tagConvert(tagname)} ${
              tags.includes(tagname) ? ' border-gray-500' : 'opacity-50'
            } cursor-pointer w-20 grid place-items-center rounded-2xl text-white font-nunito text-xs tracking-wider border border-transparent`}
            onClick={() => onToggleTag(tagname)}
          >
            {tagname}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center w-full">
        <Button text="Cancel" onClick={() => setShowEditor(false)} />
        <Button text="Submit" onClick={() => onSubmit()} isSubmitButton={true} />
      </div>
    </div>
  );
};

export default RichTextEditor;
