import { AppIcon } from '@/components/icons'

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <div className='flex flex-col gap-y-2 items-center'>
                <AppIcon className='w-24 h-24' />
                <div className='font-bold text-xl'>A better online code formatter</div>
                <div>Launching shortly...</div>
            </div>
        </main>
    )
}
