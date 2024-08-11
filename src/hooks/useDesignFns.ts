import {useState} from "react";
import {
    ElementData,
    ElementDragData,
    ElementResizedData,
    ElementStyleType,
    TextAlignment
} from "@/types/design/elements";
import {v4 as uuidv4} from "uuid";

const useDesignFns = (elements: ElementData[]) => {
    const [dynamicElements, setDynamicElements] = useState<ElementData[]>(elements)
    const [selectedElement, setSelectedElement] = useState<ElementData | null>(null)
    const [selectedElementIndex, setSelectedElementIndex] = useState<number | null>(null)
    const handlers = {
        onColorChange: (color: any) =>{
            if(selectedElement){
                handlers.updateStyle({
                    ...selectedElement?.style,
                    color: color.hex
                })
            }
        },
        onFontSizeChange: (size: number) => {
            if(selectedElement){
                handlers.updateStyle({
                    ...selectedElement?.style,
                    fontSize: size
                })
            }
        },
        onFontFamilyChange: (font: string) => {
            if(selectedElement){
                handlers.updateStyle({
                    ...selectedElement?.style,
                    fontFamily: font
                })
            }
        },
        onFontWeightChange: (weight: number) => {
            if(selectedElement){
                handlers.updateStyle({
                    ...selectedElement?.style,
                    fontWeight: weight
                })
            }
        },
        changeStyle: () => {
            let fontStyle = selectedElement?.style.fontStyle;
            if(fontStyle === 'normal'){
                fontStyle = 'italic'
            }else{
                fontStyle = 'normal'
            }
            if(selectedElement){
                handlers.updateStyle({
                    ...selectedElement?.style,
                    fontStyle,
                })
            }
        },
        changeTextAlignment: (alignment: TextAlignment) =>{
            if(selectedElement){
                handlers.updateStyle({
                    ...selectedElement?.style,
                    textAlign: alignment
                })
            }
        },
        changeTextDecoration: () => {
            let textDecoration = selectedElement?.style.textDecoration
            if(textDecoration === 'none'){
                textDecoration = 'underline'
            }else{
                textDecoration = 'none'
            }
            if(selectedElement){
                handlers.updateStyle({
                    ...selectedElement?.style,
                    textDecoration
                })
            }
        },
        handleElementClick:  (element: ElementData, index: number) => {
            handlers.showBorder(index);
            setSelectedElement(element);
            setSelectedElementIndex(index)
        },
        updateElement: (element: ElementData, index: number | null)=> {
            if(index !== null && element){
                let newElement = [...dynamicElements];
                newElement[index] = element;
                setDynamicElements(newElement);
                setSelectedElement(element);
            }
        },
        updateStyle: (style: ElementStyleType) =>  {
            if(selectedElement){
                handlers.updateElement({
                    ...selectedElement,
                    style,
                }, selectedElementIndex)
            }
        },
        showBorder: (index: number, elements?: ElementData[]) =>  {
            let newElement = elements ?? [...dynamicElements];
            newElement = newElement.map((element: ElementData , indx: number)=> {
                if(element){
                    element.showBorder = index === indx;
                }
                return element;
            })
            setDynamicElements(newElement);
        },
        handleOnCopy: (element: ElementData) => {
            const copiedElement= {...element,
                id: uuidv4(),
                position:{
                    x: 234,
                    y: 59,
                },
            }
            const newElements = [...dynamicElements.map(mpElement => {
                mpElement.showBorder = false
                return mpElement;
            }), copiedElement];
            setDynamicElements(newElements);
            setSelectedElement(copiedElement)
            setSelectedElementIndex(newElements.length - 1)
        },
        handleTextChange: (text: string, elementData: ElementData, index:number) => {
            elementData.content = text
            handlers.updateElement(elementData, index)
        },
        handleResize: (data: ElementResizedData, elementData: ElementData, index:number) => {
            const updatedElement = {
                ...elementData,
                position:{
                    x: data.elementPosX,
                    y: data.elementPosY,
                },
                width: data.width,
                height: data.height
            }
            handlers.updateElement(updatedElement, index)
        },
        handleOnDrag: (data: ElementDragData, elementData: ElementData, index:number) => {
            const updatedElement = {
                ...elementData,
                position:{
                    x: data.elementPosX,
                    y: data.elementPosY,
                },
            }
            handlers.updateElement(updatedElement, index)
        },
        handleOnDelete: (index:number) => {
            let copiedElement = [...dynamicElements]
            delete copiedElement[index]
            setDynamicElements(copiedElement)
        },
        deleteElementOnDeleteKeyPress: (e: any) => {
            if(e.keyCode === 8 || e.keyCode === 46){
                //handlers.handleOnDelete(selectedElementIndex as number)
            }
        }
    }
    return {
        ...handlers,
        dynamicElements,
        setDynamicElements,
        selectedElement,
        setSelectedElement,
        selectedElementIndex,
        setSelectedElementIndex
    }
}
export default useDesignFns;