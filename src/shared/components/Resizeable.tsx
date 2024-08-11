import React, {FC, PropsWithChildren} from 'react';
import {Rnd} from "react-rnd";
import {classNames} from "@/utils";
import {ElementDragData, ElementResizedData} from "@/types/design/elements";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {Tooltip} from "@mui/material";

// Create and import CSS for styling
interface Props extends PropsWithChildren {
    defaultValues: ElementResizedData;
    onElementResize?: (data: ElementResizedData)=>void;
    onElementDrag?: (data: ElementDragData)=>void;
    showBorders?: boolean;
    triggerEdit?: ()=>void;
    triggerCopy?: ()=>void;
    triggerDelete?: ()=>void;
}
// eslint-disable-next-line react/display-name
const Resizable: FC<Props> = React.memo(({
                                             children,
                                             defaultValues, onElementResize,
                                             onElementDrag,
                                             showBorders = false,
                                             triggerEdit ,
                                             triggerCopy,
                                             triggerDelete
}) => {

    const handleResize = (e: any, direction: any, ref: any, delta: any, position: any)=> {
        onElementResize?.({
            elementPosX: position.x,
            elementPosY: position.y,
            width: ref.style.width,
            height: ref.style.height,
        })
    }

    const handleDrag = (e: any, data: any)=> {
        onElementDrag?.({
            elementPosX: data.x,
            elementPosY: data.y
        })
    }
    const borderEdges = {
        topLeft: <RoundEdge className="top-[6px] left-[7px]"></RoundEdge>,
        topRight: <RoundEdge className="top-[5px] right-[7px]"></RoundEdge>,
        bottomRight: <RoundEdge className="bottom-[7px] right-[7px]"></RoundEdge>,
        bottomLeft: <RoundEdge className="bottom-[7px] left-[5px]"></RoundEdge>
    }

    const Controls = () => {
        return (
            <div className="flex justify-center gap-2 h-auto absolute top-[-2rem] right-2/4 w-1/4">
                <Tooltip title="Edit" placement="top">
                    <span className="cursor-pointer" onClick={triggerEdit}><EditIcon className="text-sm"/></span>
                </Tooltip>

                <Tooltip title="Delete" placement="top">
                    <span className="cursor-pointer" onClick={triggerDelete}><DeleteIcon className="text-sm"/></span>
                </Tooltip>

                <Tooltip title="Duplicate" placement="top">
                    <span className="cursor-pointer" onClick={triggerCopy}><ContentCopyIcon className="text-sm"/></span>
                </Tooltip>
            </div>
        )
    }

    return (
        <Rnd
            className={classNames('text-white text-2xl p-2', showBorders ? 'ring-white ring-1' : '')}
            default={{
                x: defaultValues.elementPosX,
                y: defaultValues.elementPosY,
                width: defaultValues.width,
                height: defaultValues.height
            }}
            bounds="parent"
            onResizeStop={handleResize}
            onDrag={handleDrag}
            resizeHandleComponent={showBorders ? borderEdges : {}}
        >
            {showBorders && <Controls /> }

            {children}
        </Rnd>
    );
});
const RoundEdge = ({className}: { className: string})=> {
    return (
        <span className={classNames('block bg-white rounded-full w-2 h-2 absolute', className)}></span>
    )
}
export default Resizable;
