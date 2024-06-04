import CodeMirror from '@uiw/react-codemirror'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import { javascript } from '@codemirror/lang-javascript'
import { EditorView, placeholder } from '@codemirror/view'

interface CodeEditorProps {
    code: string
    setCode: React.Dispatch<React.SetStateAction<string>>
}

export function CodeEditor({ code, setCode }: CodeEditorProps) {
    return (
        <CodeMirror
            value={code}
            theme={okaidia}
            basicSetup={{
                lineNumbers: false,
                foldGutter: false
            }}
            extensions={[javascript({ jsx: true }), EditorView.lineWrapping, placeholder('Enter your code here...')]}
            onChange={(value: any) => {
                setCode(value)
            }}
            className='text-sm w-full'
        />
    )
}
