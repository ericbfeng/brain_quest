import React, { useState } from "react";
import CodeEditorWindow from "./CodeEditor";
import Select from "react-select";
import { languageOptions } from "../assets/languageOptions";
import { defaultCode } from "../assets/defaultCode";
import {json, Link } from "react-router-dom";
import { BsArrowLeftShort } from 'react-icons/bs';
import '../styles/CodeEditorPage.css';
import {Buffer} from 'buffer';

import { MathJax, MathJaxContext } from "better-react-mathjax";


var placeholder_problem = `
Your science teacher has recently given you a test to measure the strength of some pristine industry standard eggs. 
In particular, she would like you measure the highest floor of a \$n\$-story building you can drop an egg without it cracking.
Unfortunately you only have \$k\$ of these eggs left in your refrigerator, so you can't just throw eggs willy-nilly. 
You would also like to minimize the total number of drops since you don't want to keep going up and down the elevator to
pick up your dropped egg. 

Please calculate the minimum number of drops that is required to guarantee you can
obtain the highest floor you can drop an egg without it cracking. 

Constraints: \$ 1 \\leq n \\leq 100,000, 1 \\leq k \\leq  5\$

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
    const [token, setToken] = useState();
    const [codeOutput, setCodeOutput] = useState("default output");

    const handleSubmit = () => {

      console.log(code);
      const inputData = {
        language_id: language.id,
        source_code: Buffer.from(code).toString('base64'),
      };

      console.log(inputData);
      // create a .env file 
      // register account at https://rapidapi.com/judge0-official/api/judge0-ce/pricing
      // add env variables into .env file
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com' //process.env.REACT_APP_RAPID_API_HOST
        },
        body: JSON.stringify(inputData)
      };
      
      fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*', options)
        .then(res => res.json())
        .then(data => setToken(data.token))
        .then(checkStatus(token))
        .catch(err => console.error('error:' + err));

    };

    const checkStatus = async (token) => {
      const results_url = 'https://judge0-ce.p.rapidapi.com/submissions/' + token + '?base64_encoded=true&fields=*';

      const token_options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      };

      fetch(results_url, token_options)
        .then(res => res.json())
        .then(data => setCodeOutput(atob(data.stdout)))
        .catch(err => console.error('error:' + err));
    };
  

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
                <div className="subheader-column-left">
                  <Link to="/" >
                    <BsArrowLeftShort className="arrow-icon" />
                  </Link>
                  <div className="language-dropdown">
                    <LanguagesDropdown onSelectChange={onSelectChange} />
                  </div>
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
                  <MathJax hideUntilTypeset={"first"}>
                    <p>{`${placeholder_problem}`}</p>
                  </MathJax>
                 </div>
                 <div className="buttons">
                  <button onClick={handleSubmit} className="button submit-button">Submit</button>
                  <button className="button test-button">Test Sample</button>
                 </div>
                 <div>
                   <b>OUTPUT: </b>
                   <br></br>
                   <pre>{`${codeOutput}`}</pre>

                 </div>
              </div>
          </div>
      )
}

export default CodeEditorPage;