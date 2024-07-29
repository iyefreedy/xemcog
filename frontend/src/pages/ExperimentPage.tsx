import { DrawingProvider } from '@/context/DrawingContext'
import { CanvasToolbar } from '@/components/CanvasToolbar'
import { DrawingSketch } from '@/components/DrawingSketch'

function ExperimentPage() {
    return (
        <>
            <header className="pt-6 text-center">
                <h1 className="mb-2.5 text-4xl font-bold">Experiment</h1>
                <p>Draw lines with your mouse.</p>
            </header>

            <DrawingProvider>
                <div className="overflow-hidden px-4 pb-8">
                    <CanvasToolbar />
                    <DrawingSketch />
                </div>
            </DrawingProvider>
        </>
    )
}

export default ExperimentPage
