import { DrawingProvider } from '@/context/DrawingContext'
import { CanvasToolbar } from '@/components/CanvasToolbar'
import { DrawingSketch } from '@/components/DrawingSketch'

function ExperimentPage() {
    return (
        <>
            <header className="pt-6 text-center">
                <h1 className="mb-1.5 text-2xl font-semibold">Experiment</h1>
                <p className="text-sm">Draw lines with your mouse.</p>
            </header>

            <DrawingProvider>
                <div className="overflow-hidden px-4 pb-8 pt-4">
                    <CanvasToolbar />
                    <DrawingSketch />
                </div>
            </DrawingProvider>
        </>
    )
}

export default ExperimentPage
