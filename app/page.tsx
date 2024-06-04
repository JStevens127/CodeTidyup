'use client'

import { useState, useRef, useEffect } from 'react'
import prettier from 'prettier/standalone'
import flow from 'prettier/plugins/flow'
import esTree from 'prettier/plugins/estree'
import html from 'prettier/plugins/html'
import ts from 'prettier/plugins/typescript'
import domtoimage from 'dom-to-image'
import CodeMirror from '@uiw/react-codemirror'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import { javascript } from '@codemirror/lang-javascript'
import { EditorView, placeholder } from '@codemirror/view'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import { AppIcon } from '@/components/icons'
import { KebabHorizontalIcon } from '@primer/octicons-react'

export default function Home() {
    const sample = `import React, { useState } from 'react'

  export function EasterEgg() {
      const [isClicked, setIsClicked] = useState(false)
  
      function handleButtonClick() {
      setIsClicked(!isClicked)
      }
  
      return (
      <div className="text-center p-12">
          <p className="text-2xl my-5 text-green-600">{isClicked ? 'Secret mode!' : 'Click to unlock the secret.'}</p>
          <button onClick={handleButtonClick} className="px-6 py-3 text-lg bg-steelblue text-white rounded">
          {isClicked ? 'Deactivate' : 'Activate'}
          </button>
      </div>
      )
  }`
    const [code, setCode] = useState(sample)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [code])

    useEffect(() => {
        handleFormat()
    }, [])

    const handleFormat = async () => {
        try {
            const formattedCode = await prettier.format(code, {
                parser: 'flow',
                plugins: [flow, esTree, html, ts],
                trailingComma: 'none',
                printWidth: 120,
                tabWidth: 2,
                singleQuote: true,
                bracketSameLine: true,
                semi: false
            })
            setCode(formattedCode)
        } catch (error) {
            alert(`Error formatting code:${error}`)
            console.error('Error formatting code:', error)
        }
    }

    const handleExport = async () => {
        const screenshotDiv = document.querySelector('.screenshot') as HTMLElement
        if (screenshotDiv) {
            domtoimage
                .toPng(screenshotDiv)
                .then((dataUrl: any) => {
                    const link = document.createElement('a')
                    link.href = dataUrl
                    link.download = 'code_screenshot.png'
                    link.click()
                })
                .catch((error: any) => {
                    console.error('Error capturing screenshot:', error)
                })
        }
    }

    return (
        <div className='mx-auto max-w-4xl px-4 sm:px-6 md:px-10 pt-14 lg:pt-28'>
            <div className='py-8 flex justify-center'>
                <div className='flex flex-col gap-y-4 max-w-3xl items-center'>
                    <Typography variant='h2' className='text-center'>
                        Beautiful images of your code
                    </Typography>
                    <p className='text-lg md:text-2xl max-w-xl text-center text-textSecondary'>
                        Format and share beautiful images of your code. Type or paste your code below to get started.
                    </p>
                </div>
            </div>
            <div className='flex flex-col gap-y-3'>
                <div className='flex flex-col gap-y-3 p-3 border rounded-xl bg-white'>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row items-center gap-x-2'>
                            <Button variant='outlined' className='items-center flex' onClick={handleFormat}>
                                Format Code
                            </Button>
                            <Popover
                                anchor='bottom start'
                                buttonElement={
                                    <div className='p-1 border border-black hover:bg-black/5 transition flex items-center justify-center h-8 w-8 rounded-full'>
                                        <KebabHorizontalIcon className='w-4 h-4 fill-black' />
                                    </div>
                                }
                                options={[
                                    {
                                        text: 'Clear code',
                                        onClick: () => {
                                            setCode('')
                                        }
                                    }
                                ]}
                            />
                        </div>
                        <div className='flex flex-row items-center gap-x-2'>
                            <Button className='items-center flex' onClick={handleExport}>
                                Export
                            </Button>
                        </div>
                    </div>
                    <div className='screenshot p-8 bg-blue-300 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-lg'>
                        <div className='flex flex-col px-0.5 pb-4 bg-black rounded-lg min-h-20'>
                            <div className='flex items-center justify-between p-3'>
                                <div className='flex gap-x-1.5'>
                                    <div className='size-3 bg-red-500 rounded-full' />
                                    <div className='size-3 bg-yellow-500 rounded-full' />
                                    <div className='size-3 bg-green-500 rounded-full' />
                                </div>
                                <input
                                    className='text-white/70 bg-transparent text-sm focus:outline-none text-center'
                                    type='text'
                                />
                                <div className='w-12' />
                            </div>
                            <CodeMirror
                                value={code}
                                theme={okaidia}
                                extensions={[
                                    javascript({ jsx: true }),
                                    EditorView.lineWrapping,
                                    placeholder('Enter your code here...')
                                ]}
                                onChange={(value: any) => {
                                    setCode(value)
                                }}
                                className='text-sm'
                            />
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-x-3 pb-20'>
                    <AppIcon className='w-auto h-4 fill-textSecondary' />
                    <Typography variant='body2' color='textSecondary'>
                        Created by{' '}
                        <a
                            href='https://x.com/jackstevensdev'
                            target='_blank'
                            className='text-blue-700 hover:text-blue-800'>
                            Jack Stevens
                        </a>
                    </Typography>
                </div>
            </div>
        </div>
    )
}
