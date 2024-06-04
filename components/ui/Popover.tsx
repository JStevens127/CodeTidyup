import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from '@headlessui/react'
import DefaultTransition from '../shared/DefaultTransition'

type PopoverOptionProps = {
    sectionTitle?: string
    text: string
    onClick: (() => void) | (() => Promise<void>)
    divider?: boolean
    className?: string
}

function PopoverOption({ text, onClick, className }: PopoverOptionProps) {
    return (
        <PopoverButton
            type='button'
            className={`text-left text-textSecondary text-sm font-medium outline-none hover:bg-black/5 px-3 py-2 rounded-md ${
                className ? className : ''
            }`}
            onClick={onClick}>
            {text}
        </PopoverButton>
    )
}

type PopoverProps = {
    options: PopoverOptionProps[]
    buttonElement: JSX.Element
    section?: React.ReactNode
    anchor?:
        | 'left'
        | 'right'
        | 'top'
        | 'bottom'
        | 'top start'
        | 'top end'
        | 'bottom start'
        | 'bottom end'
        | 'left start'
        | 'left end'
        | 'right start'
        | 'right end'
}

export const Popover = ({ anchor, options, buttonElement }: PopoverProps) => {
    return (
        <HeadlessPopover className='relative'>
            <PopoverButton className='focus:outline-none flex'>{buttonElement}</PopoverButton>
            <DefaultTransition>
                <PopoverPanel
                    anchor={anchor}
                    className='bg-white w-52 absolute z-10 p-1 border shadow-md rounded-md mt-2'>
                    <div className='flex flex-col text-left'>
                        {options.map((option, index) => (
                            <PopoverOption key={index} {...option} />
                        ))}
                    </div>
                </PopoverPanel>
            </DefaultTransition>
        </HeadlessPopover>
    )
}
