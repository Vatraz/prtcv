export const CVPanelsLib = Object.freeze({
    panelTemplates: [
        {type:'COLOR', params: {type:11}, visible:false},
        {type:'THRESH', params: {thresh:100, maxval:255, type:0, describe:''}, visible:false},
        {type:'BLUR', params: {ksize:[3, 3], anchor:[-1, -1], borderType:4}, visible:false},
        ]
    });