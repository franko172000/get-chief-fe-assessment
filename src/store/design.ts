import {create} from "zustand";
import {pendulumApi} from "@/api";
import {IDesign} from "@/types/design/IDesign";

type DesignStateType = {
    design: IDesign | null
    designs: IDesign[]
}

const designState: DesignStateType = {
    design: null,
    designs: []
}

type DesignAction = {
    getDesign: ({id, onSuccess, onError}:{
        id: string,
        onSuccess?: ()=> void,
        onError?:(err?: any)=>void
    })=> void;
    setDesign: (design: IDesign | null)=>void;
    getDesigns: ({onSuccess, onError}:{
        onSuccess?: ()=> void,
        onError?:(err?: any)=>void
    })=>void;
}

export const useDesignStore = create<DesignStateType & DesignAction>((set) => ({
    ...designState,
    getDesign: async ({id,onSuccess,onError}) => {
        try{
            const design = await pendulumApi.design.getDesignById(id)
            if(design){
                onSuccess?.()
                set(()=> ({
                    design
                }))
            }
        }catch (err){
            onError?.(err)
        }
    },
    setDesign: (design)=> set(()=> ({design})),
    getDesigns: async ({onSuccess,onError}) => {
        try{
            const designs = await pendulumApi.design.getDesigns()
            if(designs){
                onSuccess?.()
                set(()=> ({
                    designs
                }))
            }
        }catch (err){
            onError?.(err)
        }
    }
}))