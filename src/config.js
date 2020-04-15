export const CVPanelsLib = Object.freeze({
    panelTemplates: [
        {type:'BLUR', params: {ksize:[3, 3], anchor:[-1, -1], borderType:4}, active:true},
        {type:'CANNY', params: {threshold1:50, threshold2:100, apertureSize:3, L2gradient:false}, active:true},
        {type:'COLOR', params: {type:11}, active:true},
        {type:'DILATE', params: {kernel:[5, 5], anchor:[-1, -1], iterations:1, borderType:0}, active:true},
        {type:'ERODE', params: {kernel:[5, 5], anchor:[-1, -1], iterations:1, borderType:0}, active:true},
        {type:'SOBEL', params: {ddepth:0, dx:1, dy:0, ksize:3, scale:1, delta:0, borderType:4}, active:true},
        {type:'THRESH', params: {thresh:100, maxval:255, type:0}, active:true},
        ]
    });