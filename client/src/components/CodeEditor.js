import React from "react";

import Editor from "@monaco-editor/react";


const CodeEditorWindow = ({onChange, language, code}) => {

    const handleEditorChange = (value) => {
      onChange("code", value);
    };
  
    return (
        <Editor
          defaultLanguage="cpp"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
        />
    );
};

export default CodeEditorWindow;
