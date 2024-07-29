import { Stage, Layer, Line } from 'react-konva'
import { useContext } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import { DrawingContext } from '@/context/DrawingContext'

export const DrawingSketch = () => {
    const {
        stageRef,
        lines,
        tool,
        stroke,
        color,
        isDrawing,
        setIsDrawing,
        setLines,
    } = useContext(DrawingContext)

    const handleMouseDown = (
        event: KonvaEventObject<MouseEvent | TouchEvent>
    ) => {
        setIsDrawing(true)
        const pos = event.target.getStage()?.getPointerPosition()
        setLines([
            ...lines,
            { tool, color, stroke, points: [pos?.x ?? 0, pos?.y ?? 0] },
        ])
    }

    const handleMouseMove = (
        event: KonvaEventObject<MouseEvent | TouchEvent>
    ) => {
        event.evt.preventDefault()

        if (!isDrawing) {
            return
        }

        const stage = event.target.getStage()
        const point = stage?.getPointerPosition()
        let lastLine = lines[lines.length - 1]
        // add point
        lastLine.points = lastLine.points.concat([point?.x ?? 0, point?.y ?? 0])

        // replace last
        lines.splice(lines.length - 1, 1, lastLine)
        setLines(lines.concat())
    }

    const handleMouseUp = () => {
        setIsDrawing(false)
    }

    return (
        <Stage
            ref={stageRef}
            onPointerDown={handleMouseDown}
            onPointerMove={handleMouseMove}
            onPointerUp={handleMouseUp}
            width={window.innerWidth}
            height={500}
            className="touch-none overflow-hidden rounded-md border-4 border-gray-500"
        >
            <Layer>
                {lines.map((line, i) => (
                    <Line
                        key={i}
                        points={line.points}
                        stroke={line.color}
                        strokeWidth={line.stroke}
                        tension={0.5}
                        lineCap="round"
                        lineJoin="round"
                        globalCompositeOperation={
                            line.tool === 'eraser'
                                ? 'destination-out'
                                : 'source-over'
                        }
                    />
                ))}
            </Layer>
        </Stage>
    )
}
