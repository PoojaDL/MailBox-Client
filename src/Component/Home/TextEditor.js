import React, { useState, useRef, Fragment } from "react";
import JoditEditor from "jodit-react";
import htmlToFormattedText from "html-to-formatted-text";

const TextEditor = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <Fragment>
      <JoditEditor
        ref={editor}
        value={content}
        // config={config}
        tabIndex={1} // tabIndex of textarea // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => setContent(newContent)}
      />
      <div>{htmlToFormattedText(content)}</div>
    </Fragment>
  );
};

export default TextEditor;
