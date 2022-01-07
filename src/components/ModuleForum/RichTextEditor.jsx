import { useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from './Button';
import { useAppSelector } from '../../hooks/reduxHooks';
import { tagConvert } from '../Tag';
import { useParams } from 'react-router-dom';
import { createPost } from '../../lib/createPost';
/*
['Essentials', 'CKFinderUploadAdapter', 'Autoformat', 'Bold', 'Italic', 
'BlockQuote', 'CKFinder', 'CloudServices', 'EasyImage', 'Heading', 'Image', 'ImageCaption', 
'ImageStyle', 'ImageToolbar', 'ImageUpload', 'Indent', 'Link', 'List', 'MediaEmbed', 'Paragraph',
 'PasteFromOffice', 'Table', 'TableToolbar', 'TextTransformation']
*/

const editorConfiguration = {
  toolbar: [
    'Essentials',
    // 'CKFinderUploadAdapter',
    'Autoformat',
    'Bold',
    'Italic',
    'BlockQuote',
    // 'CKFinder',
    // 'CloudServices',
    'EasyImage',
    'Heading',
    // 'Image',
    // 'ImageCaption',
    // 'ImageStyle',
    // 'ImageToolbar',
    // 'ImageUpload',
    'Indent',
    'Link',
    'List',
    'MediaEmbed',
    'Paragraph',
    'PasteFromOffice',
    'Table',
    'TableToolbar',
    'TextTransformation',
  ],
};

const RichTextEditor = ({ setShowEditor }) => {
  const [tags, setTags] = useState([]);
  const titleRef = useRef();
  const bodyRef = useRef();
  const { tagList, user } = useAppSelector((state) => ({
    tagList: state.metadata.tags,
    user: state.user,
  }));
  const { module } = useParams();

  function removeHTML(str) {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || '';
  }

  const onSubmit = () => {
    console.log(titleRef.current);
    console.log(bodyRef.current);
    return createPost({
      title: removeHTML(titleRef.current),
      body: bodyRef.current,
      tags: tags,
      moduleCode: module || '',
      user,
    });
  };

  const onToggleTag = (tagName) => {
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
      <div className="font-semibold">Post Title</div>
      <CKEditor
        editor={ClassicEditor}
        config={{ toolbar: [] }}
        data="Your title here"
        onChange={(event, editor) => {
          const data = editor.getData();
          titleRef.current = data;
        }}
      />
      <div className="pt-5 font-semibold">Post Subject</div>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data="<p>Write your post here</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          bodyRef.current = data;
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
      <div className="pt-5 font-semibold">Select relevant tags</div>

      <div className="flex flex-row gap-2">
        {tagList.map((tagname) => (
          <div
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
