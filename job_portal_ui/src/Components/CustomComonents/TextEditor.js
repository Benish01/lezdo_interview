import React, { useMemo, useState } from "react";
import JoditEditor from "jodit-react";
import {
    Box,
    ClickAwayListener,
    MenuItem,
    Tooltip,
    useTheme,
} from "@mui/material";
import { createRoot } from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import { setParsedContent } from "../../Redux/Slices/CreateJObSlice";

function TextEditor({
    initialContent,
    toolbar = true,
    readonly = false,
    save = () => { },
    onChange = () => { },
    placeholders = [
        "%clientName%",
        "%companyName%",
        "%firstName%",
        "%lastName%",
        "%caseName%",
        "%clientId%",
        "%service%",
        "%url%",
        "%otp%",
    ],
    field_type
}) {
    const [data, setData] = useState(initialContent);
    const dispatch = useDispatch();
    const theme = useTheme();
    const description_info = useSelector(state => state.CreateJObSlice.description_info) || {};


    const copyStringToClipboard = (str) => {
        const el = document.createElement("textarea");
        el.value = str;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    };

    // const parseContent = (htmlContent) => {
    //     console.log(htmlContent, 'kkk')
    //     const tempDiv = document.createElement("div");
    //     tempDiv.innerHTML = htmlContent;
      
    //     const paragraphs = tempDiv.querySelectorAll("p");
    //     const parsedData = {};
    //     let currentKey = null;
      
    //     paragraphs.forEach((p) => {
    //       const strongTag = p.querySelector("strong");
      
    //       if (strongTag) {
    //         currentKey = strongTag.innerText.replace(/[:\s]+$/, "").toLowerCase();
    //         parsedData[currentKey] = [];
    //       } else if (currentKey) {
    //         parsedData[currentKey].push(p.innerText);
    //       } else {
    //         currentKey = 'default';
    //         if (!parsedData[currentKey]) {
    //           parsedData[currentKey] = [];
    //         }
    //         parsedData[currentKey].push(p.innerText);
    //       }
    //     });
      
    //     // Convert single paragraph content to a string
    //     Object.keys(parsedData).forEach((key) => {
    //       if (parsedData[key].length === 1) {
    //         parsedData[key] = parsedData[key][0];
    //       }
    //     });
    //   console.log(parsedData, 'llll')
      
    //     // Dispatch content directly without nesting
    //     dispatch(setParsedContent({ field_type, content: parsedData }));
    //   };
      
    const parseContent = (htmlContent) => {

        dispatch(setParsedContent({ field_type, content: htmlContent }))
        // const parser = new DOMParser();
        // const doc = parser.parseFromString(htmlContent, 'text/html');
        // const parsedData = {};
    
        // // Get all headers (e.g., h2, h3, etc.)
        // const headers = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        // headers.forEach(header => {
        //     const key = header.textContent.trim();
    
        //     // Get the next element sibling which could be a list, paragraph, etc.
        //     let value = '';
        //     let nextElem = header.nextElementSibling;
    
        //     while (nextElem && !nextElem.matches('h2, h3, h4, h5, h6')) {
        //         value += nextElem.outerHTML;
        //         nextElem = nextElem.nextElementSibling;
        //     }
    
        //     parsedData[key] = value.trim();
        // });
    
        // console.log('Parsed Data:', parsedData);
        // return parsedData;
    };
      
    

    const isLikelyHeading = (element) => {
        if (!element || element.tagName !== "P") return false;

        const textContent = element.innerText.trim();

        return (textContent.length < 50 && textContent.endsWith(":")) || 
               (element.nextElementSibling && (element.nextElementSibling.tagName === "UL" || element.nextElementSibling.tagName === "OL"));
    };

    const PlaceholderPopup = (editor, current, self, close) => {
        const [showPlaceholder, setShowPlaceholder] = useState(false);
        const savedSelection = editor.selection.save(); // Define savedSelection here

        const onSelected = (value) => {
            const mergeField = value;
            if (mergeField) {
                editor.focus();
                editor.selection.restore(savedSelection); // Restore savedSelection
                editor.selection.insertHTML(mergeField);
                close?.();
            }
        };

        const divElement = document.createElement("div");
        document.body.appendChild(divElement);
        const root = createRoot(divElement);
        root.render(
            <ClickAwayListener onClickAway={() => setShowPlaceholder(false)}>
                <Tooltip
                    open={showPlaceholder}
                    onClose={() => setShowPlaceholder(false)}
                >
                    {placeholders.map((placeholder) => (
                        <MenuItem
                            key={placeholder}
                            value={placeholder}
                            onClick={() => onSelected(placeholder)}
                        >
                            {placeholder}
                        </MenuItem>
                    ))}
                </Tooltip>
            </ClickAwayListener>
        );

        return divElement;
    };

    const editorConfig = useMemo(() => {
        return {
            theme: theme.mode,
            readonly: readonly,
            toolbar: toolbar,
            spellcheck: true,
            language: "en",
            toolbarButtonSize: "medium",
            toolbarAdaptive: false,
            showCharsCounter: true,
            showWordsCounter: true,
            showXPathInStatusbar: false,
            askBeforePasteHTML: true,
            askBeforePasteFromWord: true,
            addNewLine: false,
            statusbar: false,
            height: 350,
            spellcheck:true,

            
            buttons: [
                
                // "undo", "redo", "|",
                //  "bold", "strikethrough", "underline", "italic", "|",
                // "superscript", "subscript", "|", "align", "|", "ul", "ol", "outdent", "indent", "|",
                // "font", "fontsize", "brush", "paragraph", "|", "image", "link", "table", "|",
                // "hr", "eraser", "copyformat", "|", "selectall", "print", "|", "source", "|",
                // // {
                //     name: "{ }",
                //     tooltip: "Insert Placeholder",
                //     popup: PlaceholderPopup,
                // },
                {
                    name: "Copy",
                    tooltip: "Copy HTML to Clipboard",
                    exec: function (editor) {
                        let html = editor.value;
                        copyStringToClipboard(html);
                    },
                },
                "paste",
                "cut",
                "paragraph",
                "superscript", 
                "subscript",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "color",
                "brush",
                "left",
                "center",
                "right",
                "indent",
                "outdent",
                "ol",
                "ul",
                "font",
                "fontsize",
                "search",
                "table",
                "image",
                "redo",
                "undo",
                
               
               
                {
                    name: "Save",
                    tooltip: "Save Data",
                    exec: function () {
                        save(data);
                    },
                },
               
            ],
            uploader: {
                insertImageAsBase64URI: true,
            },
        };
    }, [theme, readonly, toolbar]);

    return (
        <Box sx={{ width: '100%' }}>
            <JoditEditor
                key={initialContent}
                value={data}
                config={editorConfig}
                // onBlur={(value) => onChange(value)}
                onChange={(value) => {
                    // setData(value);
                    parseContent(value);
                    // onChange(value);
                }}
            />
        </Box>
    );
}

export default TextEditor;
