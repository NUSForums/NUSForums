import { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from './Button';
/*
['Essentials', 'CKFinderUploadAdapter', 'Autoformat', 'Bold', 'Italic', 
'BlockQuote', 'CKFinder', 'CloudServices', 'EasyImage', 'Heading', 'Image', 'ImageCaption', 
'ImageStyle', 'ImageToolbar', 'ImageUpload', 'Indent', 'Link', 'List', 'MediaEmbed', 'Paragraph',
 'PasteFromOffice', 'Table', 'TableToolbar', 'TextTransformation']
*/

const editorConfiguration = {
  toolbar: ['bold', 'italic', 'paragraph'],
};

const RichTextEditor = ({ setShowEditor }) => {
  const ref = useRef();

  return (
    <div>
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
          ref.current = data;
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
      <div className="flex w-full items-center justify-center">
        <Button text="Cancel" onClick={() => setShowEditor(false)} />
        <Button text="Submit" onClick={() => setShowEditor(false)} isSubmitButton={true} />
      </div>
    </div>
  );
};

export default RichTextEditor;
