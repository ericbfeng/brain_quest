import React, { useState } from "react";
import CodeEditorWindow from "./CodeEditor";
import Select from "react-select";
import { languageOptions } from "../assets/languageOptions";
import { defaultCode } from "../assets/defaultCode";
import '../styles/CodeEditorPage.css';


var placeholder_problem = `
Your science teacher has recently given you a test to measure the strength of k pristine industry standard eggs. 
In particular, she would like you measure the highest floor of a n-story building you can drop an egg without it cracking.
Unfortunately you only have two of these eggs left in your refrigerator, so you can't just throw eggs willy-nilly. 
You would also like to minimize the total number of drops since you don't want to keep going up and down the elevator to
pick up your dropped egg. 

Please calculate the minimum number of drops that is required to guarantee you can
obtain the highest floor you can drop an egg without it cracking. 

Constraints: 1 <= n <= 100,000, 1 <= k <= 5

Example Input: 100 2 
Example Output: 14
`;


const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};



function CodeEditorPage() {
    
    const [language, setLanguage] = useState(languageOptions[0]);
    const [code, setCode] = useState(defaultCode[language.value]);
    const [currentCode, setCurrentCode] = useState({});

    const onSelectChange = (sl) => {
       currentCode[language.value] = code;
       if (currentCode[sl.value] !== undefined) {
          setCode(currentCode[sl.value]);
       } else {
          currentCode[sl.value] = defaultCode[sl.value];
          setCode(defaultCode[sl.value]);
       }
        setLanguage(sl);
        console.log(currentCode);
    };

    const onChange = (action, data) => {
      switch (action) {
        case "code": {
          setCode(data);
          break;
        }
        default: {
          console.warn("case not handled!", action, data);
        }
      }
    };

    return (
          <div className="row">
              <div className="column left">
                <div className="language-dropdown">
                  <LanguagesDropdown onSelectChange={onSelectChange} />
                </div>
                <div className="code-editor-box">
                <CodeEditorWindow
                    code={code}
                    onChange={onChange}
                    language={language.value}
                  /> 
                </div>
              </div>
              <div className="column right">
                <div className="problem-statement">
                  {placeholder_problem}
                 </div>
                 <div className="buttons">
                  <button class="button submit-button">Submit</button>
                  <button class="button test-button">Test Sample</button>
                 </div>
              </div>
          </div>
      )
}

export default CodeEditorPage;