'use client'

import { useState, useEffect } from 'react'
import prettier from 'prettier/standalone'
import flow from 'prettier/plugins/flow'
import esTree from 'prettier/plugins/estree'
import html from 'prettier/plugins/html'
import ts from 'prettier/plugins/typescript'
import domtoimage from 'dom-to-image'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Popover } from '@/components/ui/Popover'
import { AppIcon } from '@/components/icons'
import { ArrowSwitchIcon, KebabHorizontalIcon, TrashIcon } from '@primer/octicons-react'
import { CodeEditor } from '@/components/shared/CodeEditor'

const SAMPLE_CODE = `import React, { useState } from 'react'

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

export default function Home() {
    const [code, setCode] = useState(SAMPLE_CODE)
    const [compareCode, setCompareCode] = useState('')
    const [compareMode, setCompareMode] = useState(false)

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

            const formattedCompareCode = await prettier.format(compareCode, {
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
            setCompareCode(formattedCompareCode)
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
        <div className='mx-auto max-w-5xl px-4 sm:px-6 md:px-10 pt-14 lg:pt-28'>
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
                                        icon: <ArrowSwitchIcon className='size-4' />,
                                        text: `${compareMode ? 'Switch to standard mode' : 'Switch to compare mode'}`,
                                        onClick: () => {
                                            setCompareMode(!compareMode)
                                        }
                                    },
                                    {
                                        icon: <TrashIcon className='size-4' />,
                                        text: 'Clear code',
                                        onClick: () => {
                                            setCode('')
                                            setCompareCode('')
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
                        <div className='flex flex-col pb-2 bg-black rounded-lg min-h-20'>
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
                            <div className='flex gap-x-2 px-2'>
                                <CodeEditor code={code} setCode={setCode} />
                                {compareMode && <CodeEditor code={compareCode} setCode={setCompareCode} />}
                            </div>
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
